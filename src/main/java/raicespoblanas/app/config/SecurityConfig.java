package raicespoblanas.app.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // 1. Inyecta tu filtro de JWT (Asegúrate de que el nombre coincida con tu clase)
    @Autowired
    private raicespoblanas.app.config.JwtAuthenticationFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // PRIMERO: Las rutas públicas (de lo más específico a lo general)
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/products/catalog").permitAll()
                        .requestMatchers("/api/products/verify/**").permitAll()
                        .requestMatchers("/api/products/search/**").permitAll()

                        // SEGUNDO: Rutas de gestión (requieren ROL)
                        // Usamos hasRole; Spring buscará "ROLE_ARTISAN" en la base de datos
                        .requestMatchers("/api/products/add").hasAnyRole("ARTISAN", "ADMIN")
                        .requestMatchers("/api/products/my-products/**").hasAnyRole("ARTISAN", "ADMIN")
                        .requestMatchers("/api/products/update/**").hasAnyRole("ARTISAN", "ADMIN")
                        .requestMatchers("/api/products/delete/**").hasAnyRole("ARTISAN", "ADMIN")

                        // TERCERO: Swagger y documentación
                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**").permitAll()

                        .anyRequest().authenticated()
                );

        // 2. ¡ESTO ES LO QUE FALTA! Añadir el filtro antes del filtro de usuario/contraseña
        http.addFilterBefore(jwtAuthFilter, org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Encriptación BCrypt para las contraseñas
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173")); // Puerto de Vite
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
