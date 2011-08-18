package controllers;

import play.mvc.Before;
import play.mvc.Controller;
 
public class MySecure extends Controller {
    @Before(unless="Account.register")
    static void checkAccess() throws Throwable {
		Secure.checkAccess();
	}
}