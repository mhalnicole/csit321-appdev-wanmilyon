package com.example.appdev.abellaquijanopasaolpatonogjuly15.controller;

import com.example.appdev.abellaquijanopasaolpatonogjuly15.entity.MenuItem;
import com.example.appdev.abellaquijanopasaolpatonogjuly15.service.MenuItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/menu")
@CrossOrigin(origins = "http://localhost:3000")
public class MenuItemController {

    private final MenuItemService service;

    public MenuItemController(MenuItemService service) {
        this.service = service;
    }

    @GetMapping
    public List<MenuItem> getMenuItems() {
        return service.getAllMenuItems();
    }

    @PostMapping
    public MenuItem addMenuItem(@RequestBody MenuItem menuItem) {
        return service.addMenuItem(menuItem);
    }
}
