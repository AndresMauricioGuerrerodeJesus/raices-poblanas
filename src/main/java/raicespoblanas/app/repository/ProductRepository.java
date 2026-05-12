package raicespoblanas.app.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import raicespoblanas.app.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByStatus(String status);
    Optional<Product> findByUniquePieceId(UUID pieceId);
    List<Product> findByNameContainingIgnoreCase(String name);
    // NUEVO: Para filtrar por el ID del artesano
    List<Product> findByArtisan_ArtisanId(Long artisanId);
}