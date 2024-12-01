package com.burikantuShopApp.burikantu_Shop_App.controller;


import com.burikantuShopApp.burikantu_Shop_App.error.RequestException;
import com.burikantuShopApp.burikantu_Shop_App.model.Order;
import com.burikantuShopApp.burikantu_Shop_App.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;
import java.util.List;

@Controller
public class OrdersController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/orderHistory")
    public String viewOrders(Model model, Principal principal) {
        List<Order> orders = orderService.getUserOrders(principal.getName());
        model.addAttribute("orders", orders);
        return "orderHistory";
    }

    @ExceptionHandler(RequestException.class)
    public String handleRequestException(RequestException e, Model model) {
        model.addAttribute("errorTitle", "Request Error");
        model.addAttribute("errorMessage", e.getMessage());
        return "error";
    }

    @ExceptionHandler(Exception.class)
    public String handleGenericException(Exception e, Model model) {
        model.addAttribute("errorTitle", "Unexpected Error");
        model.addAttribute("errorMessage", "An unexpected error occurred. Please try again later.");
        return "error";
    }
}
