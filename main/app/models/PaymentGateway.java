package models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import play.data.validation.Required;
import play.db.jpa.Model;

@Entity
public class PaymentGateway extends Model {
    public String name;
    @ManyToMany(cascade=CascadeType.PERSIST)
    public List<PaymentGatewayCategory> categories;
    
    public static List<PaymentGateway> findByCategory(
	    PaymentGatewayCategory category) {
	return PaymentGateway
	        .find("select distinct g from PaymentGateway g join g.categories as c where c.id in (?)",
	                category.id).fetch();
    }

    public String toString() {
        return name;
    }
}
