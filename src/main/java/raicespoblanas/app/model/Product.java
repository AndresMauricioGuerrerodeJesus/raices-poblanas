package raicespoblanas.app.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@Data // Esto genera automáticamente todos los Getters, Setters, Equals y HashCode
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    @Column(unique = true, updatable = false)
    private UUID uniquePieceId = UUID.randomUUID();

    @ManyToOne
    @JoinColumn(name = "artisan_id", nullable = false)
    private Artisan artisan;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(nullable = false, length = 150)
    private String name;

    private String collectionName;

    @Column(columnDefinition = "TEXT") // Para descripciones largas
    private String description;

    private String materials;

    @Column(nullable = false)
    private BigDecimal price;

    private Integer stockQuantity = 1;

    private String status = "Available";

    @Column(columnDefinition = "TEXT") // CLAVE: Aquí se guardará el Base64 de la imagen
    private String imageUrl;

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // NOTA: Ya no necesitas los métodos manuales porque @Data de Lombok los crea por ti en tiempo de compilación.
    // Si IntelliJ te marca error en los servicios, asegúrate de tener instalado el plugin de Lombok.
}