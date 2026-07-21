package com.example.appdev.abellaquijanopasaolpatonogjuly15.controller;

import com.example.appdev.abellaquijanopasaolpatonogjuly15.entity.Payment;
import com.example.appdev.abellaquijanopasaolpatonogjuly15.service.PaymentService;
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
