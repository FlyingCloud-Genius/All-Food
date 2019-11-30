package com.allFood.backend.service;

import com.allFood.backend.dao.User;

import java.util.Map;

public interface UserService {

    String getPassword(String userName);

    Map<String, Object> logIn(String userName, String password);

    void addUser(String userName, String password);

    void deleteUser(String userName);

    void updateInformation(User user);
}
