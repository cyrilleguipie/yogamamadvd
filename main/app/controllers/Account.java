package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;


@With({Security.class})
public class Account extends Controller {

    @Before(unless={"login", "register"})
    static void checkAccess() throws Throwable {
		Secure.checkAccess();

	    /* own login - altertnative for above, but then login failure goes Secure.Login
	
		// See module secure Secure.checkAccess
        if(!Security.isConnected()) {
            flash.put("url", "GET".equals(request.method) ? request.url : "/"); // seems a good default
            login();
        }
	}

  	
	public static void login() {
		flash.keep("url");
		render();
		*/
	}
	

    public static void index() {
        render();
    }

    public static void register() throws Throwable {
	    Object countries = Geonames.getCountries().get("geonames");
		render(countries);
	}
	
	public static void logout(String url) throws Throwable {
		// stay on same page unless in account, see Seucrity.onDisconnected()
		if (url != null && !url.contains("/account/")) {
			flash.put("url", url);
		}
		Secure.logout();
	}
}