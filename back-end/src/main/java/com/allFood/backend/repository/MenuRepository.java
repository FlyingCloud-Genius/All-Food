package com.allFood.backend.repository;

import com.allFood.backend.dao.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<Menu, Long> {

    Menu findByMenuName(String menuName);
}
