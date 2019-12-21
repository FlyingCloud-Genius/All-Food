package com.allFood.backend.dao;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "db_user")
public class User implements Serializable {

    @Column(name = "user_id")
    @JsonIgnore
    private Long userId;

    @Column(name = "user_name", unique = true)
    private String userName;

    @Column(name = "password")
    @JsonIgnore
    private String password;

    @Column(name = "age")
    private Integer age;

    @Column(name = "weight")
    private Integer weight;

    @Column(name = "height")
    private Integer height;

    @Column(name = "e_mail")
    private String eMail;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "create_time")
    private String createTime;

    @Column(name = "region")
    private String region;

    @Column(name = "taste")
    private String taste;

    @Column(name = "for_whom")
    private String forWhom;

    @Column(name = "my_favorite_dishes")
    private List<DishConnection> myFavoriteDishes = new ArrayList<>();

    @Column(name = "my_upload_dish")
    private List<DishConnection> myUploadDish = new ArrayList<>();

    @Column(name = "my_upload_menu")
    private List<Menu> myUploadMenu = new ArrayList<>();

    @Column(name = "my_favorite_menu")
    private List<Menu> myFavoriteMenu = new ArrayList<>();

    @Column(name = "my_preference")
    private List<Preference> myPreference = new ArrayList<>();

    public User() {
    }

    public User(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }

    public User(Long userId, String userName, String password, Integer age, Integer weight, Integer height, String eMail, String phoneNumber, String createTime, String region, String taste, String forWhom, List<DishConnection> myFavoriteDishes, List<DishConnection> myUploadDish, List<Menu> myUploadMenu, List<Menu> myFavoriteMenu, List<Preference> myPreference) {
        this.userId = userId;
        this.userName = userName;
        this.password = password;
        this.age = age;
        this.weight = weight;
        this.height = height;
        this.eMail = eMail;
        this.phoneNumber = phoneNumber;
        this.createTime = createTime;
        this.region = region;
        this.taste = taste;
        this.forWhom = forWhom;
        this.myFavoriteDishes = myFavoriteDishes;
        this.myUploadDish = myUploadDish;
        this.myUploadMenu = myUploadMenu;
        this.myFavoriteMenu = myFavoriteMenu;
        this.myPreference = myPreference;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public String geteMail() {
        return eMail;
    }

    public void seteMail(String eMail) {
        this.eMail = eMail;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getTaste() {
        return taste;
    }

    public void setTaste(String taste) {
        this.taste = taste;
    }

    public String getForWhom() {
        return forWhom;
    }

    public void setForWhom(String forWhom) {
        this.forWhom = forWhom;
    }

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "favorite_dish",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "dish_id"))
    public List<DishConnection> getMyFavoriteDishes() {
        return myFavoriteDishes;
    }

    public void setMyFavoriteDishes(List<DishConnection> myFavoriteDishes) {
        this.myFavoriteDishes = myFavoriteDishes;
    }

    public void addMyFavoriteDishes(DishConnection dishConnection) {
        this.myFavoriteDishes.add(dishConnection);
    }

    @OneToMany(cascade = CascadeType.PERSIST)
    public List<DishConnection> getMyUploadDish() {
        return myUploadDish;
    }

    public void uploadDish(DishConnection dishConnection) {
        this.myUploadDish.add(dishConnection);
    }

    public void setMyUploadDish(List<DishConnection> myUploadDish) {
        this.myUploadDish = myUploadDish;
    }

    @OneToMany(cascade = {CascadeType.REFRESH, CascadeType.REMOVE})
    public List<Menu> getMyUploadMenu() {
        return myUploadMenu;
    }

    public void uploadMenu(Menu menu) {
        this.myUploadMenu.add(menu);
    }

    public void setMyUploadMenu(List<Menu> myUploadMenu) {
        this.myUploadMenu = myUploadMenu;
    }

    @ManyToMany(cascade = {CascadeType.REMOVE, CascadeType.REFRESH})
    @JoinTable(name = "favorite_menu",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "menu_id"))
    public List<Menu> getMyFavoriteMenu() {
        return myFavoriteMenu;
    }

    public void setMyFavoriteMenu(List<Menu> myFavoriteMenu) {
        this.myFavoriteMenu = myFavoriteMenu;
    }

    public void addMyFavoriteMenu(Menu menu) {
        this.myFavoriteMenu.add(menu);
    }

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "have_preference",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "preference_id"))
    public List<Preference> getMyPreference() {
        return myPreference;
    }

    public void setMyPreference(List<Preference> myPreference) {
        this.myPreference = myPreference;
    }
}

