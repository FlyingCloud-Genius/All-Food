package com.allFood.backend.repository;

import com.allFood.backend.dao.dish.Dish;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DishRepository extends MongoRepository<Dish, Long> {

    Dish findByDishName(String dishName);

    Dish findByDishId(Long dishId);
}
