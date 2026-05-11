package raicespoblanas.app.service;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import raicespoblanas.app.model.User;
import raicespoblanas.app.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User addBalance(Long userId, BigDecimal amount) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        user.setWallet_balance(user.getWallet_balance().add(amount));
        return userRepository.save(user);
    }

    public BigDecimal getBalance(Long userId) {
        return userRepository.findById(userId).get().getWallet_balance();
    }
}