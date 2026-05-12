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
@CrossOrigin(origins = "http://localhost:5173") // Centralizado para tu puerto de Vite
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
        // 1. VALIDACIÓN: Comprueba que el usuario y la contraseña existan en la DB
        // Esto lanzará una excepción automática si las credenciales son incorrectas
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        // 2. Si la autenticación fue exitosa, generamos el Token
        String token = jwtService.generateToken(loginRequest.getUsername());

        // 3. Obtenemos el rol real del usuario para el frontend
        // Nota: Asegúrate de tener este método en tu AuthService o cámbialo por tu lógica de roles
        String userRole = authService.getUserRole(loginRequest.getUsername());

        return ResponseEntity.ok(new AuthResponse(token, loginRequest.getUsername(), userRole));
    }
}
