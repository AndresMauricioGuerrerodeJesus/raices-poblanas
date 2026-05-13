package raicespoblanas.app.controller;

import java.util.UUID;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import raicespoblanas.app.model.Product;
import raicespoblanas.app.service.ProductService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173") // Centralizado para tu puerto de Vite en React
public class ProductController {

    @Autowired
    private ProductService productService;

    // --- RUTAS PÚBLICAS (Contexto de Consulta OOHDM) ---

    // 1. Obtener catálogo general (solo productos con stock)
    @GetMapping("/catalog")
    public ResponseEntity<?> getCatalog() {
        return ResponseEntity.ok(productService.getCatalog());
    }

    // 2. OBTENER DETALLE (Indispensable para ProductDetail.jsx)
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    // 3. Comprobador QR de autenticidad
    @GetMapping("/verify/{uuid}")
    public ResponseEntity<?> verifyPiece(@PathVariable UUID uuid) {
        return ResponseEntity.ok(productService.verifyQR(uuid));
    }

    // 4. Búsqueda por municipio (Enfoque en Teziutlán y Sierra Norte)
    @GetMapping("/search")
    public ResponseEntity<?> searchByCity(@RequestParam String municipality) {
        return ResponseEntity.ok(productService.getByMunicipality(municipality));
    }

    // --- RUTAS DE GESTIÓN (Exclusivas para Artesanos/Admin) ---

    // Obtener solo los productos de un artesano específico para su Panel
    @GetMapping("/my-products/{artisanId}")
    public ResponseEntity<List<Product>> getArtisanProducts(@PathVariable Long artisanId) {
        return ResponseEntity.ok(productService.getProductsByArtisan(artisanId));
    }

    // AGREGAR: Crear una nueva pieza (con imagen Base64)
    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.savePiece(product));
    }

    // EDITAR: Actualizar datos de una pieza existente
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        Product updatedProduct = productService.updateProduct(id, product);
        return ResponseEntity.ok(updatedProduct);
    }

    // ELIMINAR: Quitar una pieza del inventario
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok("Producto eliminado correctamente");
    }
}