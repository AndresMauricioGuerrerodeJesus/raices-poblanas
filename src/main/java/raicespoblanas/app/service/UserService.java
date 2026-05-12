package raicespoblanas.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import raicespoblanas.app.model.User;
import raicespoblanas.app.repository.UserRepository;
import java.math.BigDecimal;

@Service
public class UserService {
    @Autowired private UserRepository userRepository;

    public User addBalance(Long userId, BigDecimal amount) {
        User user = userRepository.findById(userId).orElseThrow();
        user.setWalletBalance(user.getWalletBalance().add(amount));
        return userRepository.save(user);
    }

    public BigDecimal getBalance(Long userId) {
        return userRepository.findById(userId).orElseThrow().getWalletBalance();
    }
}