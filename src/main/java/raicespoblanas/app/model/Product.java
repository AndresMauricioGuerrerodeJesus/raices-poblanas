package raicespoblanas.app.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long product_id;

    @Column(unique = true, updatable = false)
    private UUID unique_piece_id = UUID.randomUUID();

    @ManyToOne
    @JoinColumn(name = "artisan_id", nullable = false)
    private Artisan artisan;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(nullable = false, length = 150)
    private String name;

    private String collection_name;
    private String description;
    private String materials;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(insertable = false, updatable = false)
    private BigDecimal app_commission;

    @Column(insertable = false, updatable = false)
    private BigDecimal artisan_gain;

    private String status = "Available";

    @Column(updatable = false)
    private LocalDateTime created_at = LocalDateTime.now();
}