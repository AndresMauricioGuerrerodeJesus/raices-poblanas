package raicespoblanas.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import raicespoblanas.app.model.Artisan;
import raicespoblanas.app.repository.ArtisanRepository;

@RestController
@RequestMapping("/api/artisans")
@CrossOrigin(origins = "http://localhost:5173")
public class ArtisanController {

    @Autowired
    private ArtisanRepository artisanRepository;

    // Obtener perfil actual
    @GetMapping("/{id}")
    public ResponseEntity<Artisan> getProfile(@PathVariable Long id) {
        return artisanRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Actualizar biografía y comunidad
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProfile(@PathVariable Long id, @RequestBody Artisan details) {
        try {
            Artisan artisan = artisanRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Artesano no encontrado"));

            // Solo actualizamos los campos de la biografía, NO el ID ni el objeto User
            artisan.setBio(details.getBio());
            artisan.setMunicipality(details.getMunicipality());
            artisan.setProfilePicture(details.getProfilePicture());

            artisanRepository.save(artisan);
            return ResponseEntity.ok("Perfil actualizado exitosamente");
        } catch (Exception e) {
            e.printStackTrace(); // Esto imprimirá el error real en tu consola de IntelliJ
            return ResponseEntity.status(500).body("Error al actualizar: " + e.getMessage());
        }
    }
}