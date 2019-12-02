package com.allFood.backend.dao.dish;

import java.util.List;

public class Tag {

    private List<String> taste;

    private String region;

    private String dishType;

    private List<String> targetPeople;

    private List<String> nutritionLimitation;

    private List<String> festival;

    private List<String> specialElement;

    private boolean easy;

    public Tag(List<String> taste, String region, String dishType, List<String> targetPeople, List<String> nutritionLimitation, List<String> festival, List<String> specialElement, boolean easy) {
        this.taste = taste;
        this.region = region;
        this.dishType = dishType;
        this.targetPeople = targetPeople;
        this.nutritionLimitation = nutritionLimitation;
        this.festival = festival;
        this.specialElement = specialElement;
        this.easy = easy;
    }

    public List<String> getTaste() {
        return taste;
    }

    public void setTaste(List<String> taste) {
        this.taste = taste;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getDishType() {
        return dishType;
    }

    public void setDishType(String dishType) {
        this.dishType = dishType;
    }

    public List<String> getTargetPeople() {
        return targetPeople;
    }

    public void setTargetPeople(List<String> targetPeople) {
        this.targetPeople = targetPeople;
    }

    public List<String> getNutritionLimitation() {
        return nutritionLimitation;
    }

    public void setNutritionLimitation(List<String> nutritionLimitation) {
        this.nutritionLimitation = nutritionLimitation;
    }

    public List<String> getFestival() {
        return festival;
    }

    public void setFestival(List<String> festival) {
        this.festival = festival;
    }

    public List<String> getSpecialElement() {
        return specialElement;
    }

    public void setSpecialElement(List<String> specialElement) {
        this.specialElement = specialElement;
    }

    public boolean isEasy() {
        return easy;
    }

    public void setEasy(boolean easy) {
        this.easy = easy;
    }
}
