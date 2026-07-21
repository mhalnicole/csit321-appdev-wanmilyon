package com.appdev_wanmilyon.palitdaan.service;

import com.appdev_wanmilyon.palitdaan.entity.Order;
import com.appdev_wanmilyon.palitdaan.entity.Payment;
import com.appdev_wanmilyon.palitdaan.repository.OrderRepository;
import com.appdev_wanmilyon.palitdaan.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    public PaymentService(PaymentRepository paymentRepository, OrderRepository orderRepository) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
    }

    public Payment processPayment(Payment payment) {
        // Find associated order
        Optional<Order> orderOpt = orderRepository.findById(payment.getOrderId());
        
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            // Mark the order as paid & preparing
            order.setStatus("Paid & Preparing");
            orderRepository.save(order);
            
            // Set transaction amount matching order price if not defined
            if (payment.getAmount() <= 0) {
                payment.setAmount(order.getPrice());
            }
            payment.setPaymentStatus("COMPLETED");
        } else {
            payment.setPaymentStatus("FAILED");
            throw new IllegalArgumentException("Order with ID " + payment.getOrderId() + " does not exist.");
        }
        
        return paymentRepository.save(payment);
    }
}

