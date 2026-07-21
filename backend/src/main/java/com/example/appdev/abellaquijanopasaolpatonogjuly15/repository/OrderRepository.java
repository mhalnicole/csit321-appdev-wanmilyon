package com.example.appdev.abellaquijanopasaolpatonogjuly15.repository;

import com.example.appdev.abellaquijanopasaolpatonogjuly15.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
}
