package com.allFood.backend.service.impl;

import com.allFood.backend.dao.User;
import com.allFood.backend.dao.dish.Dish;
import com.allFood.backend.python_integration.PythonFileInvoker;
import com.allFood.backend.repository.DishRepository;
import com.allFood.backend.repository.UserRepository;
import com.allFood.backend.service.AlgorithmService;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class AlgorithmServiceImpl implements AlgorithmService {

    private static final Logger LOGGER = LoggerFactory.getLogger(AlgorithmServiceImpl.class);

    private final static String filePath = "/home/cloud/All-Food/back-end/src/main/python/15NN.py";

    private ObjectMapper mapper = new ObjectMapper() {
        {
            enable(JsonParser.Feature.ALLOW_NON_NUMERIC_NUMBERS);
        }
    };

    private PythonFileInvoker invoker = new PythonFileInvoker(new File(filePath));

    private UserRepository userRepository;

    private DishRepository dishRepository;

    @Autowired
    AlgorithmServiceImpl(UserRepository userRepository, DishRepository dishRepository) {
        this.userRepository = userRepository;
        this.dishRepository = dishRepository;
    }

    @Override
    public List<Dish> recommendDish(String userName) {
        User user = userRepository.findByUserName(userName);
        if (user == null || user.getUserName() == null) {
            return null;
        }
        try {
            invoker.run(mapper.writeValueAsString(user));
            String result = invoker.getResult();
            LOGGER.info(result);
            Map<String, List<Long>> ids = mapper.readValue(resultProcessing(result), Map.class);
            List<Dish> resultDishes = new ArrayList<>();
            for (Long id : ids.get("id")) {
                resultDishes.add(dishRepository.findByDishId(id));
            }
            return resultDishes;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private String resultProcessing(String input) {
        input.replace('\'', '\"');
        return input.substring(input.indexOf("{"), input.indexOf("}") + 1);
    }

}
