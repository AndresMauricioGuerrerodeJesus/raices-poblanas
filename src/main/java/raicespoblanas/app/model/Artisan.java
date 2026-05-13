package raicespoblanas.app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "artisans")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Artisan {
    @Id
    private Long artisanId; // No lleva GeneratedValue porque hereda el del User

    @OneToOne
    @MapsId // Esta anotación vincula el ID de Artisan con el ID de User
    @JoinColumn(name = "user_id")
    private User user;

    @Column(columnDefinition = "TEXT")
    private String bio;
    // En tu archivo Artisan.java
    @Column(columnDefinition = "TEXT")
    private String profilePicture;

    private String municipality;

    private boolean isVerified = false;
}