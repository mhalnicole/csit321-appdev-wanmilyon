package com.appdev_wanmilyon.palitdaan.controller;

import com.appdev_wanmilyon.palitdaan.entity.MenuItem;
import com.appdev_wanmilyon.palitdaan.service.MenuItemService;
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

