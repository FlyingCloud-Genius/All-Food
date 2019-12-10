package com.allFood.backend.repository;

import com.allFood.backend.dao.DishConnection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface DishConnectionRepository extends JpaRepository<DishConnection, Long> {

    DishConnection findBydishId(Long dishId);
}
