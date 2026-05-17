package com.samurai.veterinaria.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "consultations")
public class Consultation {

    @Id
    private String id; // Mapea con el "_id" del JSON (ej: "consult1")

    // Relación lógica: Identificador del animal al que se le hace la consulta
    private String animalId;

    private String date;
    private String reason;
    private String notes; // Coincide con el campo "notes" de tu JSON

    // --- CONSTRUCTORES ---
    public Consultation() {
    }

    public Consultation(String id, String animalId, String date, String reason, String notes) {
        this.id = id;
        this.animalId = animalId;
        this.date = date;
        this.reason = reason;
        this.notes = notes;
    }

    // --- GETTERS Y SETTERS ---
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAnimalId() {
        return animalId;
    }

    public void setAnimalId(String animalId) {
        this.animalId = animalId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
