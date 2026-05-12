package raicespoblanas.app.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class NotificationDTO {
    private Long id;
    private String message;
    private boolean isRead;
    private LocalDateTime createdAt;
}