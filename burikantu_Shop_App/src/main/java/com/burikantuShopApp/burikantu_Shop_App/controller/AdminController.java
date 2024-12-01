package com.burikantuShopApp.burikantu_Shop_App.controller;



import com.burikantuShopApp.burikantu_Shop_App.dto.ProductDTO;
import com.burikantuShopApp.burikantu_Shop_App.error.RequestException;
import com.burikantuShopApp.burikantu_Shop_App.model.Category;
import com.burikantuShopApp.burikantu_Shop_App.model.Product;
import com.burikantuShopApp.burikantu_Shop_App.model.User;
import com.burikantuShopApp.burikantu_Shop_App.repository.UserRepository;
import com.burikantuShopApp.burikantu_Shop_App.service.CategoryService;
import com.burikantuShopApp.burikantu_Shop_App.service.ProductService;
import com.opencsv.CSVWriter;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;


import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {
    public static String uploadDir = System.getProperty("user.dir") + "/src/main/resources/static/imageProduct";

    @Autowired
    CategoryService categoryService;
    @Autowired
    ProductService productService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public String adminHome() {
        return "adminHome";
    }

    @GetMapping("/categories")
    public String getCategories(Model model) {
        model.addAttribute("categories", categoryService.getAllCategory());
        return "categories";
    }

    @GetMapping("/categories/add")
    public String getCategoriesAdd(Model model) {
        model.addAttribute("category", new Category());
        return "categoriesAdd";
    }

    @PostMapping("/categories/add")
    public String postCategoriesAdd(@ModelAttribute("category") Category category) {
        categoryService.addCategory(category);
        return "redirect:/admin/categories";
    }

    @GetMapping("/categories/delete/{id}")
    public String deleteCategory(@PathVariable int id) {
        Optional<Category> category = categoryService.getCategoryById(id);
        if (category.isEmpty()) {
            throw new RequestException("Category not found with id: " + id);
        }
        categoryService.deleteCategoryById(id);
        return "redirect:/admin/categories";
    }

    @GetMapping("/categories/update/{id}")
    public String updateCategory(@PathVariable int id, Model model) {
        Optional<Category> category = categoryService.getCategoryById(id);
        if (category.isPresent()) {
            model.addAttribute("category", category.get());
            return "categoriesAdd";
        } else {
            throw new RequestException("Category not found with id: " + id);
        }
    }

    // ########product section####################

    @GetMapping("/products")
    public String getProduct(Model model) {
        model.addAttribute("products", productService.getAllProduct());
        return "products";
    }

    @GetMapping("/products/add")
    public String getProductAdd(Model model) {
        model.addAttribute("productDTO", new ProductDTO());
        model.addAttribute("categories", categoryService.getAllCategory());
        return "productsAdd";
    }

    @PostMapping("/products/add")
    public String postProductAdd(@ModelAttribute("productDTO") ProductDTO productDTO,
                                 @RequestParam("imageProduct") MultipartFile file,
                                 @RequestParam("imgName") String imgName) throws IOException {

        Product product = new Product();
        product.setId(productDTO.getId());
        product.setName(productDTO.getName());
        product.setCategory(categoryService.getCategoryById(productDTO.getCategoryId())
                .orElseThrow(() -> new RequestException("Category not found with id: " + productDTO.getCategoryId())));
        product.setPrice(productDTO.getPrice());
        product.setWeight(productDTO.getWeight());
        product.setDescription(productDTO.getDescription());
        String image;
        if (!file.isEmpty()) {
            image = file.getOriginalFilename();
            Path fileNameAndPath = Paths.get(uploadDir, image);
            Files.write(fileNameAndPath, file.getBytes());
        } else {
            image = imgName;
        }
        product.setImageName(image);
        productService.addProduct(product);

        return "redirect:/admin/products";
    }

    @GetMapping("/product/delete/{id}")
    public String deleteProduct(@PathVariable int id) {
        if (productService.getProductById(id).isEmpty()) {
            throw new RequestException("Product not found with id: " + id);
        }
        productService.deleteProductById(id);
        return "redirect:/products";
    }

    @GetMapping("/product/update/{id}")
    public String updateProduct(@PathVariable long id, Model model) {
        Product product = productService.getProductById(id)
                .orElseThrow(() -> new RequestException("Product not found with id: " + id));
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(product.getId());
        productDTO.setName(product.getName());
        productDTO.setCategoryId(product.getCategory().getId());
        productDTO.setPrice(product.getPrice());
        productDTO.setWeight(product.getWeight());
        productDTO.setDescription(product.getDescription());
        productDTO.setImageName(product.getImageName());

        model.addAttribute("categories", categoryService.getAllCategory());
        model.addAttribute("productDTO", productDTO);

        return "productsAdd";
    }

    @GetMapping("/users")
    public String getUsers(Model model) {
        model.addAttribute("users", userRepository.findAll());
        return "users";
    }

    @GetMapping("/users/pdf")
    public void generateUsersPdf(HttpServletResponse response) throws DocumentException, IOException {
        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=users_list.pdf");

        List<User> users = userRepository.findAll();

        Document document = new Document();
        PdfWriter.getInstance(document, response.getOutputStream());
        document.open();

        document.add(new Paragraph("Users List"));
        document.add(new Paragraph(" ")); // Add a blank line

        for (User user : users) {
            document.add(new Paragraph("ID: " + user.getId()));
            document.add(new Paragraph("First Name: " + user.getFirstName()));
            document.add(new Paragraph("Last Name: " + user.getLastName()));
            document.add(new Paragraph("Email: " + user.getEmail()));
            document.add(new Paragraph(" ")); // Add a blank line between users
        }

        document.close();
    }

    @GetMapping("/users/csv")
    public void generateUsersCsv(HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=users_list.csv");

        List<User> users = userRepository.findAll();

        try (CSVWriter writer = new CSVWriter(response.getWriter())) {
            // Write CSV header
            writer.writeNext(new String[]{"ID", "First Name", "Last Name", "Email"});

            // Write user data
            for (User user : users) {
                writer.writeNext(new String[]{
                        String.valueOf(user.getId()),
                        user.getFirstName(),
                        user.getLastName(),
                        user.getEmail()
                });
            }
        }
    }
}
