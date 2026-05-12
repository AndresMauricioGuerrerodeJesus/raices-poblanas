package raicespoblanas.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import raicespoblanas.app.model.Role;
import raicespoblanas.app.model.User;
import raicespoblanas.app.repository.RoleRepository;
import raicespoblanas.app.repository.UserRepository;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

// Dentro del método registerUser de AuthService.java
public User registerUser(User user, String roleName) {
    if (userRepository.existsByUsername(user.getUsername())) {
        throw new RuntimeException("Error: El usuario ya existe.");
    }
    
    Role role = roleRepository.findByName(roleName)
            .orElseThrow(() -> new RuntimeException("Error: Rol no encontrado."));
    
    user.setRole(role);
    // Cambiar a setPasswordHash
    user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
    return userRepository.save(user);
}
}