package raicespoblanas.app.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Table(name = "artisans")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Artisan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long artisanId; // CAMBIADO de artisan_id

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String bio;
    private String municipality;
    
    @Lob
    private byte[] profile_picture;

    private boolean is_verified = false;
}