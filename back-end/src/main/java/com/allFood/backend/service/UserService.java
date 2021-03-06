package com.allFood.backend.service;

import com.allFood.backend.dao.Menu;
import com.allFood.backend.dao.User;
import com.allFood.backend.dao.dish.Dish;
import com.allFood.backend.request.AddUserRequest;

import java.util.Map;

public interface UserService {

    User getUserInfo(String userName);

    String getPassword(String userName);

    Map<String, Object> logIn(String userName, String password);

    boolean addUser(AddUserRequest addUserRequest);

    boolean deleteUser(String userName);

    User updateInformation(User user);

    boolean addFavoriteDish(String userName, String dishName);

    boolean addFavoriteMenu(String userName, String menuName);

    boolean uploadDish(String userName, Dish dish);

    boolean uploadMenu(String userName, Menu menu);
}
