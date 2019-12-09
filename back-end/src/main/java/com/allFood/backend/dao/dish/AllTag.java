package com.allFood.backend.dao.dish;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "allTag")
public class AllTag {

    private List<String> duration;

    private List<String> fewIngredient;

    private List<String> fewSteps;

    private List<String> nutritionLimitation;

    private List<String> targetPeople;

    private List<String> taste;

    private List<String> region;

    private List<String> festival;

    private List<String> dishType;

    private List<String> ingredient;

    public AllTag() {
    }

    public AllTag(List<String> duration, List<String> fewIngredient, List<String> fewSteps, List<String> nutritionLimitation, List<String> targetPeople, List<String> taste, List<String> region, List<String> festival, List<String> dishType, List<String> ingredient) {
        this.duration = duration;
        this.fewIngredient = fewIngredient;
        this.fewSteps = fewSteps;
        this.nutritionLimitation = nutritionLimitation;
        this.targetPeople = targetPeople;
        this.taste = taste;
        this.region = region;
        this.festival = festival;
        this.dishType = dishType;
        this.ingredient = ingredient;
    }

    public List<String> getDuration() {
        return duration;
    }

    public void setDuration(List<String> duration) {
        this.duration = duration;
    }

    public List<String> getFewIngredient() {
        return fewIngredient;
    }

    public void setFewIngredient(List<String> fewIngredient) {
        this.fewIngredient = fewIngredient;
    }

    public List<String> getFewSteps() {
        return fewSteps;
    }

    public void setFewSteps(List<String> fewSteps) {
        this.fewSteps = fewSteps;
    }

    public List<String> getNutritionLimitation() {
        return nutritionLimitation;
    }

    public void setNutritionLimitation(List<String> nutritionLimitation) {
        this.nutritionLimitation = nutritionLimitation;
    }

    public List<String> getTargetPeople() {
        return targetPeople;
    }

    public void setTargetPeople(List<String> targetPeople) {
        this.targetPeople = targetPeople;
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

    public List<String> getFestival() {
        return festival;
    }

    public void setFestival(List<String> festival) {
        this.festival = festival;
    }

    public List<String> getDishType() {
        return dishType;
    }

    public void setDishType(List<String> dishType) {
        this.dishType = dishType;
    }

    public List<String> getIngredient() {
        return ingredient;
    }

    public void setIngredient(List<String> ingredient) {
        this.ingredient = ingredient;
    }
}
