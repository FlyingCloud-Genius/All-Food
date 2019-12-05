package com.allFood.backend.request;

public class AddUserRequest {

    private String userName;

    private String password;

    private Integer age;

    private String eMail;

    private String phoneNumber;

    private String region;

    private Integer height;

    private Integer weight;

    public AddUserRequest() {
    }

    public AddUserRequest(String userName, String password, Integer age, String eMail, String phoneNumber, String region, Integer height, Integer weight) {
        this.userName = userName;
        this.password = password;
        this.age = age;
        this.eMail = eMail;
        this.phoneNumber = phoneNumber;
        this.region = region;
        this.height = height;
        this.weight = weight;
    }

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
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

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }
}
