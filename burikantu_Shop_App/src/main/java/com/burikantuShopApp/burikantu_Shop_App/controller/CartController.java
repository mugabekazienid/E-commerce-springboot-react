package com.burikantuShopApp.burikantu_Shop_App.controller;


import com.burikantuShopApp.burikantu_Shop_App.error.ExceptionDetails;
import com.burikantuShopApp.burikantu_Shop_App.error.RequestException;
import com.burikantuShopApp.burikantu_Shop_App.global.GlobalData;
import com.burikantuShopApp.burikantu_Shop_App.model.Product;
import com.burikantuShopApp.burikantu_Shop_App.service.OrderService;
import com.burikantuShopApp.burikantu_Shop_App.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.security.Principal;
import java.time.ZonedDateTime;
import java.util.Map;

@Controller
public class CartController {
    @Autowired
    private ProductService productService;
    @Autowired
    private OrderService orderService;

    @GetMapping("/addToCart/{id}")
    public String addToCart(@PathVariable int id) {
        Product product = productService.getProductById(id)
                .orElseThrow(() -> new RequestException("Product not found with id: " + id));
        GlobalData.cart.add(product);
        return "redirect:/shop";
    }

    @GetMapping("/cart")
    public String cartGet(Model model) {
        model.addAttribute("cartCount", GlobalData.cart.size());
        model.addAttribute("total", GlobalData.cart.stream().mapToDouble(Product::getPrice).sum());
        model.addAttribute("cart", GlobalData.cart);
        return "cart";
    }

    @GetMapping("/cart/removeItem/{index}")
    public String cartItemRemove(@PathVariable int index) {
        if (index < 0 || index >= GlobalData.cart.size()) {
            throw new RequestException("Invalid cart item index: " + index);
        }
        GlobalData.cart.remove(index);
        return "redirect:/cart";
    }

    @GetMapping("/checkout")
    public String checkout(Model model) {
        model.addAttribute("total", GlobalData.cart.stream().mapToDouble(Product::getPrice).sum());
        return "checkout";
    }

    @PostMapping("/payNow")
    public String payNow(Model model) {
        // Perform payment processing here
        // For example, you might call a payment service to process the payment

        // Dummy data for demonstration purposes
        String result = "Payment successful";
        Map<String, String> parameters = Map.of(
                "Item 1", "100",
                "Item 2", "200",
                "Total", "300"
        );

        // Add data to the model
        model.addAttribute("result", result);
        model.addAttribute("parameters", parameters);

        // Return the receipt view
        return "orderPlaced";
    }

    @GetMapping("/cart/add/{id}")
    public String addToCart(@PathVariable Long id, Principal principal) {
        // Add product to cart logic (assuming you have this part already)

        // Save order to the database
        orderService.saveOrder(id, principal.getName(), 1); // Assuming quantity is 1 for simplicity

        return "redirect:/cart";
    }

    @ExceptionHandler(RequestException.class)
    public String handleRequestException(RequestException e, Model model) {
        model.addAttribute("exceptionDetails", new ExceptionDetails(
                e.getMessage(), HttpStatus.BAD_REQUEST, ZonedDateTime.now()
        ));
        return "error";
    }

    @ExceptionHandler(Exception.class)
    public String handleGenericException(Exception e, Model model) {
        model.addAttribute("errorTitle", "Unexpected Error");
        model.addAttribute("errorMessage", "An unexpected error occurred. Please try again later.");
        model.addAttribute("timestamp", ZonedDateTime.now());
        return "error";
    }
}
