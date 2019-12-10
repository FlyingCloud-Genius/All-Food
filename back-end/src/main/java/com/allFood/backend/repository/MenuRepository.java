package com.allFood.backend.repository;

import com.allFood.backend.dao.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MenuRepository extends JpaRepository<Menu, Long> {

    Menu findByMenuName(String menuName);

    @Query(nativeQuery = true, value = "select * from db_user limit :start, :end;")
    List<Menu> getMenus(@Param("start") Integer start, @Param("end") Integer end);

    @Query(nativeQuery = true, value = "select * from menu where menu_name like '%:menuName%';")
    List<Menu> findMenuLike(@Param("menuName") String menuName);
}
