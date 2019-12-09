package com.allFood.backend.controller;

import com.allFood.backend.dao.dish.Dish;
import com.allFood.backend.response.DataResponse;
import com.allFood.backend.response.ErrorResponse;
import com.allFood.backend.response.Response;
import com.allFood.backend.response.SuccessResponse;
import com.allFood.backend.service.DishService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class DishController {

    private ObjectMapper objectMapper;

    private final static Logger LOGGER = LoggerFactory.getLogger(DishController.class);

    private DishService dishService;

    @Autowired
    DishController(DishService dishService) {
        this.dishService = dishService;
    }

    @PostMapping(value = "/dish")
    public Response insertDish(Dish dish) {
        if (dishService.insertDish(dish)) {
            return new SuccessResponse(200, "successfully insert");
        } else {
            return new ErrorResponse(504, "insertion failed");
        }
    }

    @PostMapping(value = "/test_dish")
    public Response testDB(@RequestBody Dish dish) {
        if (dishService.insertDish(dish)) {
            return new SuccessResponse(200, "successfully insert");
        }
        return new ErrorResponse(504, "insertion failed");
    }

    @GetMapping(value = "/dish/limit")
    public Response getDishes(int start, int end) {
        List<Dish> result = dishService.findDishes(start, end);
        if (result == null) {
            return new ErrorResponse(500, "no dish found");
        }
        return new DataResponse(result);
    }

    @GetMapping(value = "/dish/param")
    public Response getData(int limit) {
        List<Dish> result = dishService.findDishes(0, limit);
        if (result == null) {
            return new ErrorResponse(500, "no dish found");
        }
        return new DataResponse(result);
    }

}
