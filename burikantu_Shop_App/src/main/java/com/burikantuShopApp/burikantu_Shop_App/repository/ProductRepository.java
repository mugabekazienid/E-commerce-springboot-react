package com.burikantuShopApp.burikantu_Shop_App.repository;

import com.burikantuShopApp.burikantu_Shop_App.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> findAllByCategoryId(int id);

}
