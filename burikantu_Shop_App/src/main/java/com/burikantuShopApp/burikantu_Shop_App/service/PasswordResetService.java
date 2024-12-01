package com.burikantuShopApp.burikantu_Shop_App.service;

import com.burikantuShopApp.burikantu_Shop_App.model.User;
import com.burikantuShopApp.burikantu_Shop_App.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordResetService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    public void sendResetToken(String email) {
        Optional<User> userOptional = userRepository.findUserByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String token = UUID.randomUUID().toString();
            user.setResetToken(token);
            userRepository.save(user);

            String resetUrl = "http://localhost:8032/reset-password?token=" + token;
            emailService.sendSimpleMessage(email, "Password Reset Request", "Click the link to reset your password: " + resetUrl);
        }
    }

    public User validateToken(String token) {
        return userRepository.findByResetToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));
    }

    public void updatePassword(User user, String newPassword) {
        user.setPassword(new BCryptPasswordEncoder().encode(newPassword));
        user.setResetToken(null);
        userRepository.save(user);
    }
}
