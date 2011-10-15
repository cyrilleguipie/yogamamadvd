<?php echo $header; ?>
<div id="nav">
  <ul>
    <li class="active"><a href="#/checkout/shipment">Выбор способа доставки</a></li>

    <li class="disabled">Выбор способа оплаты</li>

    <li class="disabled">Выбор курса</li>

    <li class="disabled">Заказ</li>
  </ul>
</div>

<h2>Способ доставки</h2>

<p>Курс можно заказать следующими способами доставки:</p>
<div id="accordion">
  <h3><a name="download">Скачать курс с нашего сервера</strong>.</a></h3>
  <div class="checkout-content">
    <img align="left" style="margin-right:15px;" src="catalog/view/theme/yogamamadvd/image/download.jpg">
    <p>Если вы выберете этот способ доставки, то сможете начать занятия по курсу гораздо быстрее.
      Как только оплата поступит на наш счет, вы получите ссылки на скачивание курса с нашего сервера. </p>
    <p>В этом способе вы экономите на доставке и времени, но с другой стороны у вас не будет физической копии курса.
      Также имейте в виду, что этот вариант подходит для тех, у кого быстрый и безлимитный доступ к Интернету. </p>
    {{if !app.connected()}}
      <div class="left" id="download-register">
      </div>
      <div class="right" id="download-login">
      </div>
    {{else}}
      <form action="#/checkout/download" method="post" enctype="multipart/form-data" id="download"></form>
      <div class="buttons">
        <a onclick="$('#download').submit();" class="button"><span>${i18n('button_continue')}</span></a>
      </div>
    {{/if}}
  </div>
  <h3><a href="#ship" name="ship">DVD-диск с доставкой по почте в любую точку мира.</a></h3>
  <div class="checkout-content">
    <img align="left" style="margin-right:15px;" src="catalog/view/theme/yogamamadvd/image/PostBox.jpg">
    <p>Достоинство этого способа доставки в том, что вам придет лицензионный диск в красивой коробке
      и со всей полиграфией (обложка, графика диска).</p>
    <p>Обратная сторона медали: посылку придется подождать 4-12 дней, в зависимости от места вашего
      проживания и заплатить за доставку, что немного увеличит итоговую цену. </p>
    {{if !app.connected()}}
      <div class="left" id="shipment-register">
      </div>
      <div class="right" id="shipment-login">
      </div>
    {{else}}
      <form action="#/checkout/ship" method="post" enctype="multipart/form-data" id="ship"></form>
      <div class="buttons">
        <a onclick="$('#ship').submit();" class="button"><span>${i18n('button_continue')}</span></a>
      </div>
    {{/if}}
  </div>
</div>
<br/><br/><br/>
<script type='text/javascript'>
  $("#accordion").accordion({autoHeight:false, navigation:true, navigationFilter: function() {
    return this.name == '${app.cart("shipment")}';
  } });
</script>
<?php echo $footer; ?>
