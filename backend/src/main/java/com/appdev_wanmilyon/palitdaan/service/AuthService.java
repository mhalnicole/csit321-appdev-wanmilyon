package com.appdev_wanmilyon.palitdaan.service;

import com.appdev_wanmilyon.palitdaan.entity.User;
import com.appdev_wanmilyon.palitdaan.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }
        if (userRepository.findByStudentId(user.getStudentId()).isPresent()) {
            throw new IllegalArgumentException("Student ID already exists");
        }
        return userRepository.save(user);
    }

    public Optional<User> login(String studentId, String password) {
        Optional<User> optionalUser = userRepository.findByStudentId(studentId);
        if (optionalUser.isPresent() && password.equals(optionalUser.get().getPassword())) {
            return optionalUser;
        }
        return Optional.empty();
    }
}

