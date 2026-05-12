package raicespoblanas.app.dto;

import lombok.Data;

@Data
public class OrderRequest {
    private Long customerId;
    private Long productId;
    private String shippingAddress;
}