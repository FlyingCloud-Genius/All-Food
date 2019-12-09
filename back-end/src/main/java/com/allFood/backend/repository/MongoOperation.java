package com.allFood.backend.repository;

import com.allFood.backend.dao.dish.Dish;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MongoOperation {

    private MongoTemplate mongoTemplate;

    @Autowired
    MongoOperation(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public List<Dish> getDishes(int start, int end) {
        Query query = new Query();
        query.skip(start);
        query.limit(end - start);
        return mongoTemplate.find(query, Dish.class, "dish");
    }
}
