package com.allFood.backend.controller;

import com.allFood.backend.dao.User;
import com.allFood.backend.dao.dish.Dish;
import com.allFood.backend.request.AddUserRequest;
import com.allFood.backend.request.LogInRequest;
import com.allFood.backend.response.DataResponse;
import com.allFood.backend.response.ErrorResponse;
import com.allFood.backend.response.Response;
import com.allFood.backend.response.SuccessResponse;
import com.allFood.backend.service.UserService;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class UserController {

    private UserService userService;

    @Autowired
    UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/login")
    public Response logIn(@RequestBody LogInRequest request) {
        return new DataResponse(userService.logIn(request.getUserName(), request.getPassword()));
    }

    @GetMapping(value = "/user/{userName}")
    @RequiresAuthentication
    public Response getUser(@PathVariable String userName) {
        User userTemp = userService.getUserInfo(userName);
        if (userTemp == null) {
            return new ErrorResponse(405, "user name not exists");
        }
        return new DataResponse(userTemp);
    }

    @PostMapping(value = "/user")
    public Response createUser(@RequestBody AddUserRequest addUserRequest){
        if (userService.addUser(addUserRequest)) {
            return new SuccessResponse(200, "user added successfully");
        } else {
            return new ErrorResponse(504, "error creating user");
        }
    }

    @DeleteMapping(value = "/user")
    @RequiresAuthentication
    public Response deleteUser(@RequestBody Map<String, String> deleteUserRequest) {
        if (userService.deleteUser(deleteUserRequest.get("userName"))) {
            return new SuccessResponse(200, "delete user successfully");
        }
        return new ErrorResponse(500, "delete unsuccessfully");
    }

    @PutMapping(value = "/user")
    @RequiresAuthentication
    public Response updateUser(@RequestBody User userRequest) {
        User user = userService.updateInformation(userRequest);
        if (user == null) {
            return new ErrorResponse(500, "no such user");
        }
        return new DataResponse(user);
    }

    @PutMapping(value = "/favorite_dish")
    public Response addFavoriteDish() {
        return null;
    }

    @PostMapping(value = "/upload_dish")
    public Response uploadDish(Dish dish) {
        return null;
    }

    @PostMapping(value = "/upload_menu")
    public Response uploadMenu(@RequestBody Map request) {
        return null;
    }

}
