# init_db.py
import sqlite3

def inicializar_base_de_datos():
    # Conecta (y crea si no existe) el archivo de la base de datos
    conexion = sqlite3.connect('alquiler.db')
    cursor = conexion.cursor()

    # 1. Creamos la tabla de vehículos
    # Guardamos los atributos comunes y dejamos campos específicos vacíos según el tipo
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS vehiculos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tipo TEXT NOT NULL,          -- 'coche', 'motocicleta', 'bicicletaelectrica'
            marca TEXT NOT NULL,
            modelo TEXT NOT NULL,
            anio INTEGER NOT NULL,
            numero_puertas INTEGER,      -- Exclusivo de Coche
            combustible TEXT,            -- Exclusivo de Coche
            cilindrada INTEGER,          -- Exclusivo de Motocicleta
            tipo_moto TEXT,              -- Exclusivo de Motocicleta
            capacidad_bateria INTEGER,   -- Exclusivo de Bici Eléctrica
            velocidad_maxima INTEGER     -- Exclusivo de Bici Eléctrica
        )
    ''')

    # 2. Limpiamos la tabla por si acaso ya tenía datos previos en pruebas
    cursor.execute('DELETE FROM vehiculos')

    # 3. Insertamos nuestros tres vehículos iniciales del reto
    vehiculos_iniciales = [
        ('coche', 'Toyota', 'Yaris', 2023, 5, 'Híbrido', None, None, None, None),
        ('motocicleta', 'Honda', 'CB500F', 2022, None, None, 471, 'Naked', None, None),
        ('bicicletaelectrica', 'Specialized', 'Turbo Tero', 2024, None, None, None, None, 710, 25)
    ]

    cursor.executemany('''
        INSERT INTO vehiculos (tipo, marca, modelo, anio, numero_puertas, combustible, cilindrada, tipo_moto, capacidad_bateria, velocidad_maxima)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', vehiculos_iniciales)

    # Confirmamos los cambios y cerramos la conexión
    conexion.commit()
    conexion.close()
    print("¡Base de datos 'alquiler.db' creada e inicializada con éxito con los vehículos del reto!")

if __name__ == '__main__':
    inicializar_base_de_datos()