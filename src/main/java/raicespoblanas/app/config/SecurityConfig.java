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

                // AQUÍ EMPIEZA EL BLOQUE DE AUTORIZACIÓN
                .authorizeHttpRequests(auth -> auth

                        // 1. REGLAS PÚBLICAS (Abierto para todo el mundo)
                        .requestMatchers("/api/auth/**", "/v3/api-docs/**", "/swagger-ui/**").permitAll()
                        .requestMatchers("/api/products/catalog", "/api/products/verify/**", "/api/products/search/**").permitAll()
                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/products/**").permitAll()

                        // 2. REGLAS PARA ARTESANOS (Requieren Token + Rol específico)
                        // Nota: Spring busca el prefijo "ROLE_" automáticamente (ROLE_ARTISAN)
                        .requestMatchers("/api/artisans/**").hasAnyRole("ARTISAN", "ADMIN")
                        .requestMatchers("/api/products/add", "/api/products/update/**", "/api/products/delete/**").hasAnyRole("ARTISAN", "ADMIN")
                        .requestMatchers("/api/products/my-products/**").hasAnyRole("ARTISAN", "ADMIN")

                        // 3. REGLAS PARA CLIENTES / USUARIOS LOGUEADOS
                        // Aquí puedes poner rutas de pedidos o carrito si quieres que solo logueados compren
                        .requestMatchers("/api/orders/**").authenticated()

                        // 4. EL "CATCH-ALL" (Debe ir al final de TODO)
                        // Cualquier ruta que no coincida con lo anterior, pedirá estar logueado.
                        .anyRequest().authenticated()
                );

        // Agregamos tu filtro JWT antes del filtro de usuario/contraseña
        http.addFilterBefore(jwtAuthFilter, org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // ... (Mantén tus Beans de passwordEncoder, authenticationManager y corsConfigurationSource igual)


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