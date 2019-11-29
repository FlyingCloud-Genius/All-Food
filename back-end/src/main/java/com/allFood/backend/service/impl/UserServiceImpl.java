package com.allFood.backend.service.impl;

import com.allFood.backend.config.redis.RedisClientTemplate;
import com.allFood.backend.config.shiro.security.JwtUtil;
import com.allFood.backend.dao.User;
import com.allFood.backend.repository.UserRepository;
import com.allFood.backend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;

public class UserServiceImpl implements UserService {

    private final static Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    private UserRepository userRepository;

    private RedisClientTemplate redisClientTemplate;

    @Autowired
    UserServiceImpl(UserRepository userRepository, RedisClientTemplate redisClientTemplate) {
        this.userRepository = userRepository;
        this.redisClientTemplate = redisClientTemplate;
    }

    @Override
    public String getPassword(String userName) {
        User user = userRepository.findByUserName(userName);
        return user.getPassword();
    }

    @Override
    public Map<String, Object> logIn(String userName, String password) {
        Map<String, Object> response = new HashMap<>();
        LOGGER.info("username: " + userName + " password: " + password);
        User user = userRepository.findByUserName(userName);
        if (user == null || user.getPassword() == password) {
            response.put("error", "user not exists or password incorrect");
            return response;
        }
        if (password.equals(user.getPassword())) {
            String token = JwtUtil.sign(user.getUserName(), password);
            response.put("token", token);
            redisClientTemplate.setToRedis(userName, token);
            return response;
        }

        response.put("error", "an error occurs");
        return response;
    }
}
