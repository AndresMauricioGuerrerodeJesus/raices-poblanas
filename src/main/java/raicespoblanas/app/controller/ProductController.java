package raicespoblanas.app.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import raicespoblanas.app.model.Product;
import raicespoblanas.app.service.ProductService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/catalog")
    public ResponseEntity<?> getCatalog() {
        return ResponseEntity.ok(productService.getCatalog());
    }

    // VISTA: Comprobador QR
    @GetMapping("/verify/{uuid}")
    public ResponseEntity<?> verifyPiece(@PathVariable UUID uuid) {
        return ResponseEntity.ok(productService.verifyQR(uuid));
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchByCity(@RequestParam String municipality) {
        return ResponseEntity.ok(productService.getByMunicipality(municipality));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.savePiece(product));
    }
}