package com.allFood.backend.dao.dish;

public class Nutrition {

    private Double sugar;

    private Double protein;

    private Double cholesterol;

    private Double fat;

    private Double calories;

    private Double saturatedFat;

    private Double sodium;

    public Nutrition(Double sugar, Double protein, Double cholesterol, Double fat, Double calories, Double saturatedFat, Double sodium) {
        this.sugar = sugar;
        this.protein = protein;
        this.cholesterol = cholesterol;
        this.fat = fat;
        this.calories = calories;
        this.saturatedFat = saturatedFat;
        this.sodium = sodium;
    }

    public Nutrition() {
    }

    public Double getSugar() {
        return sugar;
    }

    public void setSugar(Double sugar) {
        this.sugar = sugar;
    }

    public Double getProtein() {
        return protein;
    }

    public void setProtein(Double protein) {
        this.protein = protein;
    }

    public Double getCholesterol() {
        return cholesterol;
    }

    public void setCholesterol(Double cholesterol) {
        this.cholesterol = cholesterol;
    }

    public Double getFat() {
        return fat;
    }

    public void setFat(Double fat) {
        this.fat = fat;
    }

    public Double getCalories() {
        return calories;
    }

    public void setCalories(Double calories) {
        this.calories = calories;
    }

    public Double getSaturatedFat() {
        return saturatedFat;
    }

    public void setSaturatedFat(Double saturatedFat) {
        this.saturatedFat = saturatedFat;
    }

    public Double getSodium() {
        return sodium;
    }

    public void setSodium(Double sodium) {
        this.sodium = sodium;
    }
}
