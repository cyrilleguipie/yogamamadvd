package models

import play.api.mvc.CookieBaker
import scala.collection.mutable.ListMap
import play.api.mvc.RequestHeader

class Cart(var shipment: String = "", var payment: String = "", var _category: String = "") {
  var items:ListMap[Long, Item] = new ListMap[Long, Item]
  var quantity: Long = 0
  var total:Double = 0d
    
  def += (kv: (Product, Long)) = {
    val (id, price, quantity) = (kv._1.product_id.get, kv._1.price, kv._2)
    // TODO: discounts for multi-order
    val item = new Item(quantity, price, price * quantity)
    items.get(id).map(total -= _.total)
    total += item.total
    items += (id -> item)
    this
  }
  
  def -= (productId: Long) = {
    items.get(productId).map(total -= _.total)
    items -= productId
    this
  }

  def clear = { quantity = 0; total = 0; items.clear }
  
  def totals = Map("total" -> total)

  class Item(var quantity:Long, var price:Double, var total:Double)
}

object Cart extends CookieBaker[Cart] {
  
  val COOKIE_NAME = "cart"
  val emptyCookie = new Cart

  def deserialize(data: Map[String, String]) = {
    val cart = new Cart(data.getOrElse("shipment", ""),
        data.getOrElse("payment", ""),
        data.getOrElse("_category", ""))
    // decode products string to map
    val products = "(\\d+)-(\\d+)".r.findAllIn(data.getOrElse("products", "")).matchData.foldLeft(new ListMap[Long, Long]) {
       (map, m) => map += m.group(1).toLong /* id */ -> m.group(2).toLong /* quantity */
    }
    // add to cart
    Product.findByIds(products.keys.toSeq).foldLeft(cart) { (cart, product) =>
      cart += (product -> products(product.product_id.get) /* quantity */) 
    }
  }

  def serialize(cart: Cart) = Map("shipment" -> cart.shipment,
    "payment" -> cart.payment,
    "_category" -> cart._category,
    // encode into products string (flatten list)
    "products" -> { for ((productId, item) <- cart.items)
      yield "" + productId + "-" + item.quantity}.reduceLeftOption(_ + "," + _).getOrElse("")
    )

  def decodeFromCookie(implicit request: RequestHeader): Cart = decodeFromCookie(request.cookies.get(COOKIE_NAME))
}