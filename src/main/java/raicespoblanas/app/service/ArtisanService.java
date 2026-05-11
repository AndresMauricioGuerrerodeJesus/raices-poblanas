package raicespoblanas.app.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import raicespoblanas.app.model.Artisan;
import raicespoblanas.app.repository.ArtisanRepository;
import raicespoblanas.app.repository.ProductRepository;

@Service
public class ArtisanService {
    @Autowired
    private ArtisanRepository artisanRepository;
    @Autowired
    private ProductRepository productRepository;

    public Artisan getProfile(Long userId) {
        return artisanRepository.findByUser_UserId(userId);
    }

    // Para el Dashboard: Métricas rápidas
    public Map<String, Object> getDashboardStats(Long artisanId) {
        Map<String, Object> stats = new HashMap<>();
        long totalProducts = productRepository.findByArtisan_ArtisanId(artisanId).size();
        stats.put("totalPieces", totalProducts);
        return stats;
    }
}