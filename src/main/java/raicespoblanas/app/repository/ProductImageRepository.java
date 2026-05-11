package raicespoblanas.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import raicespoblanas.app.model.ProductImage;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    // Para traer las 3 fotos de una pieza específica
    List<ProductImage> findByProduct_ProductId(Long productId);
}