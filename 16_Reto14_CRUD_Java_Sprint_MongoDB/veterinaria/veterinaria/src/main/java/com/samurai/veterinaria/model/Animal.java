package com.samurai.veterinaria.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "animals")
public class Animal {

    @Id
    private String id; // Mapea con el "_id" del JSON (ej: "animal1")

    private String name;
    private String species;
    private String breed;
    private String birthdate;

    // Relación lógica: Guardamos simplemente el String del ID del dueño.
    // No usamos claves foráneas del motor, la consistencia la manejará nuestra API.
    private String ownerId;

    // --- CONSTRUCTORES ---
    public Animal() {
    }

    public Animal(String id, String name, String species, String breed, String birthdate, String ownerId) {
        this.id = id;
        this.name = name;
        this.species = species;
        this.breed = breed;
        this.birthdate = birthdate;
        this.ownerId = ownerId;
    }

    // --- GETTERS Y SETTERS ---
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public String getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(String birthdate) {
        this.birthdate = birthdate;
    }

    public String getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }
}