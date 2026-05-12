package raicespoblanas.app.dto;

import lombok.Data;

@Data
public class ArtisanDTO {
    private Long id;
    private String username;
    private String bio;
    private String municipality;
    private boolean isVerified;
}