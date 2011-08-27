package controllers;

import play.*;
import play.cache.Cache;
import play.data.validation.Required;
import play.i18n.Messages;
import play.libs.Crypto;
import play.mvc.*;

import java.lang.reflect.Type;
import java.util.*;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;

import models.*;

@With(Security.class)
public class Application extends Controller {

    public static void index() {
	render();
    }

    public static void list() {
	List<Product> products = Product.find("order by id asc").fetch(3);
	Cart cart = getCart();
	render(products, cart);
    }

    public static void show(Long id) {
	Product product = Product.findById(id);
	render(product);
    }
    
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
	
	// rederTemplate("/app/views/Application/addToCart.json", cart, product); 
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