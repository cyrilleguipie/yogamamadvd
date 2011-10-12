$(function () {

  // initialize
  app = Sammy('#content', function() {
    this.use('Tmpl', 'html');
    this.use('AppAccount');
    this.use('AppCheckout');

    // TODO: use session cookie (expires_in: -1) but fix sammy-cookie-play first, then make sammy support this
    this.store = new Sammy.Store({name: 'yogamamadvd', element: this.$element(), type: 'session'});
    
    this.bind('location-changed', function(context) {
      var url = escape(app.getLocation().split('?')[0]);
      if (app.connected()) {
          $('#welcome').html(i18n('text_logged', '#/', app.connected().firstname, '#/account/logout?_url=' + url));
      } else {
          $('#welcome').html(i18n('text_welcome', '#/account/account?_url=' + url, '#/account/register?_url=' + url));
      }
    });

    this.get('#/', function(context) {
      context.partial('catalog/view/theme/yogamamadvd/templates/main.html');
    });
    
  });

  // run app, when i18n loaded
  i18nLoaded.then(function() {
    app.run('#/');
  })

});

