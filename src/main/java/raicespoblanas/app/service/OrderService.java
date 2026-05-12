package raicespoblanas.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import raicespoblanas.app.model.*;
import raicespoblanas.app.repository.*;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private NotificationService notificationService;

    @Transactional
    public Order processOrder(Long customerId, Long productId, String address) {
        User customer = userRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        if (!"Available".equals(product.getStatus())) {
            throw new RuntimeException("La pieza ya no está disponible.");
        }

        if (customer.getWalletBalance().compareTo(product.getPrice()) < 0) {
            throw new RuntimeException("Saldo insuficiente en tu billetera.");
        }

        // Cobro y actualización
        customer.setWalletBalance(customer.getWalletBalance().subtract(product.getPrice()));
        userRepository.save(customer);

        Order order = new Order();
        order.setCustomer(customer);
        order.setTotalAmount(product.getPrice());
        order.setShippingAddress(address);
        order.setOrderStatus("Paid");
        Order savedOrder = orderRepository.save(order);

        product.setStatus("Sold");
        productRepository.save(product);

        notificationService.send(product.getArtisan().getUser(), 
            "¡Venta! Han comprado tu pieza: " + product.getName());

        return savedOrder;
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByCustomer_UserId(userId);
    }
}