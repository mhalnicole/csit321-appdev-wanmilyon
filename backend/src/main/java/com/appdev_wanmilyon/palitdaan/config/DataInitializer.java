package com.appdev_wanmilyon.palitdaan.config;

import com.appdev_wanmilyon.palitdaan.entity.User;
import com.appdev_wanmilyon.palitdaan.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataInitializer(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByStudentId("ADMIN001").isEmpty()) {
            User admin = new User();
            admin.setFullName("Canteen Staff Admin");
            admin.setStudentId("ADMIN001");
            admin.setEmail("admin@palitdaan.cit.edu");
            admin.setPassword("admin123");
            admin.setRole("ADMIN");
            userRepository.save(admin);
            System.out.println("Default Admin Account Created: ADMIN001 / admin123");
        }
    }
}
