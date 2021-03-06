package com.allFood.backend.dao;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "preference")
public class Preference implements Serializable {

    @JsonIgnore
    @Column(name = "preference_id")
    private Integer preferenceId;

    @Column(name = "preference_name")
    private String preferenceName;

    @Column(name = "taboos")
    private List<Taboo> taboos = new ArrayList<>();

    @Column(name = "user_preference")
    private List<User> userPreferences = new ArrayList<>();

    public Preference() {
    }

    public Preference(Integer preferenceId, String preferenceName, List<Taboo> taboos) {
        this.preferenceId = preferenceId;
        this.preferenceName = preferenceName;
        this.taboos = taboos;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getPreferenceId() {
        return preferenceId;
    }

    public void setPreferenceId(Integer preferenceId) {
        this.preferenceId = preferenceId;
    }

    public String getPreferenceName() {
        return preferenceName;
    }

    public void setPreferenceName(String preferenceName) {
        this.preferenceName = preferenceName;
    }

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(name = "have_taboo",
            joinColumns = @JoinColumn(name = "preference_id"),
            inverseJoinColumns = @JoinColumn(name = "taboo_id"))
    public List<Taboo> getTaboos() {
        return taboos;
    }

    public void setTaboos(List<Taboo> taboos) {
        this.taboos = taboos;
    }

    public void addTaboo(Taboo taboo) {
        this.taboos.add(taboo);
    }

    public void removeTaboo(Taboo taboo) {
        this.taboos.remove(taboo);
    }

    @ManyToMany(targetEntity = User.class, mappedBy = "myPreference")
    public List<User> getUserPreferences() {
        return userPreferences;
    }

    public void setUserPreferences(List<User> userPreferences) {
        this.userPreferences = userPreferences;
    }
}
