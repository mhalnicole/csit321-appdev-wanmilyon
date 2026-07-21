ackage com.appdev_wanmilyon.palitdaan.service;

import com.appdev_wanmilyon.palitdaan.entity.MenuItem;
import com.appdev_wanmilyon.palitdaan.repository.MenuItemRepository;
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

