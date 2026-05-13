package raicespoblanas.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import raicespoblanas.app.dto.AuthResponse;
import raicespoblanas.app.dto.LoginRequest;
import raicespoblanas.app.model.User;
import raicespoblanas.app.service.AuthService;
import raicespoblanas.app.service.JwtService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user, @RequestParam String role) {
        return ResponseEntity.ok(authService.registerUser(user, role));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // 1. Autenticar credenciales
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            // 2. Generar Token
            String token = jwtService.generateToken(loginRequest.getUsername());

            // 3. Buscar usuario para el ID y Rol
            User user = authService.findByUsername(loginRequest.getUsername());

            // Validar rol
            String roleName = (user.getRole() != null) ? user.getRole().getName() : "ROLE_USER";

            // 4. Devolver respuesta (4 parámetros: token, username, role, id)
            return ResponseEntity.ok(new AuthResponse(
                    token,
                    user.getUsername(),
                    roleName,
                    user.getUserId()
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body("Credenciales incorrectas o error en el servidor.");
        }
    }
} // <--- ESTA ES LA LLAVE QUE FALTABA