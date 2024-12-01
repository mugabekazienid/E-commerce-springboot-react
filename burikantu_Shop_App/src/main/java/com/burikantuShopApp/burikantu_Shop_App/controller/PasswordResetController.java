package com.burikantuShopApp.burikantu_Shop_App.controller;

import com.burikantuShopApp.burikantu_Shop_App.model.User;
import com.burikantuShopApp.burikantu_Shop_App.service.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class PasswordResetController {

    @Autowired
    private PasswordResetService passwordResetService;

    @GetMapping("/forgot-password")
    public String showForgotPasswordForm() {
        return "forgot-password";
    }

    @PostMapping("/forgot-password")
    public String processForgotPassword(@RequestParam("email") String email) {
        passwordResetService.sendResetToken(email);
        return "redirect:/forgot-password?success";
    }

    @GetMapping("/reset-password")
    public String showResetPasswordForm(@RequestParam("token") String token, Model model) {
        try {
            User user = passwordResetService.validateToken(token);
            model.addAttribute("token", token);
            return "reset-password";
        } catch (RuntimeException e) {
            model.addAttribute("error", "Invalid or expired token. Please request a new password reset.");
            return "error";
        }
    }

    @PostMapping("/reset-password")
    public String handleResetPassword(@RequestParam("token") String token, @RequestParam("password") String password) {
        User user = passwordResetService.validateToken(token);
        passwordResetService.updatePassword(user, password);
        return "redirect:/login?resetSuccess";
    }
}
