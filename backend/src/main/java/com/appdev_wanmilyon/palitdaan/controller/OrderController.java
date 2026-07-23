package com.appdev_wanmilyon.palitdaan.controller;

import com.appdev_wanmilyon.palitdaan.entity.Order;
import com.appdev_wanmilyon.palitdaan.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Order> placeOrder(@RequestBody Order order) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.placeOrder(order));
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return service.getAllOrders();
    }

    @GetMapping("/all")
    public List<Order> getAllOrdersAlias() {
        return service.getAllOrders();
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersForUser(@PathVariable Long userId) {
        return service.getOrdersForUser(userId);
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long orderId, @RequestParam String status) {
        try {
            Order updatedOrder = service.updateOrderStatus(orderId, status);
            return ResponseEntity.ok(updatedOrder);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.notFound().build();
        }
    }
}
