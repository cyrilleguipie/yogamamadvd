// -- Sammy.js -- /plugins/sammy.flash.js
// http://sammyjs.org
// Version: 0.7.0
// Built: 2011-07-30 16:55:41 -0700
(function(a){Sammy=Sammy||{};Sammy.FlashHash=function(){this.now={}};Sammy.FlashHash.prototype={toHTML:function(){var b=this._renderUL();this.clear();return b},clear:function(){this._clearHash(this);this._clearHash(this.now)},_onRedirect:function(){this._clearHash(this.now)},_clearHash:function(c){var b;for(b in c){if(b!=="now"&&c.hasOwnProperty(b)){delete c[b]}}},_renderUL:function(){return'<ul class="flash">'+this._renderLIs(this)+this._renderLIs(this.now)+"</ul>"},_renderLIs:function(d){var b="",c;for(c in d){if(d[c]&&c!=="now"&&d.hasOwnProperty(c)){b=b+'<li class="'+c+'">'+d[c]+"</li>"}}Sammy.log("rendered flash: "+b);return b}};Sammy.Flash=function(b){b.flash=new Sammy.FlashHash();b.helper("flash",function(c,d){if(arguments.length===0){return this.app.flash}else{if(arguments.length===2){this.app.flash[c]=d}}return this.app.flash[c]});b.helper("flashNow",function(c,d){if(arguments.length===0){return this.app.flash.now}else{if(arguments.length===2){this.app.flash.now[c]=d}}return this.app.flash.now[c]});b.bind("redirect",function(){this.app.flash._onRedirect()})}})(jQuery);