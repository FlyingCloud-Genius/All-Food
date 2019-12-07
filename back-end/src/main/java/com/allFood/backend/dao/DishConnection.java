package com.allFood.backend.dao;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "dish")
public class DishConnection {

    @Id
    @Column(name = "dish_id")
    private Long dishId; // corresponded id in mongo db

    @Column(name = "liked_by")
    private List<User> likedBy = new ArrayList<>();

    @Column(name = "dish_in_menu")
    private List<Menu> dishInMenu = new ArrayList<>();

    public DishConnection() {
    }

    public DishConnection(Long dishId) {
        this.dishId = dishId;
    }

    public DishConnection(Long dishId, List<User> likedBy, List<Menu> dishInMenu) {
        this.dishId = dishId;
        this.likedBy = likedBy;
        this.dishInMenu = dishInMenu;
    }

    public Long getDishId() {
        return dishId;
    }

    public void setDishId(Long dishId) {
        this.dishId = dishId;
    }

    @ManyToMany(mappedBy = "my_favorite_dishes")
    public List<User> getLikedBy() {
        return likedBy;
    }

    public void setLikedBy(List<User> likedBy) {
        this.likedBy = likedBy;
    }

    @ManyToMany(mappedBy = "have_dishes")
    public List<Menu> getDishInMenu() {
        return dishInMenu;
    }

    public void setDishInMenu(List<Menu> dishInMenu) {
        this.dishInMenu = dishInMenu;
    }
}
