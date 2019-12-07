package com.allFood.backend.service.impl;

import com.allFood.backend.dao.DishConnection;
import com.allFood.backend.dao.dish.Dish;
import com.allFood.backend.repository.DishConnectionRepository;
import com.allFood.backend.repository.DishRepository;
import com.allFood.backend.service.DishService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DishServiceImpl implements DishService {

    private final static Logger LOGGER = LoggerFactory.getLogger(DishServiceImpl.class);

    private DishRepository dishRepository;

    private DishConnectionRepository dishConnectionRepository;

    @Autowired
    DishServiceImpl(DishRepository dishRepository, DishConnectionRepository dishConnectionRepository) {
        this.dishRepository = dishRepository;
        this.dishConnectionRepository = dishConnectionRepository;
    }

    @Override
    public boolean insertDish(Dish dish) {
        Dish DBdish = dishRepository.findByDishName(dish.getDishName());
        if (DBdish == null) {
            DBdish = dishRepository.save(dish);
            dishConnectionRepository.save(new DishConnection(DBdish.getDishId()));
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean insertAllDish(List<Dish> dishes) {
        List signal = dishRepository.saveAll(dishes);
        if (signal == null) {
            return false;
        }
        return true;
    }
}
