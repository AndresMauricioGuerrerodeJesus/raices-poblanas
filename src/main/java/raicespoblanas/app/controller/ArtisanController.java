package raicespoblanas.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import raicespoblanas.app.service.ArtisanService;

@RestController
@RequestMapping("/api/artisans")
@CrossOrigin(origins = "*")
public class ArtisanController {

    @Autowired
    private ArtisanService artisanService;

    // VISTA: Biografía del Artesano
    @GetMapping("/profile/{userId}")
    public ResponseEntity<?> getProfile(@PathVariable Long userId) {
        return ResponseEntity.ok(artisanService.getProfile(userId));
    }

    // VISTA: Tablero (Dashboard)
    @GetMapping("/dashboard/{artisanId}")
    public ResponseEntity<?> getStats(@PathVariable Long artisanId) {
        return ResponseEntity.ok(artisanService.getDashboardStats(artisanId));
    }
}