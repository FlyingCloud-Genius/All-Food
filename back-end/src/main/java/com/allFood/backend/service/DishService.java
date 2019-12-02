package com.allFood.backend.service;

import com.allFood.backend.dao.dish.Dish;

import java.util.List;

public interface DishService {

    boolean insertDish(Dish dish);

    boolean insertAllDish(List<Dish> dishes);
}
