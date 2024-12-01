package com.burikantuShopApp.burikantu_Shop_App.global;

import com.burikantuShopApp.burikantu_Shop_App.model.Product;

import java.util.ArrayList;
import java.util.List;

public class GlobalData {
    public static List<Product> cart;
    static {
        cart = new ArrayList<Product>();
    }
}
