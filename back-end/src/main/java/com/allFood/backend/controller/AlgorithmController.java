package com.allFood.backend.controller;

import com.allFood.backend.response.Response;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AlgorithmController {

    @GetMapping(value = "/{userName}/recommend")
    public Response recommendDish(@PathVariable String userName) {
        return null;
    }
}
