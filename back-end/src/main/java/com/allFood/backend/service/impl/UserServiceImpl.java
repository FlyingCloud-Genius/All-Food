package com.allFood.backend.service.impl;

import com.allFood.backend.config.redis.RedisClientTemplate;
import com.allFood.backend.config.shiro.security.JwtUtil;
import com.allFood.backend.dao.DishConnection;
import com.allFood.backend.dao.Menu;
import com.allFood.backend.dao.User;
import com.allFood.backend.dao.dish.Dish;
import com.allFood.backend.repository.DishConnectionRepository;
import com.allFood.backend.repository.DishRepository;
import com.allFood.backend.repository.MenuRepository;
import com.allFood.backend.repository.UserRepository;
import com.allFood.backend.request.AddUserRequest;
import com.allFood.backend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {

    private final static Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    private static Long dishId = Long.valueOf(100000);

    private UserRepository userRepository;

    private RedisClientTemplate redisClientTemplate;

    private MenuRepository menuRepository;

    private DishRepository dishRepository;

    private DishConnectionRepository dishConnectionRepository;

    @Autowired
    UserServiceImpl(UserRepository userRepository, RedisClientTemplate redisClientTemplate,
                    MenuRepository menuRepository, DishRepository dishRepository, DishConnectionRepository dishConnectionRepository) {
        this.userRepository = userRepository;
        this.redisClientTemplate = redisClientTemplate;
        this.menuRepository = menuRepository;
        this.dishRepository = dishRepository;
        this.dishConnectionRepository = dishConnectionRepository;
    }

    @Override
    public User getUserInfo(String userName) {
        return userRepository.findByUserName(userName);
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

    @Override
    public boolean addUser(AddUserRequest addUserRequest) {
        if (addUserRequest.getUserName() == null) {
            return false;
        } else if (userRepository.findByUserName(addUserRequest.getUserName()) != null) {
            return false;
        }
        User user = new User(addUserRequest.getUserName(), addUserRequest.getPassword());
        user.setAge(addUserRequest.getAge());
        user.setCreateTime(new Date(System.currentTimeMillis()).toString());
        user.seteMail(addUserRequest.geteMail());
        user.setHeight(addUserRequest.getHeight());
        user.setWeight(addUserRequest.getWeight());
        user.setRegion(addUserRequest.getRegion());
        user.setPhoneNumber(addUserRequest.getPhoneNumber());
        userRepository.save(user);
        return true;
    }

    @Override
    public boolean deleteUser(String userName) {
        try {
            userRepository.delete(userRepository.findByUserName(userName));
            return true;
        } catch (Exception e) {
            LOGGER.error("deletion failed");
            e.getStackTrace();
            return false;
        }
    }

    @Override
    public User updateInformation(User user) {
        User userTemp = userRepository.findByUserName(user.getUserName());
        if (userTemp == null) {
            return null;
        } else {
            if (user.getPassword() != null) {
                userTemp.setPassword(user.getPassword());
            } else if (user.getAge() != null){
                userTemp.setAge(user.getAge());
            } else if (user.geteMail() != null){
                userTemp.seteMail(user.geteMail());
            } else if (user.getForWhom() != null){
                userTemp.setForWhom(user.getForWhom());
            } else if (user.getHeight() != null){
                userTemp.setHeight(user.getHeight());
            } else if (user.getWeight() != null){
                userTemp.setWeight(user.getWeight());
            } else if (user.getPhoneNumber() != null){
                userTemp.setPhoneNumber(user.getPhoneNumber());
            } else if (user.getRegion() != null){
                userTemp.setRegion(user.getRegion());
            } else if (user.getTaste() != null){
                userTemp.setTaste(user.getTaste());
            } else if (user.getUserName() != null){
                userTemp.setUserName(user.getUserName());
            }
        }
        userRepository.saveAndFlush(userTemp);
        return userTemp;
    }

    @Override
    public boolean addFavoriteDish(String userName, String dishName) {
        User user = userRepository.findByUserName(userName);
        Dish dish = dishRepository.findByDishName(dishName);
        if (dish.getDishName() == null || user.getUserName() == null) {
            return false;
        }
        if (user.getMyFavoriteDishes() == null) {
            user.setMyFavoriteDishes(new ArrayList<>());
        }
        user.addMyFavoriteDishes(dishConnectionRepository.findBydishId(dish.getDishId()));
        userRepository.saveAndFlush(user);
        return true;
    }

    @Override
    public boolean addFavoriteMenu(String userName, String menuName) {
        User user = userRepository.findByUserName(userName);
        Menu menu = menuRepository.findByMenuName(menuName);
        if (menu.getMenuName() == null || user.getUserName() == null) {
            return false;
        }
        if (user.getMyFavoriteMenu() == null) {
            user.setMyFavoriteMenu(new ArrayList<>());
        }
        user.addMyFavoriteMenu(menu);
        userRepository.saveAndFlush(user);
        return true;
    }

    @Override
    public boolean uploadDish(String userName, Dish dish) {
        User user = userRepository.findByUserName(userName);
        if (user.getUserName() == null) {
            return false;
        }
        dish.setDishId(dishId++);
        dishRepository.save(dish);
        DishConnection dishConnection = new DishConnection(dish.getDishId());
        dishConnection = dishConnectionRepository.saveAndFlush(dishConnection);
        if (user.getMyUploadDish() == null) {
            user.setMyUploadDish(new ArrayList<>());
        }
        user.uploadDish(dishConnection);
        return true;
    }

    @Override
    public boolean uploadMenu(String userName, Menu menu) {
        User user = userRepository.findByUserName(userName);
        if (user.getUserName() == null) {
            return false;
        }
        menu = menuRepository.saveAndFlush(menu);
        if (user.getMyUploadMenu() == null) {
            user.setMyUploadMenu(new ArrayList<>());
        }
        user.uploadMenu(menu);
        return true;

    }
}
