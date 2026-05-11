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
                .orElseThrow(() -> new RuntimeException("Esta pieza no es un producto original verificado de Raíces Poblanas."));
    }

    public List<Product> getByMunicipality(String city) {
        return productRepository.findByNameContainingIgnoreCase(city);
    }

    public Product savePiece(Product product) {
        return productRepository.save(product);
    }

    public void deletePiece(Long id) {
        productRepository.deleteById(id);
    }
}