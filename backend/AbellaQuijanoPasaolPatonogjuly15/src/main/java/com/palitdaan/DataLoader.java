package com.palitdaan;

import com.palitdaan.entity.MenuItem;
import com.palitdaan.entity.Product;
import com.palitdaan.entity.User;
import com.palitdaan.repository.MenuItemRepository;
import com.palitdaan.repository.ProductRepository;
import com.palitdaan.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadData(UserRepository userRepository,
            ProductRepository productRepository,
            MenuItemRepository menuItemRepository) {
        return args -> {
            if (userRepository.count() == 0) {
                User user = new User();
                user.setFullName("Test User");
                user.setStudentId("20240001");
                user.setEmail("test@palitdaan.com");
                user.setPassword("password123");
                user.setRole("USER");
                userRepository.save(user);
            }

            if (productRepository.count() == 0) {
                Product product = new Product();
                product.setName("Classic Burger");
                product.setCategory("Main");
                product.setPrice(120.0);
                product.setImage("burger.jpg");
                product.setDescription("A classic savory burger");
                productRepository.save(product);
            }

            if (menuItemRepository.count() == 0) {
                MenuItem menuItem = new MenuItem();
                menuItem.setName("Spicy Fries");
                menuItem.setCategory("Side");
                menuItem.setPrice(70.0);
                menuItem.setImage("fries.jpg");
                menuItem.setDescription("Crispy fries with spicy seasoning");
                menuItemRepository.save(menuItem);
            }
        };
    }
}
