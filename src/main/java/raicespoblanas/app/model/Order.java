package raicespoblanas.app.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id") // Esto le dice a pgAdmin que busque "order_id"
    private Long orderId; // Cambiado de order_id a orderId

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @Column(name = "total_amount", nullable = false)
    private BigDecimal totalAmount;

    @Column(name = "order_status")
    private String orderStatus = "Paid";

    @Column(name = "tracking_number")
    private String trackingNumber;

    @Column(name = "shipping_address")
    private String shippingAddress;

    @Column(updatable = false)
    private LocalDateTime created_at = LocalDateTime.now();
}