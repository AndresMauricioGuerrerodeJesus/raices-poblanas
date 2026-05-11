package raicespoblanas.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import raicespoblanas.app.model.Artisan;

@Repository
public interface ArtisanRepository extends JpaRepository<Artisan, Long> {

    // Para la búsqueda por municipio de la Sierra Norte que pediste
    List<Artisan> findByMunicipality(String municipality);

    // Para verificar si un usuario ya tiene perfil de artesano
    Artisan findByUser_UserId(Long userId);
}
