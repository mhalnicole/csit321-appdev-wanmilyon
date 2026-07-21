ackage com.appdev_wanmilyon.palitdaan.repository;

import com.appdev_wanmilyon.palitdaan.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
}

