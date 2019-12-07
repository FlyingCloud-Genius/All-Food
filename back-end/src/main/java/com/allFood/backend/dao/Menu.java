package com.allFood.backend.dao;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "menu")
@Access(AccessType.PROPERTY)
public class Menu {

    @Column(name = "menu_id")
    @JsonIgnore
    private Long menuId;

    @Column(name = "menu_name")
    private String menuName;

    @Column(name = "description")
    private String description;

    @Column(name = "have_dishes")
    private List<DishConnection> dishes = new ArrayList<>();

    @Column(name = "menu_liked_by")
    private List<User> menuLikedBy = new ArrayList<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getMenuId() {
        return menuId;
    }

    public void setMenuId(Long menuId) {
        this.menuId = menuId;
    }

    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(name = "menu_have_dish",
            joinColumns = @JoinColumn(name = "menu_id", referencedColumnName = "menu_id"),
            inverseJoinColumns = @JoinColumn(name = "dish_id", referencedColumnName = "dish_id"))
    public List<DishConnection> getDishes() {
        return dishes;
    }

    public void setDishes(List<DishConnection> dishes) {
        this.dishes = dishes;
    }

    public void addDishToMenu(DishConnection dishConnection) {
        this.dishes.add(dishConnection);
    }

    @ManyToMany(targetEntity = User.class, mappedBy = "my_favorite_menu")
    public List<User> getMenuLikedBy() {
        return menuLikedBy;
    }

    public void setMenuLikedBy(List<User> menuLikedBy) {
        this.menuLikedBy = menuLikedBy;
    }
}
