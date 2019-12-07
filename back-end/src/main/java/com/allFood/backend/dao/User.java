package com.allFood.backend.dao;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "db_user")
@Access(AccessType.PROPERTY)
public class User implements Serializable {

    private Long userId;

    private String userName;

    private String password;

    private Integer age;

    private Integer weight;

    private Integer height;

    private String eMail;

    private String phoneNumber;

    private String createTime;

    private String region;

    private String taste;

    private String forWhom;

    private List<DishConnection> myFavoriteDishes = new ArrayList<>();

    private List<DishConnection> myUploadDish = new ArrayList<>();

    private List<Menu> myUploadMenu = new ArrayList<>();

    private List<Menu> myFavoriteMenu = new ArrayList<>();

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
    @Column(name = "user_id")
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Column(name = "user_name")
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Column(name = "password")
    @JsonIgnore
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Column(name = "age")
    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Column(name = "weight")
    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    @Column(name = "height")
    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    @Column(name = "e_mail")
    public String geteMail() {
        return eMail;
    }

    public void seteMail(String eMail) {
        this.eMail = eMail;
    }

    @Column(name = "phone_number")
    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Column(name = "create_time")
    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    @Column(name = "region")
    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    @Column(name = "taste")
    public String getTaste() {
        return taste;
    }

    public void setTaste(String taste) {
        this.taste = taste;
    }

    @Column(name = "for_whom")
    public String getForWhom() {
        return forWhom;
    }

    public void setForWhom(String forWhom) {
        this.forWhom = forWhom;
    }

    @Column(name = "my_favorite_dishes")
    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "favorite_dish",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "dish_id", referencedColumnName = "dish_id"))
    public List<DishConnection> getMyFavoriteDishes() {
        return myFavoriteDishes;
    }

    public void setMyFavoriteDishes(List<DishConnection> myFavoriteDishes) {
        this.myFavoriteDishes = myFavoriteDishes;
    }

    public void addMyFavoriteDishes(DishConnection dishConnection) {
        this.myFavoriteDishes.add(dishConnection);
    }

    @Column(name = "my_upload_dish")
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

    public void addMenu(Menu menu) {
        this.myUploadMenu.add(menu);
    }

    public void setMyUploadMenu(List<Menu> myUploadMenu) {
        this.myUploadMenu = myUploadMenu;
    }

    @Column(name = "my_favorite_menu")
    @ManyToMany(cascade = {CascadeType.REMOVE, CascadeType.REFRESH})
    @JoinTable(name = "favorite_menu",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "menu_id", referencedColumnName = "menu_id"))
    public List<Menu> getMyFavoriteMenu() {
        return myFavoriteMenu;
    }

    public void setMyFavoriteMenu(List<Menu> myFavoriteMenu) {
        this.myFavoriteMenu = myFavoriteMenu;
    }

    @Column(name = "my_preference")
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

