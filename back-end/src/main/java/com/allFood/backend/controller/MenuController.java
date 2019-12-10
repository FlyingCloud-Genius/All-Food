package com.allFood.backend.controller;

import com.allFood.backend.dao.Menu;
import com.allFood.backend.response.DataResponse;
import com.allFood.backend.response.ErrorResponse;
import com.allFood.backend.response.Response;
import com.allFood.backend.response.SuccessResponse;
import com.allFood.backend.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

    @GetMapping(value = "/menu/param")
    public Response getMenu(int start, int limit) {
        List<Menu> menus = menuService.showMenus(start, limit);
        if (menus == null) {
            return new ErrorResponse(400, "menus not found");
        }
        return new DataResponse(menus);
    }

    @GetMapping(value = "/menu/{menuName}")
    public Response findMenuName(@PathVariable String menuName) {
        List<Menu> menus = menuService.findMenu(menuName);
        if (menus == null) {
            return new ErrorResponse(400, "menus not found");
        }
        return new DataResponse(menus);
    }
}
