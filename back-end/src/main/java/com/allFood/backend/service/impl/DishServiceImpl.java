package com.allFood.backend.service.impl;

import com.allFood.backend.dao.DishConnection;
import com.allFood.backend.dao.dish.Dish;
import com.allFood.backend.repository.DishConnectionRepository;
import com.allFood.backend.repository.DishRepository;
import com.allFood.backend.repository.MongoOperation;
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

    private MongoOperation mongoOperation;

    @Autowired
    DishServiceImpl(DishRepository dishRepository, DishConnectionRepository dishConnectionRepository,
                    MongoOperation mongoOperation) {
        this.dishRepository = dishRepository;
        this.dishConnectionRepository = dishConnectionRepository;
        this.mongoOperation = mongoOperation;
    }

    @Override
    public boolean insertDish(Dish dish) {
        LOGGER.info("current dish id: "+ dish.getDishId());
        dishRepository.save(dish);
        DishConnection SQLdish = new DishConnection(dish.getDishId());
        LOGGER.info("dish connection with: "+ SQLdish.toString());
        dishConnectionRepository.save(SQLdish);
        LOGGER.info("inserting dish with dish_id: " + dish.getDishId() + " and dish_name: " + dish.getDishName());
        return true;
//        } else {
//            LOGGER.error(DBdish.toString());
//            return false;
//        }
    }

    @Override
    public boolean insertAllDish(List<Dish> dishes) {
        List signal = dishRepository.saveAll(dishes);
        if (signal == null) {
            return false;
        }
        return true;
    }

    @Override
    public List<Dish> findDishes(int start, int end) {
        return mongoOperation.getDishes(start, end);
    }

    @Override
    public List<Dish> getData(int limit) {
        return mongoOperation.getDishes(0, limit);
    }
}
