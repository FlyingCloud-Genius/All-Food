package com.allFood.backend.controller;

import com.allFood.backend.request.LogInRequest;
import com.allFood.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping(value = "/user")
public class UserController {

    private UserService userService;

    @Autowired
    UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/login")
    public Map logIn(@RequestBody LogInRequest request) {
        return userService.logIn(request.getUserName(), request.getPassword());
    }
}
