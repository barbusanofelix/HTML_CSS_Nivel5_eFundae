package com.samurai.veterinaria.repository;

import com.samurai.veterinaria.model.Animal;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimalRepository extends MongoRepository<Animal, String> {
    // Al igual que el anterior, maneja de forma automática la colección "animals"
}
