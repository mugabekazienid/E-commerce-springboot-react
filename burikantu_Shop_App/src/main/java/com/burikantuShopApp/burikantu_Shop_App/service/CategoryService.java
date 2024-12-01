package com.burikantuShopApp.burikantu_Shop_App.service;

import com.burikantuShopApp.burikantu_Shop_App.model.Category;
import com.burikantuShopApp.burikantu_Shop_App.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;
    public void addCategory(Category category){ categoryRepository.save(category);}
    public List<Category> getAllCategory(){ return categoryRepository.findAll();}
    public void deleteCategoryById(int id){ categoryRepository.deleteById(id);}
    public Optional<Category> getCategoryById(int id){return categoryRepository.findById(id);}

}
