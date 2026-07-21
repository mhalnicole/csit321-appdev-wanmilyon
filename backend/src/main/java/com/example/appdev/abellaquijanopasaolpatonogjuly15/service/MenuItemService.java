package com.example.appdev.abellaquijanopasaolpatonogjuly15.service;

import com.example.appdev.abellaquijanopasaolpatonogjuly15.entity.MenuItem;
import com.example.appdev.abellaquijanopasaolpatonogjuly15.repository.MenuItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuItemService {

    private final MenuItemRepository repository;

    public MenuItemService(MenuItemRepository repository) {
        this.repository = repository;
    }

    public List<MenuItem> getAllMenuItems() {
        return repository.findAll();
    }

    public MenuItem addMenuItem(MenuItem menuItem) {
        return repository.save(menuItem);
    }
}
