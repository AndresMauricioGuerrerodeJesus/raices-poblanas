package raicespoblanas.app.service;

import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import raicespoblanas.app.model.Product;
import raicespoblanas.app.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

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
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product details) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No encontrado"));
        product.setName(details.getName());
        product.setPrice(details.getPrice());
        product.setDescription(details.getDescription());
        product.setStockQuantity(details.getStockQuantity());
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
