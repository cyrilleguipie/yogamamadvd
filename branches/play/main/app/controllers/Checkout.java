package controllers;

import models.Cart;
import models.Product;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;

import play.Logger;
import play.data.validation.Required;
import play.libs.Crypto;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.With;

@With(Security.class)
public class Checkout extends Controller {

    static Cart getCart() {
	Cart cart = null;
	String c = getCookie("cart");
	if (c != null) {
	    try {
		cart = new Gson().fromJson(c, Cart.class);
	    } catch(JsonParseException e) {
		Logger.warn("Invalid cart, ingoring: %s, %s", c, e.getMessage());
	    }
	}
	if (cart == null) {
	    cart = new Cart();
	}
	return cart;
    }

    public static void addToCart(@Required Long productId, @Required Long quantity) {
	if (validation.hasErrors()) {
	    error("productId and quantity are required");
	}
	Product product = Product.findById(productId);
	if (product == null) {
	    error("Product " + productId + " not foudn");
	}
	Cart cart = getCart();
	Long q = quantity;
	if (cart.cart.get(productId) != null) {
	    q += cart.cart.get(productId);
	}
	cart.cart.put(productId, q);
	cart.items += quantity;
	cart.total += product.price * quantity;
	String json = new Gson().toJson(cart);
	setCookie("cart", json);
	
	//renderTemplate("/app/views/Checkout/addToCart.json", cart, product); 
	render(cart, product);
    }
    
    static String getCookie(String name) {
        Http.Cookie cookie = request.cookies.get(name);
        if(cookie != null && cookie.value.indexOf("-") > 0) {
            String sign = cookie.value.substring(0, cookie.value.indexOf("-"));
            String value = cookie.value.substring(cookie.value.indexOf("-") + 1);
            if(Crypto.sign(value).equals(sign)) {
        	return value;
            }
        }
        return null;
    }

    static void setCookie(String name, String value) {
        response.setCookie(name, Crypto.sign(value) + "-" + value);

    }
    
}
