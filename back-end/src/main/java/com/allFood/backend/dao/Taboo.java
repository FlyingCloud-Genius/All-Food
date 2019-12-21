package com.allFood.backend.dao;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "taboo")
public class Taboo implements Serializable {

    @Column(name = "taboo_id")
    private Integer tabooId;

    @Column(name = "taboo_name")
    private String tabooName;

    @Column(name = "preference")
    private List<Preference> preferences = new ArrayList<>();

    public Taboo() {
    }

    public Taboo(Integer tabooId, String tabooName, List<Preference> preferences) {
        this.tabooId = tabooId;
        this.tabooName = tabooName;
        this.preferences = preferences;
    }

    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getTabooId() {
        return tabooId;
    }

    public void setTabooId(Integer tabooId) {
        this.tabooId = tabooId;
    }

    public String getTabooName() {
        return tabooName;
    }

    public void setTabooName(String tabooName) {
        this.tabooName = tabooName;
    }

    @ManyToMany(targetEntity = Preference.class, mappedBy = "taboos")
    public List<Preference> getPreferences() {
        return preferences;
    }

    public void setPreferences(List<Preference> preferences) {
        this.preferences = preferences;
    }
}
