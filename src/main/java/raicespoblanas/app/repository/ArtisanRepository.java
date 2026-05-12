package raicespoblanas.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import raicespoblanas.app.model.Artisan;

@Repository
public interface ArtisanRepository extends JpaRepository<Artisan, Long> {
    
    // Spring leerá: "Busca en Artisan -> propiedad User -> propiedad UserId"
    Artisan findByUser_UserId(Long userId);
}