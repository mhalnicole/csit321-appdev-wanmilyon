ackage com.appdev_wanmilyon.palitdaan.repository;

import com.appdev_wanmilyon.palitdaan.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
}

