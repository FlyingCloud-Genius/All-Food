package com.allFood.backend.repository;

import com.allFood.backend.dao.dish.AllTag;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends MongoRepository<AllTag, Long> {
}
