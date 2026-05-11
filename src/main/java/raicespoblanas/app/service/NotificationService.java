package raicespoblanas.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import raicespoblanas.app.model.Notification;
import raicespoblanas.app.model.User;
import raicespoblanas.app.repository.NotificationRepository;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public void send(User user, String msg) {
        Notification n = new Notification();
        n.setUser(user);
        n.setMessage(msg);
        notificationRepository.save(n);
    }

    public List<Notification> getMyNotifications(Long userId) {
        return notificationRepository.findByUser_UserIdAndIsReadFalseOrderByCreatedAtDesc(userId);
    }
}
