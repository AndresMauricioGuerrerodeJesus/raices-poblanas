package raicespoblanas.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import raicespoblanas.app.model.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    // Para la "campanita" del artesano o cliente (solo no leídas)
    List<Notification> findByUser_UserIdAndIsReadFalseOrderByCreatedAtDesc(Long userId);
}