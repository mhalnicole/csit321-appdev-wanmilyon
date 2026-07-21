ackage com.appdev_wanmilyon.palitdaan.repository;

import com.appdev_wanmilyon.palitdaan.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
