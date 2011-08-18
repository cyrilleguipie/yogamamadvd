package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class Application extends Controller {

    public static void index() {
        render();
    }

    public static void list() {
        List<Product> products = Product.find("order by id asc").fetch(3);
        render(products);
    }

    public static void show(Long id) {
        Product product = Product.findById(id);
        render(product);
    }

    @Before
    static void setConnectedUser() {
        if(Security.isConnected()) {
            User user = User.find("byEmail", Security.connected()).first();
            renderArgs.put("user", user.fullname);
        }
    }
}