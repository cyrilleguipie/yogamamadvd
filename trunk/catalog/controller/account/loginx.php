<?php
require_once(DIR_SYSTEM . 'library/resource.php');
class ControllerAccountLoginX extends Resource {
    /**
    * Authenticate
    */
    function post($email, $password) {
    	if (!$this->customer->login($email, $password)) {
        $this->forbidden($this->language->get('error_login'));
      } else {
        $this->renderJson($this->customer);
      }
    }
    
}

