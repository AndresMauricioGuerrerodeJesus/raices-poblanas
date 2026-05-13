package raicespoblanas.app.dto;

public class AuthResponse {
    private String token;
    private String username;
    private String role;
    private Long userId;

    // Constructor vacío (necesario para JSON)
    public AuthResponse() {}

    // Constructor manual de 4 parámetros (esto quita el error del Controller)
    public AuthResponse(String token, String username, String role, Long userId) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.userId = userId;
    }

    // Getters y Setters manuales (por si Lombok parpadea)
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}