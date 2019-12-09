package com.allFood.backend.controller;

import com.allFood.backend.response.ErrorResponse;
import com.allFood.backend.response.Response;
import com.allFood.backend.response.SuccessResponse;
import com.allFood.backend.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class MenuController {

    private MenuService menuService;

    @Autowired
    MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @PutMapping(value = "/addDish")
    public Response addDishToMenu(@RequestBody Map request) {
        String dishName = (String) request.get("dishName");
        String menuName = (String) request.get("menuName");
        if (dishName != null && menuName != null) {
            if (menuService.addDishToMenu(dishName, menuName)) {
                return new SuccessResponse(200, "successfully insert!");
            }
        }
        return new ErrorResponse(400, "menuName or dishName not exists!");
    }
}
