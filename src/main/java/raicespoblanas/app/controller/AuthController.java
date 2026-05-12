package raicespoblanas.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import raicespoblanas.app.dto.AuthResponse;
import raicespoblanas.app.dto.LoginRequest;
import raicespoblanas.app.model.User;
import raicespoblanas.app.service.AuthService;
import raicespoblanas.app.service.JwtService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Permite conexión con el frontend
public class AuthController {

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
        // Aquí llamarías a un AuthenticationManager para validar
        String token = jwtService.generateToken(loginRequest.getUsername());
        return ResponseEntity.ok(new AuthResponse(token, loginRequest.getUsername(), "ROLE_USER"));
    }
}