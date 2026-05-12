package raicespoblanas.app.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String role;
    private BigDecimal walletBalance;
}