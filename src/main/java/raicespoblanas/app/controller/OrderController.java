package raicespoblanas.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import raicespoblanas.app.dto.OrderRequest;
import raicespoblanas.app.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // VISTA: Carrito / Pago
    @PostMapping("/checkout")
    public ResponseEntity<?> processOrder(@RequestBody OrderRequest request) {
        try {
            return ResponseEntity.ok(orderService.checkout(
                request.getCustomerId(), 
                request.getProductId(), 
                request.getShippingAddress()
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // VISTA: Seguimiento de Pedido
    @GetMapping("/my-history/{userId}")
    public ResponseEntity<?> getHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.getCustomerOrders(userId));
    }
}