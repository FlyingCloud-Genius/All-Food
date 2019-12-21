package com.allFood.backend.service;

import com.allFood.backend.dao.dish.Dish;

import java.util.List;

public interface AlgorithmService {

    List<Dish> recommendDish(String userName);
}
