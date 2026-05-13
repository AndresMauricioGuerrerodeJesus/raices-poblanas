package raicespoblanas.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import raicespoblanas.app.model.Order; // Asumiendo que tienes este modelo
import raicespoblanas.app.service.OrderService;

import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<?> placeOrder(@RequestBody Map<String, Object> orderRequest) {
        try {
            // El request llevará el userId y la lista de items del carrito
            orderService.createOrder(orderRequest);
            return ResponseEntity.ok("Pedido realizado con éxito. El artesano ha sido notificado.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al procesar el pedido: " + e.getMessage());
        }
    }
}