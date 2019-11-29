package com.allFood.backend.service;

import java.util.Map;

public interface UserService {

    String getPassword(String userName);

    Map<String, Object> logIn(String userName, String password);
}
