package models;

import javax.persistence.Entity;

import play.db.jpa.Model;

@Entity
public class PaymentGatewayCategory  extends Model {
    public String name;

    public String toString() {
        return name;
    }

    public int compareTo(PaymentGatewayCategory category) {
        return name.compareTo(category.name);
    }
}
