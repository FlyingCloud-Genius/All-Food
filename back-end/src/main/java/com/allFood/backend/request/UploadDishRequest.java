package com.allFood.backend.request;

import com.allFood.backend.dao.dish.Dish;

public class UploadDishRequest {

    private String userName;

    private Dish dish;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Dish getDish() {
        return dish;
    }

    public void setDish(Dish dish) {
        this.dish = dish;
    }
}
