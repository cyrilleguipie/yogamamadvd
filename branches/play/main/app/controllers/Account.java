package controllers;

import play.*;
import play.data.validation.*;
import play.mvc.*;

import java.util.*;

import models.*;

@With({MySecure.class, Security.class})
public class Account extends Controller {

    public static void index() {
        render();
    }

    public static void register() {
		render();
	}
	
	public static void logout(String url) throws Throwable {
		// stay on same page unless in account 
		if (url != null && !url.contains("/account/")) {
			flash.put("url", url);
		}
		Secure.logout();
	}
}