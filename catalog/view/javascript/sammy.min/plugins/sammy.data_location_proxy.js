// -- Sammy.js -- /plugins/sammy.data_location_proxy.js
// http://sammyjs.org
// Version: 0.7.0
// Built: 2011-07-30 16:55:39 -0700
(function(a){Sammy=Sammy||{};Sammy.DataLocationProxy=function(d,c,b){this.app=d;this.data_name=c||"sammy-location";this.href_attribute=b};Sammy.DataLocationProxy.prototype={bind:function(){var b=this;this.app.$element().bind("setData",function(f,c,d){if(c==b.data_name){b.app.$element().each(function(){a.data(this,b.data_name,d)});b.app.trigger("location-changed")}});if(this.href_attribute){this.app.$element().delegate("["+this.href_attribute+"]","click",function(c){c.preventDefault();b.setLocation(a(this).attr(b.href_attribute))})}},unbind:function(){if(this.href_attribute){this.app.$element().undelegate("["+this.href_attribute+"]","click")}this.app.$element().unbind("setData")},getLocation:function(){return this.app.$element().data(this.data_name)||""},setLocation:function(b){return this.app.$element().data(this.data_name,b)}}})(jQuery);
