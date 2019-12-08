package com.allFood.backend.dao;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "dish")
public class DishConnection {

    @Column(name = "dish_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long dishId; // corresponded id in mongo db

    @Column(name = "dish_liked_by")
    private List<User> dishLikedBy = new ArrayList<>();

    @Column(name = "dish_in_menu")
    private List<Menu> dishInMenu = new ArrayList<>();

    public DishConnection() {
    }

    public DishConnection(Long dishId) {
        this.dishId = dishId;
    }

    public DishConnection(Long dishId, List<User> dishLikedBy, List<Menu> dishInMenu) {
        this.dishId = dishId;
        this.dishLikedBy = dishLikedBy;
        this.dishInMenu = dishInMenu;
    }

    @Id
    public Long getDishId() {
        return dishId;
    }

    public void setDishId(Long dishId) {
        this.dishId = dishId;
    }

    @ManyToMany(targetEntity = User.class, mappedBy = "myFavoriteDishes")
    public List<User> getDishLikedBy() {
        return dishLikedBy;
    }

    public void setDishLikedBy(List<User> dishLikedBy) {
        this.dishLikedBy = dishLikedBy;
    }

    @ManyToMany(targetEntity = Menu.class, mappedBy = "dishes")
    public List<Menu> getDishInMenu() {
        return dishInMenu;
    }

    public void setDishInMenu(List<Menu> dishInMenu) {
        this.dishInMenu = dishInMenu;
    }

    @Override
    public String toString() {
        return "DishConnection{" +
                "dishId=" + dishId +
                ", dishLikedBy=" + dishLikedBy +
                ", dishInMenu=" + dishInMenu +
                '}';
    }
}
