package controllers;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import models.Cart;
import models.User;
import models.Cart.Item;
import models.Product;

import play.Logger;
import play.data.validation.CheckWith;
import play.data.validation.Email;
import play.data.validation.Required;
import play.libs.Crypto;
import play.mvc.Before;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.With;

@With(Security.class)
public class Checkout extends Controller {

    @Before
    static void setCart() throws Throwable {
	Cart cart = Cart.fromJson(getCookie("cart"));
	renderArgs.put("cart", cart);
    }

    static Cart getCart() {
	return (Cart) renderArgs.get("cart");
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
	cart.add(productId, quantity, product.price);
	setCookie("cart", cart.toJson());
	
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

    public static void cart() {
	Cart cart = getCart();
	List<Product> products = new LinkedList<Product>();
	for (Long productId : cart.items.keySet()) {
	    Product product = Product.findById(productId);
	    if (product != null) {
		products.add(product);
	    }
	}
	render(products);
    }

    public static void updateCart(List<Long> remove, @Required Map<String, String> items) {
	if (!validation.hasErrors()) {
	    Cart cart = new Cart(); // reset

	    if (remove != null) {
		for (Long removeId : remove) {
		    items.remove(removeId.toString());
		}
	    }

	    for (String i : items.keySet()) {
		Long productId = Long.parseLong(i);
		Product product = Product.findById(productId);
		Long quantity = Long.parseLong(items.get(i));
		if (product != null) {
		    cart.add(productId, quantity, product.price);
		}
	    }

	    setCookie("cart", cart.toJson());
	}

	cart();
    }

    public static void shipment() {
	render();
    }

    public static void payment() {
	if (getCart().shipment != null) {
	    render();
	} else {
	    shipment();
	}
    }

    public static void checkout() {
	shipment();
    }

    public static void setShipment(@Required String shipment) {
	if (!validation.hasErrors()) {
	    Cart cart = getCart();
	    cart.shipment = shipment;
	    setCookie("cart", cart.toJson());
	    payment();
	} else {
	    flash.error("error_validation");
	    params.flash(); // add http parameters to the flash scope
	    validation.keep(); // keep the errors for the next request
	    Checkout.shipment();
	}
    }

    public static void setShipmentWithCreate(@Required(message = "error_firstname") String firstname,
	    @Required(message = "error_lastname") String lastname,
	    @Required(message = "error_email") @Email(message = "error_email")
	    @CheckWith(Account.Unique.class) String email,
	    @Required String shipment) {
	if (!validation.hasErrors()) {
	    User user = Account.createShort(firstname, lastname, email);
	    session.put("username", user.email);
	    Security.setConnectedUser();
	    setShipment(shipment);
	} else {
	    flash.error("error_validation");
	    params.flash(); // add http parameters to the flash scope
	    validation.keep(); // keep the errors for the next request
	    Checkout.shipment();
	}
    }

}
