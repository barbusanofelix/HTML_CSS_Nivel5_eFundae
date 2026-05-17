package com.samurai.veterinaria.repository;

import com.samurai.veterinaria.model.Consultation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ConsultationRepository extends MongoRepository<Consultation, String> {

    // QUERY METHOD MÁGICO: Spring lee el nombre del método "findByAnimalId".
    // Automáticamente deduce que tiene que hacer un filtro en la colección
    // "consultations" buscando aquellos documentos donde el campo "animalId"
    // coincida con el String que le pasemos por parámetro. ¡Y devuelve una lista!
    List<Consultation> findByAnimalId(String animalId);
}