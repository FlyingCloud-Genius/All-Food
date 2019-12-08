package com.allFood.backend.dao.dish;

import java.util.List;

public class Tag {

    private List<String> taste;

    private List<String> region;

    private List<String> dishType;

    private List<String> targetPeople;

    private List<String> nutritionLimitation;

    private List<String> festival;

    private List<Integer> specialElement;

    private boolean easy;

    public Tag(List<String> taste, List<String> region, List<String> dishType, List<String> targetPeople, List<String> nutritionLimitation, List<String> festival, List<Integer> specialElement, boolean easy) {
        this.taste = taste;
        this.region = region;
        this.dishType = dishType;
        this.targetPeople = targetPeople;
        this.nutritionLimitation = nutritionLimitation;
        this.festival = festival;
        this.specialElement = specialElement;
        this.easy = easy;
    }

    public Tag() {
    }

    public List<String> getTaste() {
        return taste;
    }

    public void setTaste(List<String> taste) {
        this.taste = taste;
    }

    public List<String> getRegion() {
        return region;
    }

    public void setRegion(List<String> region) {
        this.region = region;
    }

    public List<String> getDishType() {
        return dishType;
    }

    public void setDishType(List<String> dishType) {
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

    public List<Integer> getSpecialElement() {
        return specialElement;
    }

    public void setSpecialElement(List<Integer> specialElement) {
        this.specialElement = specialElement;
    }

    public boolean isEasy() {
        return easy;
    }

    public void setEasy(boolean easy) {
        this.easy = easy;
    }
}
