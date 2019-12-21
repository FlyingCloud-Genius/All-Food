package com.allFood.backend.service;

import com.allFood.backend.dao.Menu;

import java.util.List;

public interface MenuService {

    boolean addDishToMenu(String dishName, String menuName);

    List<Menu> showMenus(int start, int limit);

    List<Menu> findMenu(String menuName);
}
