package com.allFood.backend.service.impl;

import com.allFood.backend.dao.DishConnection;
import com.allFood.backend.dao.Menu;
import com.allFood.backend.dao.dish.Dish;
import com.allFood.backend.repository.DishRepository;
import com.allFood.backend.repository.MenuRepository;
import com.allFood.backend.service.MenuService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MenuServiceImpl implements MenuService {

    private static final Logger LOGGER = LoggerFactory.getLogger(MenuServiceImpl.class);

    private MenuRepository menuRepository;

    private DishRepository dishRepository;

    @Autowired
    MenuServiceImpl(MenuRepository menuRepository, DishRepository dishRepository) {
        this.menuRepository = menuRepository;
        this.dishRepository = dishRepository;
    }

    @Override
    public boolean addDishToMenu(String dishName, String menuName) {
        LOGGER.info("adding dish to the database");
        Menu menu = menuRepository.findByMenuName(menuName);
        if (menu.getMenuId() == null) {
            LOGGER.error("no such menu in the database");
            return false;
        }
        if (menu.getDishes() == null) {
            menu.setDishes(new ArrayList<>());
        }
        Dish dish = dishRepository.findByDishName(dishName);
        if (dish.getDishName() == null) {
            LOGGER.error("no such dish in the database");
            return false;
        }
        menu.addDishToMenu(new DishConnection(dish.getDishId()));
        menuRepository.saveAndFlush(menu);
        return true;
    }

    @Override
    public List<Menu> showMenus(int start, int limit) {
        List<Menu> menus = menuRepository.getMenus(start, start + limit);
        if (menus == null || menus.size() == 0) {
            return null;
        }
        return menus;
    }

    @Override
    public List<Menu> findMenu(String menuName) {
        List<Menu> menus = menuRepository.findMenuLike(menuName);
        if (menus == null || menus.size() == 0) {
            return null;
        }
        return menus;
    }
}
