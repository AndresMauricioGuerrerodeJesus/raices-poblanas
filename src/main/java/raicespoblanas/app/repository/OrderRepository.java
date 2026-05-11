package raicespoblanas.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import raicespoblanas.app.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // Historial de compras del cliente
    List<Order> findByCustomer_UserId(Long userId);
}