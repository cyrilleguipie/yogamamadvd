// -- Sammy.js -- /plugins/sammy.form.js
// http://sammyjs.org
// Version: 0.7.0
// Built: 2011-07-30 16:55:42 -0700
(function(b){Sammy=Sammy||{};function a(d,e){if(typeof e==="undefined"){return""}else{if(b.isFunction(e)){e=e.apply(d)}}return e.toString()}function c(d,e,g){var f="<";f+=d;if(typeof e!="undefined"){b.each(e,function(h,i){if(i!=null){f+=" "+h+"='";f+=a(e,i).replace(/\'/g,"'");f+="'"}})}if(g===false){f+=">"}else{if(typeof g!="undefined"){f+=">";f+=a(this,g);f+="</"+d+">"}else{f+=" />"}}return f}Sammy.FormBuilder=function(e,d){this.name=e;this.object=d};b.extend(Sammy.FormBuilder.prototype,{open:function(d){return c("form",b.extend({method:"post",action:"#/"+this.name+"s"},d),false)},close:function(){return"</form>"},label:function(e,g,d){var f={"for":this._attributesForKeyPath(e).name};return c("label",b.extend(f,d),g)},hidden:function(e,d){d=b.extend({type:"hidden"},this._attributesForKeyPath(e),d);return c("input",d)},text:function(e,d){d=b.extend({type:"text"},this._attributesForKeyPath(e),d);return c("input",d)},textarea:function(e,d){var f;d=b.extend(this._attributesForKeyPath(e),d);f=d.value;delete d.value;return c("textarea",d,f)},password:function(e,d){return this.text(e,b.extend({type:"password"},d))},select:function(e,f,d){var h="",g;d=b.extend(this._attributesForKeyPath(e),d);g=d.value;delete d.value;b.each(f,function(j,k){var l,n,m;if(b.isArray(k)){l=k[1],n=k[0]}else{l=k,n=k}m={value:a(this.object,l)};if(l===g){m.selected="selected"}h+=c("option",m,n)});return c("select",d,h)},radio:function(e,g,d){var f;d=b.extend(this._attributesForKeyPath(e),d);f=d.value;d.value=a(this.object,g);if(f==d.value){d.checked="checked"}return c("input",b.extend({type:"radio"},d))},checkbox:function(e,g,d){var f="";if(!d){d={}}if(d.hidden_element!==false){f+=this.hidden(e,{value:!g})}delete d.hidden_element;f+=this.radio(e,g,b.extend({type:"checkbox"},d));return f},submit:function(d){return c("input",b.extend({type:"submit"},d))},_attributesForKeyPath:function(e){var d=this,g=b.isArray(e)?e:e.split(/\./),f=d.name,i=d.object,h=d.name;b.each(g,function(k,j){if((typeof i==="undefined")||i==""){i=""}else{if(typeof j=="number"||j.match(/^\d+$/)){i=i[parseInt(j,10)]}else{i=i[j]}}f+="["+j+"]";h+="-"+j});return{name:f,value:a(d.object,i),"class":h}}});Sammy.Form=function(d){d.helpers({simple_element:c,formFor:function(g,f,h){var e;if(b.isFunction(f)){h=f;f=this[g]}e=new Sammy.FormBuilder(g,f),h.apply(this,[e]);return e}})}})(jQuery);