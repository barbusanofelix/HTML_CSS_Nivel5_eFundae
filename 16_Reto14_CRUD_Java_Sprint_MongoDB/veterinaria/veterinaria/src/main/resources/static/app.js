// ==========================================================================
// CONFIGURACIÓN GLOBAL Y CAPTURA DEL DOM
// ==========================================================================
const API_URL = 'http://localhost:8080/api';

// Captura de elementos de la interfaz
const animalSelect = document.getElementById('animal-select');
const detailsBox = document.getElementById('details-box');
const listConsultations = document.getElementById('consultations-container');
const consultationForm = document.getElementById('consultation-form');
const btnSubmit = document.getElementById('btn-submit');

// Almacenamiento local temporal en memoria de la sesión
let allAnimals = [];
let allOwners = [];

// ==========================================================================
// 1. CARGA INICIAL DE DATOS (Fetiches paralelos)
// ==========================================================================
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Ejecutamos las llamadas HTTP GET de forma simultánea
        const [animalsRes, ownersRes] = await Promise.all([
            fetch(`${API_URL}/animals`),
            fetch(`${API_URL}/owners`)
        ]);

        allAnimals = await animalsRes.json();
        allOwners = await ownersRes.json();

        // Rellenamos el elemento Select con los animales reales de MongoDB
        populateAnimalSelect(allAnimals);
    } catch (error) {
        console.error('Error al iniciar la aplicación:', error);
        animalSelect.innerHTML = '<option value="">Error al conectar con el servidor</option>';
    }
});

function populateAnimalSelect(animals) {
    animalSelect.innerHTML = '<option value="">-- Elige un paciente --</option>';
    animals.forEach(animal => {
        const option = document.createElement('option');
        option.value = animal.id; // Almacena el ID (ej: animal1)
        option.textContent = `${animal.name} (${animal.species})`;
        animalSelect.appendChild(option);
    });
}

// ==========================================================================
// 2. DETECTOR DE CAMBIO: Mostrar Ficha Técnica e Historial
// ==========================================================================
animalSelect.addEventListener('change', async (e) => {
    const selectedAnimalId = e.target.value;

    if (!selectedAnimalId) {
        // Si no hay selección, ocultamos la ficha y bloqueamos el formulario
        detailsBox.classList.add('details-box--hidden');
        listConsultations.innerHTML = '<p class="history-list__placeholder">Selecciona un animal para recuperar su expediente de MongoDB.</p>';
        btnSubmit.disabled = true;
        return;
    }

    // 2.1 Encontrar datos del animal seleccionado
    const animal = allAnimals.find(a => a.id === selectedAnimalId);
    // Encontrar al dueño haciendo el cruce de datos id_owner === ownerId
    const owner = allOwners.find(o => o.id === animal.ownerId);

    // Pintar los datos en el HTML
    document.getElementById('info-specie').textContent = `${animal.species} / ${animal.breed}`;
    document.getElementById('info-birth').textContent = animal.birthdate;
    
    if (owner) {
        document.getElementById('info-owner-name').textContent = owner.name;
        document.getElementById('info-owner-phone').textContent = owner.phone;
        document.getElementById('info-owner-address').textContent = owner.address;
    }

    // Mostrar el contenedor de la ficha técnica removiendo el modificador BEM de ocultado
    detailsBox.classList.remove('details-box--hidden');
    // Habilitamos el botón para registrar consultas ya que hay un paciente activo
    btnSubmit.disabled = false;

    // 2.2 Cargar el historial clínico llamando al endpoint filtrado
    loadConsultations(selectedAnimalId);
});

async function loadConsultations(animalId) {
    listConsultations.innerHTML = '<p class="history-list__placeholder">Buscando consultas...</p>';
    
    try {
        const res = await fetch(`${API_URL}/consultations/${animalId}`);
        const consultations = await res.json();

        if (consultations.length === 0) {
            listConsultations.innerHTML = '<p class="history-list__placeholder">Este paciente no registra consultas previas.</p>';
            return;
        }

        listConsultations.innerHTML = ''; // Limpiamos el contenedor
        consultations.forEach(con => {
            const div = document.createElement('div');
            div.className = 'consultation-item';
            div.innerHTML = `
                <div class="consultation-item__header">
                    <span>📅 Fecha: ${con.date}</span>
                    <span>🩺 Motivo: ${con.reason}</span>
                </div>
                <div class="consultation-item__notes">${con.notes}</div>
            `;
            listConsultations.appendChild(div);
        });
    } catch (error) {
        listConsultations.innerHTML = '<p class="history-list__placeholder">Error al cargar las consultas.</p>';
    }
}

// ==========================================================================
// 3. ENVÍO DEL FORMULARIO (POST con Algoritmo de ID Consecutivo Real)
// ==========================================================================
consultationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const selectedAnimalId = animalSelect.value;
    
    try {
        // 3.1 Traemos todas las consultas existentes
        const res = await fetch(`${API_URL}/consultations`);
        const allConsultations = await res.json();
        
        let nextNumber = 1; // Por defecto, si la base de datos estuviera vacía, empezamos en 1

        if (allConsultations.length > 0) {
            // ALGORITMO ANTIBORRADOS:
            // Extraemos solo los números de todos los IDs existentes (ej: "consult4" -> 4)
            const idNumbers = allConsultations.map(con => {
                // Si el ID por alguna razón no empieza con 'consult', devolvemos 0 para ignorarlo
                if (!con.id || !con.id.startsWith('consult')) return 0;
                
                // Quitamos la palabra 'consult' y convertimos el texto restante a un número entero
                return parseInt(con.id.replace('consult', ''), 10) || 0;
            });

            // Buscamos cuál es el número más alto de la lista usando Math.max
            const maxIdNumber = Math.max(...idNumbers);
            
            // El siguiente código será el máximo real encontrado + 1
            nextNumber = maxIdNumber + 1;
        }
        
        const autogeneratedId = `consult${nextNumber}`;

        // 3.2 Construimos el objeto JSON con el ID blindado
        const newConsultation = {
            id: autogeneratedId, 
            animalId: selectedAnimalId,
            date: document.getElementById('form-date').value,
            reason: document.getElementById('form-reason').value,
            notes: document.getElementById('form-notes').value
        };

        // 3.3 Envío a través de la API
        const response = await fetch(`${API_URL}/consultations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newConsultation)
        });

        if (response.ok) {
            alert(`¡Consulta guardada con éxito! ID Consecutivo Seguro: ${autogeneratedId}`);
            consultationForm.reset();
            
            // Recargamos el historial del paciente en pantalla
            loadConsultations(selectedAnimalId);
        } else {
            alert('Error en el servidor al intentar guardar el registro.');
        }
    } catch (error) {
        console.error('Error en el proceso de guardado:', error);
        alert('Error en el sistema de cálculo de ID consecutivo.');
    }
});