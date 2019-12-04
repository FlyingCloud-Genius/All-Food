package com.allFood.backend.controller;

import com.allFood.backend.dao.dish.Dish;
import com.allFood.backend.response.ErrorResponse;
import com.allFood.backend.response.Response;
import com.allFood.backend.response.SuccessResponse;
import com.allFood.backend.service.DishService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping(value = "/dish")
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
}
