package com.example.appdev.abellaquijanopasaolpatonogjuly15.service;

import com.example.appdev.abellaquijanopasaolpatonogjuly15.entity.Order;
import com.example.appdev.abellaquijanopasaolpatonogjuly15.entity.User;
import com.example.appdev.abellaquijanopasaolpatonogjuly15.repository.OrderRepository;
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

    public Order updateOrderStatus(Long orderId, String status) {
        Order order = repository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found with ID " + orderId));
        order.setStatus(status);
        return repository.save(order);
    }
}
