import play.api._

import models._
import anorm._

object Global extends GlobalSettings {
  
  override def onStart(app: Application) {
    InitialData.insert()
  }
  
}

/**
* Initial set of data to be imported
* in the sample application.
*/
object InitialData {
  
  def date(str: String) = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(str)
  
  def insert() = {
    
    if(User.findAll.isEmpty) {
      
      Seq(
        User("Admin", "", "admin@example.com", null, "password"),
        User("Test", "User", "test@example.com", null, "password")
      ).foreach(User.create)
    }
      
    if(Address.findAll.isEmpty) {
      
      Seq(
        Address(NotAssigned, "admin@example.com", "", "Vinohradska", "", "Praha", "12000", "Vinohrady", "Czech Republic", "CZ")
      ).foreach(Address.create)
    }

    if(Gateway.findAll.isEmpty) {
      Seq(
        Gateway("post", "ondelivery"),
        Gateway("yandex", "internet"),
        Gateway("rbk", "visa_mastercard"),
        Gateway("webmoney", "internet"),
        Gateway("liqpay", "internet"),
        Gateway("qiwi", "normal"),
        Gateway("robokassa", "visa_mastercard"),
        Gateway("transfer", "normal"),
        Gateway("paypal", "internet, visa_mastercard"),
        Gateway("bank", "normal")
      ).foreach(Gateway.create)
    }
    
    if(Product.findAll.isEmpty) {
      Seq(
        Product(Id(1), "Йога 1", "yoga1-100x100.png", """
            <p>Асаны (или иначе упражнения), которые мы выполняем в первом триместре беременности,
            помогают будущим мамам справиться с тошнотой, изжогой,
            улучшить работу кишечника и, в результате, избежать недомоганий и токсикоза (либо облегчить его течение),
            нормализовать работу эндокринной системы, создать пространство между ребрами и тазовыми костями для развития плода,
            сохранить мышцы в тонусе.</p><p>Практики на расслабление помогают избавиться от неуверенности,
            мнительности и страха, преследующего многих беременных женщин, и стабилизировать работу нервной системы.</p>
            <p>Позитивные аффирмации настраивают на светлое протекание беременности, помогают «видеть» будущего малыша
            здоровым и счастливым.</p>""", 1),
        Product(Id(2), "Йога 2", "yoga2-100x100.png", """
            <p>Асаны (или иначе упражнения), которые мы выполняем во втором триместре беременности,
            помогают будущим мамам разгрузить почки, снять отечность ног, растянуть мышцы промежности,
            улучшить кровообращение в области малого таза и всего организма,
            сохранить мышцы в тонусе.</p><p>Дыхательные упражнения помогают увеличить внутреннее пространство в грудной клетке
            и в области живота, чтобы малышу было куда расти, насытить организм мамы и малыша кислородом,
            направлять осознанное дыхание в область живота и в родовые пути.</p>
            <p>Практики на расслабление помогают избавиться от неуверенности, мнительности и страха,
            преследующего многих беременных женщин, и стабилизировать работу нервной системы.</p>""", 1),
        Product(Id(3), "Йога 3", "yoga3-100x100.png", """
            <p>Асаны (или иначе упражнения), которые мы выполняем в третьем триместре беременности,
            помогают будущим мамам разгрузить почки и предотвратить чрезмерное отекание ног,
            улучшить работу кишечника, уменьшить нагрузку на сердце, уменьшить боли в пояснице,
            подготовить мышцы и связки тазовой области к предстоящим родам.</p><p>Дыхательные техники,
            осваиваемые будущими мамами, помогают избежать боли при родах, насытить организм мамы и малыша кислородом.</p>
            <p>Практики на расслабление помогают избавиться от неуверенности, мнительности и страха, преследующего многих
            беременных женщин, и научиться правильно расслабляться, что необходимо для успешного протекания родов.</p>""", 1)
            
      ).foreach(Product.create)
    }
  }
  
}