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

    // MÉTODO DE LOGIN (EL QUE FALTABA)
    public User authenticateUser(String username, String password) {
        // 1. Verificar si el usuario existe
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        // 2. Verificar si la contraseña coincide (¡CUIDADO! No uses == , usa .matches)
        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new RuntimeException("Error: Contraseña incorrecta.");
        }

        return user; // Si todo está bien, devuelve el usuario para generar el JWT
    }

    public User registerUser(User user, String roleName) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Error: El usuario ya existe.");
        }
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Error: Rol no encontrado."));
        user.setRole(role);
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        return userRepository.save(user);
    }
}
