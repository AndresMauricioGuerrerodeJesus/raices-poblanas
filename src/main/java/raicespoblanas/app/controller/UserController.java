package raicespoblanas.app.controller;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import raicespoblanas.app.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    // "Botón Mágico" para cargar saldo en pruebas
    @PostMapping("/{userId}/wallet/add")
    public ResponseEntity<?> addFunds(@PathVariable Long userId, @RequestParam BigDecimal amount) {
        return ResponseEntity.ok(userService.addBalance(userId, amount));
    }

    @GetMapping("/{userId}/wallet/balance")
    public ResponseEntity<?> getBalance(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getBalance(userId));
    }
}