package com.appdev_wanmilyon.palitdaan.controller;

import com.appdev_wanmilyon.palitdaan.entity.User;
import com.appdev_wanmilyon.palitdaan.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userRepository.findById(id).map(user -> {
            if (updatedUser.getFullName() != null) user.setFullName(updatedUser.getFullName());
            if (updatedUser.getEmail() != null) user.setEmail(updatedUser.getEmail());
            if (updatedUser.getStudentId() != null) user.setStudentId(updatedUser.getStudentId());
            User saved = userRepository.save(user);
            return ResponseEntity.ok(saved);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
