package com.allFood.backend.dao;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "dish")
@Access(AccessType.PROPERTY)
public class DishConnection {

    private Long dishId; // corresponded id in mongo db

    private List<User> dishLikedBy = new ArrayList<>();

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
    @Column(name = "dish_id")
    public Long getDishId() {
        return dishId;
    }

    public void setDishId(Long dishId) {
        this.dishId = dishId;
    }

    @ManyToMany(targetEntity = User.class, mappedBy = "my_favorite_dishes")
    @Column(name = "dish_liked_by")
    public List<User> getDishLikedBy() {
        return dishLikedBy;
    }

    public void setDishLikedBy(List<User> dishLikedBy) {
        this.dishLikedBy = dishLikedBy;
    }

    @ManyToMany(targetEntity = Menu.class, mappedBy = "have_dishes")
    @Column(name = "dish_in_menu")
    public List<Menu> getDishInMenu() {
        return dishInMenu;
    }

    public void setDishInMenu(List<Menu> dishInMenu) {
        this.dishInMenu = dishInMenu;
    }
}
