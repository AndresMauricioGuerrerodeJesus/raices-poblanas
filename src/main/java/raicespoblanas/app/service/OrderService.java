package raicespoblanas.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import raicespoblanas.app.model.Order;
import raicespoblanas.app.model.Product;
import raicespoblanas.app.model.User;
import raicespoblanas.app.repository.OrderRepository;
import raicespoblanas.app.repository.ProductRepository;
import raicespoblanas.app.repository.UserRepository;

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
    public Order checkout(Long customerId, Long productId, String address) {
        User customer = userRepository.findById(customerId).get();
        Product product = productRepository.findById(productId).get();

        // Validar disponibilidad
        if (!"Available".equals(product.getStatus())) {
            throw new RuntimeException("La pieza ya ha sido vendida o no está disponible.");
        }

        // Validar Billetera
        if (customer.getWallet_balance().compareTo(product.getPrice()) < 0) {
            throw new RuntimeException("Saldo insuficiente en tu billetera virtual.");
        }

        // 1. Restar saldo
        customer.setWallet_balance(customer.getWallet_balance().subtract(product.getPrice()));
        userRepository.save(customer);

        // 2. Crear Pedido
        Order order = new Order();
        order.setCustomer(customer);
        order.setTotal_amount(product.getPrice());
        order.setShipping_address(address);
        order.setOrder_status("Paid");
        Order savedOrder = orderRepository.save(order);

        // 3. Marcar como vendido
        product.setStatus("Sold");
        productRepository.save(product);

        // 4. Notificar al Artesano
        notificationService.send(product.getArtisan().getUser(), 
            "¡Venta Confirmada! Alguien compró tu pieza: " + product.getName());

        return savedOrder;
    }

    public List<Order> getCustomerOrders(Long userId) {
        return orderRepository.findByCustomer_UserId(userId);
    }
}