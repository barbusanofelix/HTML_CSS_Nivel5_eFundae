package com.samurai.veterinaria.repository;

import com.samurai.veterinaria.model.Owner;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

// @Repository le dice a Spring que esta clase maneja el acceso a la base de datos
@Repository
public interface OwnerRepository extends MongoRepository<Owner, String> {
    // Al heredar de MongoRepository<Owner, String>, Spring genera automáticamente
    // métodos como: findAll(), findById(), save(), deleteById()...
    // ¡No hace falta escribir código aquí dentro para el CRUD básico!
}