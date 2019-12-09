package com.allFood.backend.service;

import com.allFood.backend.dao.dish.Dish;

import java.util.List;

public interface DishService {

    boolean insertDish(Dish dish);

    boolean insertAllDish(List<Dish> dishes);

    List<Dish> findDishes(int start, int end);

    List<Dish> getData(int limit);
}
