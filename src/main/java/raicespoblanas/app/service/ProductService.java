package raicespoblanas.app.service;

import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import raicespoblanas.app.model.Category;
import raicespoblanas.app.model.Product;
import raicespoblanas.app.repository.ProductRepository;
import raicespoblanas.app.repository.CategoryRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    // 1. OBTENER DETALLE (Este es el que faltaba para la Ficha Técnica)
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con el ID: " + id));
    }

    // 2. Obtener catálogo general (solo productos disponibles)
    public List<Product> getCatalog() {
        return productRepository.findByStatus("Available");
    }

    // 3. Comprobador QR de autenticidad (Propuesta de valor Raíces Poblanas)
    public Product verifyQR(UUID pieceId) {
        return productRepository.findByUniquePieceId(pieceId)
                .orElseThrow(() -> new RuntimeException("Esta pieza no es original o el código es inválido."));
    }

    // 4. Búsqueda por municipio (Filtro geográfico de Puebla)
    public List<Product> getByMunicipality(String city) {
        return productRepository.findByNameContainingIgnoreCase(city);
    }

    // 5. Productos específicos de un artesano para su Panel
    public List<Product> getProductsByArtisan(Long artisanId) {
        return productRepository.findByArtisan_ArtisanId(artisanId);
    }

    // 6. Registro de nueva pieza con relación a Categoría
    public Product savePiece(Product product) {
        Category cat = categoryRepository.findById(product.getCategory().getCategoryId())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada."));

        product.setCategory(cat);
        // Aquí se guarda el imageUrl como TEXT (Base64) según tu configuración
        return productRepository.save(product);
    }

    // 7. Actualización de información del inventario
    public Product updateProduct(Long id, Product details) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado para actualización"));

        product.setName(details.getName());
        product.setPrice(details.getPrice());
        product.setDescription(details.getDescription());
        product.setImageUrl(details.getImageUrl());
        product.setStockQuantity(details.getStockQuantity());
        product.setMaterials(details.getMaterials()); // Asegúrate de incluir materiales

        return productRepository.save(product);
    }

    // 8. Eliminación lógica o física de piezas
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}