package controllers;

import play.*;
import play.mvc.*;
import models.*;
 
public class Security extends Secure.Security {
    @Before
	static void setConnectedUser() throws Throwable {
	    Logger.info("Security.setConnectedUser: " + request.action);
	    if(Security.isConnected()) {
	        User user = User.find("byEmail", Security.connected()).first();
	        renderArgs.put("user", user.fullname);
	    }
	}

    static boolean authenticate(String username, String password) {
        return User.find("byEmailAndPassword", username, password).first() != null;
    }

	static boolean check(String profile) {
	    if("admin".equals(profile)) {
	        return User.find("byEmail", connected()).<User>first().isAdmin;
	    }
	    return false;
	}
	
	static void onDisconnected() {
		String returnUrl = flash.get("url");
		redirect(returnUrl == null ? "/" : returnUrl);
	}
}