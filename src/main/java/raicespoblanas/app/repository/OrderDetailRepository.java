package raicespoblanas.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import raicespoblanas.app.model.OrderDetail;
import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {

    // El guion bajo "_" le indica a JPA que entre al objeto "Order" 
    // y busque la propiedad "orderId" que definimos arriba.
    List<OrderDetail> findByOrder_OrderId(Long orderId);
}
