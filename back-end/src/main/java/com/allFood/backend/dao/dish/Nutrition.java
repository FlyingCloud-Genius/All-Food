package com.allFood.backend.dao.dish;

public class Nutrition {

    private Integer sugar;

    private Integer protein;

    private Integer cholesterol;

    private Integer fat;

    private Integer calories;

    private Integer saturatedFat;

    private Integer sodium;

    public Nutrition(Integer sugar, Integer protein, Integer cholesterol, Integer fat, Integer calories, Integer saturatedFat, Integer sodium) {
        this.sugar = sugar;
        this.protein = protein;
        this.cholesterol = cholesterol;
        this.fat = fat;
        this.calories = calories;
        this.saturatedFat = saturatedFat;
        this.sodium = sodium;
    }

    public Integer getSugar() {
        return sugar;
    }

    public void setSugar(Integer sugar) {
        this.sugar = sugar;
    }

    public Integer getProtein() {
        return protein;
    }

    public void setProtein(Integer protein) {
        this.protein = protein;
    }

    public Integer getCholesterol() {
        return cholesterol;
    }

    public void setCholesterol(Integer cholesterol) {
        this.cholesterol = cholesterol;
    }

    public Integer getFat() {
        return fat;
    }

    public void setFat(Integer fat) {
        this.fat = fat;
    }

    public Integer getCalories() {
        return calories;
    }

    public void setCalories(Integer calories) {
        this.calories = calories;
    }

    public Integer getSaturatedFat() {
        return saturatedFat;
    }

    public void setSaturatedFat(Integer saturatedFat) {
        this.saturatedFat = saturatedFat;
    }

    public Integer getSodium() {
        return sodium;
    }

    public void setSodium(Integer sodium) {
        this.sodium = sodium;
    }
}
