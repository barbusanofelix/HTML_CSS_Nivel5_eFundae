package com.samurai.veterinaria.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

// Le indicamos a Spring que esta clase representa a la colección "owners" de MongoDB
@Document(collection = "owners")
public class Owner {

    // La anotación @Id le dice a MongoDB que esta propiedad es el campo clave "_id"
    @Id
    private String id;

    private String name; // Coincide con "name" del JSON
    private String address; // Coincide con "address" del JSON
    private String phone; // Coincide con "phone" del JSON

    // --- CONSTRUCTORES ---
    // Constructor vacío obligatorio para que Spring pueda deserializar el JSON de
    // Mongo
    public Owner() {
    }

    // Constructor completo útil para cuando queramos crear objetos manualmente
    public Owner(String id, String name, String address, String phone) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phone = phone;
    }

    // --- GETTERS Y SETTERS ---
    // Permiten a Spring Web y Spring Data leer y escribir en los campos privados
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}