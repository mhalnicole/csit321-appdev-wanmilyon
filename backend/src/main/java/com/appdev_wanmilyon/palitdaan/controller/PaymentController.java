package com.appdev_wanmilyon.palitdaan.controller;

import com.appdev_wanmilyon.palitdaan.entity.Payment;
import com.appdev_wanmilyon.palitdaan.service.PaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    private final PaymentService service;

    public PaymentController(PaymentService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> processPayment(@RequestBody Payment payment) {
        try {
            Payment completedPayment = service.processPayment(payment);
            return ResponseEntity.status(HttpStatus.CREATED).body(completedPayment);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(Map.of("message", ex.getMessage()));
        }
    }
}

