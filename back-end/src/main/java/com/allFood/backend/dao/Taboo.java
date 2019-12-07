package com.allFood.backend.dao;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "taboo")
@Access(AccessType.PROPERTY)
public class Taboo {

    private Integer tabooId;

    private String taboo_name;

    private List<Preference> preferences = new ArrayList<>();

    public Taboo() {
    }

    public Taboo(Integer tabooId, String taboo_name, List<Preference> preferences) {
        this.tabooId = tabooId;
        this.taboo_name = taboo_name;
        this.preferences = preferences;
    }

    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "taboo_id")
    public Integer getTabooId() {
        return tabooId;
    }

    public void setTabooId(Integer tabooId) {
        this.tabooId = tabooId;
    }

    @Column(name = "taboo_name")
    public String getTaboo_name() {
        return taboo_name;
    }

    public void setTaboo_name(String taboo_name) {
        this.taboo_name = taboo_name;
    }

    @Column(name = "preference")
    @ManyToMany(targetEntity = Preference.class, mappedBy = "taboos")
    public List<Preference> getPreferences() {
        return preferences;
    }

    public void setPreferences(List<Preference> preferences) {
        this.preferences = preferences;
    }
}
