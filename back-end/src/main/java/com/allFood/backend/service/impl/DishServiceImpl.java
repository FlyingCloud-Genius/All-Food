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
        LOGGER.info("current dish id: "+ dish.getDishId());
        Dish DBdish = dishRepository.findByDishId(dish.getDishId());
        if (DBdish == null && DBdish.getDishId() == null) {
            dishRepository.save(dish);
            DishConnection SQLdish = new DishConnection(dish.getDishId());
            LOGGER.info("dish connection with: "+ SQLdish.toString());
            dishConnectionRepository.save(SQLdish);
            LOGGER.info("inserting dish with dish_id: " + dish.getDishId() + " and dish_name: " + dish.getDishName());
            return true;
        } else {
            LOGGER.error(DBdish.toString());
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
