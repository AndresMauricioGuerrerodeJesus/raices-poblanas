package raicespoblanas.app.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import raicespoblanas.app.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    // CRÍTICO: Para la consulta de autenticidad mediante el código QR (UUID)
    Optional<Product> findByUniquePieceId(UUID uniquePieceId);
    
    // Para el catálogo filtrado por categorías
    List<Product> findByCategory_Name(String categoryName);
    
    // Para el panel del artesano: ver solo sus propios productos
    List<Product> findByArtisan_ArtisanId(Long artisanId);
    
    // Para mostrar solo lo que está en stock
    List<Product> findByStatus(String status);
    
    // Buscador general por nombre
    List<Product> findByNameContainingIgnoreCase(String name);
}