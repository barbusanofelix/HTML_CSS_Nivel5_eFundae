package com.samurai.veterinaria.controller;

import com.samurai.veterinaria.model.Animal;
import com.samurai.veterinaria.model.Owner;
import com.samurai.veterinaria.model.Consultation;
import com.samurai.veterinaria.repository.AnimalRepository;
import com.samurai.veterinaria.repository.OwnerRepository;
import com.samurai.veterinaria.repository.ConsultationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// @RestController le dice a Spring que esta clase es una API que devolverá datos directamente (en formato JSON)
@RestController
// @RequestMapping define el prefijo base de las URLs de nuestra API. Buena
// práctica de orden.
@RequestMapping("/api")
// @CrossOrigin permite que aplicaciones externas (como tu frontend de HTML/JS
// nativo) puedan hacer peticiones sin bloqueos de seguridad del navegador
@CrossOrigin(origins = "*")
public class VetController {

    // --- INYECCIÓN DE DEPENDENCIAS ---
    // @Autowired le dice a Spring: "Búscame el repositorio adecuado y conéctalo
    // aquí automáticamente"
    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private OwnerRepository ownerRepository;

    @Autowired
    private ConsultationRepository consultationRepository;

    // --- ENDPOINTS EXIGIDOS POR EL RETO ---

    // 1. GET /api/animals
    // Devuelve la lista completa de todos los animales registrados
    @GetMapping("/animals")
    public List<Animal> getAllAnimals() {
        // .findAll() viene heredado de MongoRepository de forma nativa
        return animalRepository.findAll();
    }

    // 2. GET /api/owners
    // Devuelve la lista completa de todos los dueños registrados
    @GetMapping("/owners")
    public List<Owner> getAllOwners() {
        return ownerRepository.findAll();
    }

    // 3. POST /api/consultations
    // Recibe los datos de una nueva consulta en el cuerpo de la petición
    // (RequestBody) y los guarda
    @PostMapping("/consultations")
    public Consultation createConsultation(@RequestBody Consultation consultation) {
        // .save() inserta el documento en MongoDB y nos lo devuelve con su ID generado
        // o asignado
        return consultationRepository.save(consultation);
    }

    // 4. GET /api/consultations/{animalId}
    // Recupera todas las consultas asociadas a un identificador de animal
    // específico pasado por la URL (PathVariable)
    @GetMapping("/consultations/{animalId}")
    public List<Consultation> getConsultationsByAnimal(@PathVariable String animalId) {
        // Usamos nuestro método "mágico" personalizado de la Fase 4
        return consultationRepository.findByAnimalId(animalId);
    }

    // NUEVO ENDPOINT: GET /api/consultations
    // Devuelve la lista completa de todas las consultas de la veterinaria para
    // calcular el ID global
    @GetMapping("/consultations")
    public List<Consultation> getAllConsultations() {
        return consultationRepository.findAll();
    }


}