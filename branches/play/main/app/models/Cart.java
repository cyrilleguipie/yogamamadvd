package models;

import java.util.Map;
import java.util.TreeMap;

public class Cart {
    // sorted!
    public TreeMap<Long, Item> items = new TreeMap<Long, Item>();
    public Long quantity = 0L;
    public Double total = 0D;
    
    public void reset() {
	items.clear();
	quantity = 0L;
	total = 0D;
    }
    
    public void add(Long productId, Long quantity, Double price) {
	Item item = items.get(productId);
	if (item != null) {
	    item.quantity += quantity;
	    item.price = price;
	    item.total += price * quantity;
	} else {
	    item = new Cart.Item(quantity, price);
	}
	items.put(productId, item);
	this.quantity += quantity;
	this.total += price * quantity;
	
    }
    
    public static class Item {
	public Long quantity = 0L;
	public Double price = 0D;
	public Double total = 0D;
	
	public Item(Long quantity, double price) {
	    this.quantity = quantity;
	    this.price = price;
	    this.total += price * quantity;
	}
    }
}

