package com.allFood.backend.dao;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "menu")
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_id")
    @JsonIgnore
    private Long menuId;

    @Column(name = "menu_name")
    private String menuName;

    @Column(name = "description")
    private String description;

    @Column(name = "have_dish")
    private List<DishConnection> dish = new ArrayList<>();

    @Column(name = "menu_liked_by")
    private List<User> menuLikedBy = new ArrayList<>();

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
            joinColumns = @JoinColumn(name = "menu_id"),
            inverseJoinColumns = @JoinColumn(name = "dish_in_menu"))
    public List<DishConnection> getDish() {
        return dish;
    }

    public void setDish(List<DishConnection> dish) {
        this.dish = dish;
    }

    public void addDishToMenu(DishConnection dishConnection) {
        this.dish.add(dishConnection);
    }

    @ManyToMany(mappedBy = "my_favorite_menu")
    public List<User> getMenuLikedBy() {
        return menuLikedBy;
    }

    public void setMenuLikedBy(List<User> menuLikedBy) {
        this.menuLikedBy = menuLikedBy;
    }
}
