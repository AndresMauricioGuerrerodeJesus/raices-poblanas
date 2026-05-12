package raicespoblanas.app.controller;

import java.util.UUID;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import raicespoblanas.app.model.Product;
import raicespoblanas.app.service.ProductService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173") // Centralizado para tu puerto de Vite
public class ProductController {

    @Autowired
    private ProductService productService;

    // --- RUTAS PÚBLICAS (Para todos los usuarios) ---
    // Obtener catálogo general (solo productos con stock)
    @GetMapping("/catalog")
    public ResponseEntity<?> getCatalog() {
        return ResponseEntity.ok(productService.getCatalog());
    }

    // Comprobador QR de autenticidad
    @GetMapping("/verify/{uuid}")
    public ResponseEntity<?> verifyPiece(@PathVariable UUID uuid) {
        return ResponseEntity.ok(productService.verifyQR(uuid));
    }

    // Búsqueda por municipio
    @GetMapping("/search")
    public ResponseEntity<?> searchByCity(@RequestParam String municipality) {
        return ResponseEntity.ok(productService.getByMunicipality(municipality));
    }

    // --- RUTAS DE GESTIÓN (Exclusivas para Artesanos/Admin) ---
    // Obtener solo los productos de un artesano específico
    @GetMapping("/my-products/{artisanId}")
    public ResponseEntity<List<Product>> getArtisanProducts(@PathVariable Long artisanId) {
        return ResponseEntity.ok(productService.getProductsByArtisan(artisanId));
    }

    // AGREGAR: Crear una nueva pieza
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
