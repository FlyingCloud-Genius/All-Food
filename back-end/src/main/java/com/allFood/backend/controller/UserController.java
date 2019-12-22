package com.allFood.backend.controller;

import com.allFood.backend.dao.DishConnection;
import com.allFood.backend.dao.Menu;
import com.allFood.backend.dao.User;
import com.allFood.backend.dao.dish.Dish;
import com.allFood.backend.repository.DishRepository;
import com.allFood.backend.request.*;
import com.allFood.backend.response.DataResponse;
import com.allFood.backend.response.ErrorResponse;
import com.allFood.backend.response.Response;
import com.allFood.backend.response.SuccessResponse;
import com.allFood.backend.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.apache.shiro.crypto.hash.Hash;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class UserController {

    private final static Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    private static ObjectMapper mapper = new ObjectMapper();

    private DishRepository dishRepository;

    private UserService userService;

    @Autowired
    UserController(UserService userService, DishRepository dishRepository) {
        this.userService = userService;
        this.dishRepository = dishRepository;
    }

    @PostMapping(value = "/login")
    public Response logIn(@RequestBody LogInRequest request) {
        return new DataResponse(userService.logIn(request.getUserName(), request.getPassword()));
    }

    @GetMapping(value = "/user/{userName}")
    public Response getUser(@PathVariable String userName) {
        LOGGER.info("requesting for user's information");
        User userTemp = userService.getUserInfo(userName);
        if (userTemp == null) {
            return new ErrorResponse(405, "user name not exists");
        }
        try {
            HashMap<String, Object> result = mapper.readValue(mapper.writeValueAsString(userTemp), HashMap.class);
            List<Dish> dishesUploaded = new ArrayList<>();
            if (userTemp.getMyUploadDish() != null) {
                for (DishConnection i : userTemp.getMyUploadDish()) {
                    dishesUploaded.add(dishRepository.findByDishId(i.getDishId()));
                }
                result.put("myUploadDish", dishesUploaded);
            }
            List<Dish> dishes = new ArrayList<>();
            if (userTemp.getMyFavoriteDishes() != null) {
                for (DishConnection i : userTemp.getMyFavoriteDishes()) {
                    dishes.add(dishRepository.findByDishId(i.getDishId()));
                }
                result.put("myFavoriteDishes", dishes);
            }
            return new DataResponse(result);
        } catch (IOException e) {
            e.printStackTrace();
            return new ErrorResponse(500, "some error occurs");
        }
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
    public Response deleteUser(@RequestParam Map<String, String> deleteUserRequest) {
        if (userService.deleteUser(deleteUserRequest.get("userName"))) {
            return new SuccessResponse(200, "delete user successfully");
        }
        return new ErrorResponse(500, "delete unsuccessfully");
    }

    @PutMapping(value = "/user")
    public Response updateUser(@RequestBody User userRequest) {
        User user = userService.updateInformation(userRequest);
        if (user == null) {
            return new ErrorResponse(500, "no such user");
        }
        return new DataResponse(user);
    }

    @PutMapping(value = "/favorite_dish")
    public Response addFavoriteDish(@RequestBody AddFavoriteDishRequest request) {
        String userName = request.getUserName();
        String dishName = request.getDishName();
        if (userName == null || dishName == null) {
            return new ErrorResponse(400,"user name or dish name not exist");
        }
        if (userService.addFavoriteDish(userName, dishName)) {
            return new SuccessResponse(200, "successfully add favorite dish");
        }
        return new ErrorResponse(400, "add dish failed");
    }

    @PutMapping(value = "/favorite_menu")
    public Response addFavoriteMenu(@RequestBody AddFavoriteMenuRequest request) {
        String userName = request.getUserName();
        String menuName = request.getDishName();
        if (userName == null || menuName == null) {
            return new ErrorResponse(400,"user name or dish name not exist");
        }
        if (userService.addFavoriteMenu(userName, menuName)) {
            return new SuccessResponse(200, "successfully add favorite dish");
        }
        return new ErrorResponse(400, "add dish failed");
    }

    @PostMapping(value = "/upload_dish")
    public Response uploadDish(@RequestBody UploadDishRequest request) {
        String userName = request.getUserName();
        Dish dish = request.getDish();
        if (userName == null || dish.getDishName() == null) {
            return new ErrorResponse(400,"user name or dish name not exist");
        }
        if (userService.uploadDish(userName, dish)) {
            return new SuccessResponse(200, "successfully add favorite dish");
        }
        return new ErrorResponse(400, "add dish failed");
    }

    @PostMapping(value = "/upload_menu")
    public Response uploadMenu(@RequestBody UploadMenuRequest request) {
        String userName = request.getUserName();
        Menu menu = request.getMenu();
        if (userName == null || menu.getMenuName() == null) {
            return new ErrorResponse(400,"user name or dish name not exist");
        }
        if (userService.uploadMenu(userName, menu)) {
            return new SuccessResponse(200, "successfully add favorite dish");
        }
        return new ErrorResponse(400, "add dish failed");
    }

}
