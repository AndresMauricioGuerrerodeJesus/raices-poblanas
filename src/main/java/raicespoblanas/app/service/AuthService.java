package raicespoblanas.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // <--- IMPORTANTE

import raicespoblanas.app.model.Artisan; // <--- ASEGÚRATE DE QUE EXISTA
import raicespoblanas.app.model.Role;
import raicespoblanas.app.model.User;
import raicespoblanas.app.repository.ArtisanRepository; // <--- IMPORTANTE
import raicespoblanas.app.repository.RoleRepository;
import raicespoblanas.app.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ArtisanRepository artisanRepository; // <--- INYECCIÓN NECESARIA

    @Autowired
    private PasswordEncoder passwordEncoder;

    // MÉTODO DE LOGIN
    public User authenticateUser(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new RuntimeException("Error: Contraseña incorrecta.");
        }
        return user;
    }

    @Transactional
    public User registerUser(User user, String roleName) {
        // 1. Cifrar contraseña y asignar rol
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Error: Rol no encontrado."));
        user.setRole(role);

        // 2. Guardar el Usuario
        User savedUser = userRepository.save(user);

        // 3. Si es Artesano, crear su perfil vinculado
        if (roleName.contains("ARTISAN")) {
            Artisan artisan = new Artisan();
            artisan.setUser(savedUser); // MapsId se encarga de igualar los IDs automáticamente
            artisan.setBio("Biografía pendiente de edición.");
            artisan.setMunicipality("Sierra Norte");

            artisanRepository.save(artisan);
        }

        return savedUser;
    }

    public String getUserRole(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return user.getRole().getName();
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }
}