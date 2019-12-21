package com.allFood.backend.controller;

import com.allFood.backend.dao.dish.Dish;
import com.allFood.backend.response.DataResponse;
import com.allFood.backend.response.ErrorResponse;
import com.allFood.backend.response.Response;
import com.allFood.backend.service.AlgorithmService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AlgorithmController {

    private final static Logger LOGGER = LoggerFactory.getLogger(AlgorithmController.class);

    private AlgorithmService algorithmService;

    @Autowired
    AlgorithmController(AlgorithmService algorithmService) {
        this.algorithmService = algorithmService;
    }

    @GetMapping(value = "/{userName}/recommend")
    public Response recommendDish(@PathVariable String userName) {
        List<Dish> dishes = algorithmService.recommendDish(userName);
        if (dishes == null) {
            return new ErrorResponse(500, "some error occurs. there might be no good dish for you or you didn't put your name in the request.");
        } else {
            return new DataResponse(dishes);
        }
    }
}
