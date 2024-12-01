package com.burikantuShopApp.burikantu_Shop_App.repository;

import com.burikantuShopApp.burikantu_Shop_App.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findUserByEmail(String email);

    Optional<User> findByResetToken(String resetToken);

}


