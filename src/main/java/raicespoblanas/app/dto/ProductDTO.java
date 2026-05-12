package raicespoblanas.app.dto;

import java.math.BigDecimal;
import java.util.UUID;

import lombok.Data;

@Data
public class ProductDTO {
    private Long id;
    private UUID uniquePieceId; // El identificador para el QR
    private String name;
    private String artisanName;
    private String municipality;
    private String categoryName;
    private String description;
    private String materials;
    private BigDecimal price;
    private String status;
    private String collectionName;
}