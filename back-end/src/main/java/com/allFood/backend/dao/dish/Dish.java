package com.allFood.backend.dao.dish;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "dish")
public class Dish {

    private Long dishId;

    private String dishName;

    private Integer cookingTime;

    private List<String> steps;

    private String submitTime;

    private String description;

    private Integer visitTimes;

    private Nutrition nutrition;

    private List<String> ingredient;

    private Tag tag;

    private List<Integer> tagSummary;

    public Long getDishId() {
        return dishId;
    }

    public void setDishId(Long dishId) {
        this.dishId = dishId;
    }

    public String getDishName() {
        return dishName;
    }

    public void setDishName(String dishName) {
        this.dishName = dishName;
    }

    public Integer getCookingTime() {
        return cookingTime;
    }

    public void setCookingTime(Integer cookingTime) {
        this.cookingTime = cookingTime;
    }

    public List<String> getSteps() {
        return steps;
    }

    public void setSteps(List<String> steps) {
        this.steps = steps;
    }

    public String getSubmitTime() {
        return submitTime;
    }

    public void setSubmitTime(String submitTime) {
        this.submitTime = submitTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getVisitTimes() {
        return visitTimes;
    }

    public void setVisitTimes(Integer visitTimes) {
        this.visitTimes = visitTimes;
    }

    public Nutrition getNutrition() {
        return nutrition;
    }

    public void setNutrition(Nutrition nutrition) {
        this.nutrition = nutrition;
    }

    public List<String> getIngredient() {
        return ingredient;
    }

    public void setIngredient(List<String> ingredient) {
        this.ingredient = ingredient;
    }

    public Tag getTag() {
        return tag;
    }

    public void setTag(Tag tag) {
        this.tag = tag;
    }

    public List<Integer> getTagSummary() {
        return tagSummary;
    }

    public void setTagSummary(List<Integer> tagSummary) {
        this.tagSummary = tagSummary;
    }

    @Override
    public String toString() {
        return "Dish{" +
                "dishId=" + dishId +
                ", dishName='" + dishName + '\'' +
                ", cookingTime=" + cookingTime +
                ", steps=" + steps +
                ", submitTime='" + submitTime + '\'' +
                ", description='" + description + '\'' +
                ", visitTImes=" + visitTimes +
                ", nutrition=" + nutrition +
                ", ingredient=" + ingredient +
                ", tag=" + tag +
                ", tagSummary=" + tagSummary +
                '}';
    }
}
