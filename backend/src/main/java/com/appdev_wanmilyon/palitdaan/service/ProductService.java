ackage com.appdev_wanmilyon.palitdaan.service;

import com.appdev_wanmilyon.palitdaan.entity.Product;
import com.appdev_wanmilyon.palitdaan.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    public Product addProduct(Product product) {
        return repository.save(product);
    }

    public Optional<Product> getProduct(Long id) {
        return repository.findById(id);
    }

    public Product updateProduct(Long id, Product product) {
        product.setId(id);
        return repository.save(product);
    }

    public void deleteProduct(Long id) {
        repository.deleteById(id);
    }
}
