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

    @Autowired
    private raicespoblanas.app.config.JwtAuthenticationFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // 1. RUTAS PÚBLICAS (Todos pueden entrar sin Token)
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/products/catalog").permitAll()
                        .requestMatchers("/api/products/verify/**").permitAll()
                        .requestMatchers("/api/products/search/**").permitAll()
                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**").permitAll()

                        // Permitir ver detalles de CUALQUIER producto para la tienda
                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/products/**").permitAll()

                        // 2. RUTAS PRIVADAS (Requieren Rol de Artesano o Admin)
                        // Gestión de Perfil de Artesano
                        .requestMatchers("/api/artisans/**").hasAnyRole("ARTISAN", "ADMIN")

                        // Gestión de Inventario (Solo artesanos crean/borran)
                        .requestMatchers("/api/products/add").hasAnyRole("ARTISAN", "ADMIN")
                        .requestMatchers("/api/products/my-products/**").hasAnyRole("ARTISAN", "ADMIN")
                        .requestMatchers("/api/products/update/**").hasAnyRole("ARTISAN", "ADMIN")
                        .requestMatchers("/api/products/delete/**").hasAnyRole("ARTISAN", "ADMIN")

                        // 3. CUALQUIER OTRA PETICIÓN: Requiere estar logueado
                        .anyRequest().authenticated()
                );

        // Añadir el filtro de JWT antes del filtro estándar de Spring
        http.addFilterBefore(jwtAuthFilter, org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}