package com.palitdaan.service;

import com.palitdaan.entity.Order;
import com.palitdaan.entity.User;
import com.palitdaan.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository repository;

    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }

    public Order placeOrder(Order order) {
        return repository.save(order);
    }

    public List<Order> getOrdersForUser(Long userId) {
        return repository.findByUserId(userId);
    }
}
