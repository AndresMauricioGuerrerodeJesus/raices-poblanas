package raicespoblanas.app.service;

import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import raicespoblanas.app.model.Category;
import raicespoblanas.app.model.Product;
import raicespoblanas.app.repository.ProductRepository;
import raicespoblanas.app.repository.CategoryRepository; // <--- IMPORTANTE

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository; // <--- ESTO ES LO QUE TE FALTABA INYECTAR

    public List<Product> getCatalog() {
        return productRepository.findByStatus("Available");
    }

    public Product verifyQR(UUID pieceId) {
        return productRepository.findByUniquePieceId(pieceId)
                .orElseThrow(() -> new RuntimeException("Esta pieza no es original."));
    }

    public List<Product> getByMunicipality(String city) {
        return productRepository.findByNameContainingIgnoreCase(city);
    }

    public List<Product> getProductsByArtisan(Long artisanId) {
        return productRepository.findByArtisan_ArtisanId(artisanId);
    }

    public Product savePiece(Product product) {
        // 1. Buscamos la categoría real usando el ID que viene del frontend
        Category cat = categoryRepository.findById(product.getCategory().getCategoryId())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada. Asegúrate de que el ID 1 exista en la DB."));

        // 2. Se la asignamos al producto para que Hibernate esté feliz
        product.setCategory(cat);

        // 3. Guardamos el producto con su imagen Base64 y relación de categoría
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product details) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No encontrado"));

        product.setName(details.getName());
        product.setPrice(details.getPrice());
        product.setDescription(details.getDescription());
        product.setImageUrl(details.getImageUrl());
        product.setStockQuantity(details.getStockQuantity());

        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}