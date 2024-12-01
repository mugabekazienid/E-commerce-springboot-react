package com.burikantuShopApp.burikantu_Shop_App.repository;

import com.burikantuShopApp.burikantu_Shop_App.model.Order;
import com.burikantuShopApp.burikantu_Shop_App.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}
