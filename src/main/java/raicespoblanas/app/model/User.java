package raicespoblanas.app.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "users")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    private String username;
    private String email;
    
    @Column(name = "password_hash")
    private String passwordHash;

    @Column(name = "wallet_balance")
    private BigDecimal walletBalance = BigDecimal.ZERO;
}