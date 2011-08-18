package controllers;
 
import models.*;
import play.Logger;
 
public class Security extends Secure.Security {
	
    static boolean authenticate(String username, String password) {
        return User.find("byEmailAndPassword", username, password) != null;
    }

	static boolean check(String profile) {
	    if("admin".equals(profile)) {
	        return User.find("byEmail", connected()).<User>first().isAdmin;
	    }
	    return false;
	}

	static void onDisconnected() {
	    Application.index();
	}
}