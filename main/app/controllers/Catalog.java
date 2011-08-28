package controllers;

import java.util.List;

import models.Cart;
import models.Product;
import play.mvc.Controller;
import play.mvc.With;

@With({Security.class, Checkout.class})
public class Catalog extends Controller {

    public static void list() {
	List<Product> products = Product.find("order by id asc").fetch(3);
	Cart cart = Checkout.getCart();
	render(products, cart);
    }

    public static void show(Long id) {
	Product product = Product.findById(id);
	render(product);
    }
    
}
