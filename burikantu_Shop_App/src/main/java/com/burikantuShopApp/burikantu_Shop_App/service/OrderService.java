package com.burikantuShopApp.burikantu_Shop_App.service;

import com.burikantuShopApp.burikantu_Shop_App.model.Order;
import com.burikantuShopApp.burikantu_Shop_App.model.Product;
import com.burikantuShopApp.burikantu_Shop_App.model.User;
import com.burikantuShopApp.burikantu_Shop_App.repository.OrderRepository;
import com.burikantuShopApp.burikantu_Shop_App.repository.ProductRepository;
import com.burikantuShopApp.burikantu_Shop_App.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public void saveOrder(Long productId, String email, int quantity) {
        User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Order order = new Order();
        order.setUser(user);
        order.setProduct(product);
        order.setQuantity(quantity);
        order.setOrderDate(LocalDateTime.now());

        orderRepository.save(order);
    }

    public List<Order> getUserOrders(String email) {
        User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepository.findByUser(user);
    }
}