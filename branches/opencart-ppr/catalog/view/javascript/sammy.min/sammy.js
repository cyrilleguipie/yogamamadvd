// -- Sammy.js -- /sammy.js
// http://sammyjs.org
// Version: 0.7.0
// Built: 2011-07-30 16:55:53 -0700
(function(h,j){var p,g="([^/]+)",k=/:([\w\d]+)/g,l=/\?([^#]*)$/,c=function(q){return Array.prototype.slice.call(q)},d=function(q){return Object.prototype.toString.call(q)==="[object Function]"},m=function(q){return Object.prototype.toString.call(q)==="[object Array]"},i=function(q){return decodeURIComponent((q||"").replace(/\+/g," "))},b=encodeURIComponent,f=function(q){return String(q).replace(/&(?!\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},n=function(q){return function(r,s){return this.route.apply(this,[q,r,s])}},a={},o=!!(j.history&&history.pushState),e=[];p=function(){var r=c(arguments),s,q;p.apps=p.apps||{};if(r.length===0||r[0]&&d(r[0])){return p.apply(p,["body"].concat(r))}else{if(typeof(q=r.shift())=="string"){s=p.apps[q]||new p.Application();s.element_selector=q;if(r.length>0){h.each(r,function(t,u){s.use(u)})}if(s.element_selector!=q){delete p.apps[q]}p.apps[s.element_selector]=s;return s}}};p.VERSION="0.7.0";p.addLogger=function(q){e.push(q)};p.log=function(){var q=c(arguments);q.unshift("["+Date()+"]");h.each(e,function(s,r){r.apply(p,q)})};if(typeof j.console!="undefined"){if(d(j.console.log.apply)){p.addLogger(function(){j.console.log.apply(j.console,arguments)})}else{p.addLogger(function(){j.console.log(arguments)})}}else{if(typeof console!="undefined"){p.addLogger(function(){console.log.apply(console,arguments)})}}h.extend(p,{makeArray:c,isFunction:d,isArray:m});p.Object=function(q){return h.extend(this,q||{})};h.extend(p.Object.prototype,{escapeHTML:f,h:f,toHash:function(){var q={};h.each(this,function(s,r){if(!d(r)){q[s]=r}});return q},toHTML:function(){var q="";h.each(this,function(s,r){if(!d(r)){q+="<strong>"+s+"</strong> "+r+"<br />"}});return q},keys:function(q){var r=[];for(var s in this){if(!d(this[s])||!q){r.push(s)}}return r},has:function(q){return this[q]&&h.trim(this[q].toString())!==""},join:function(){var r=c(arguments);var q=r.shift();return r.join(q)},log:function(){p.log.apply(p,arguments)},toString:function(q){var r=[];h.each(this,function(t,s){if(!d(s)||q){r.push('"'+t+'": '+s.toString())}});return"Sammy.Object: {"+r.join(",")+"}"}});p.DefaultLocationProxy=function(r,q){this.app=r;this.is_native=false;this.has_history=o;this._startPolling(q)};p.DefaultLocationProxy.fullPath=function(q){var r=q.toString().match(/^[^#]*(#.+)$/);var s=r?r[1]:"";return[q.pathname,q.search,s].join("")};p.DefaultLocationProxy.prototype={bind:function(){var r=this,s=this.app,q=p.DefaultLocationProxy;h(j).bind("hashchange."+this.app.eventNamespace(),function(u,t){if(r.is_native===false&&!t){r.is_native=true;j.clearInterval(q._interval)}s.trigger("location-changed")});if(o&&!s.disable_push_state){h(j).bind("popstate."+this.app.eventNamespace(),function(t){s.trigger("location-changed")});h("a").live("click.history-"+this.app.eventNamespace(),function(u){var t=q.fullPath(this);if(this.hostname==j.location.hostname&&s.lookupRoute("get",t)){u.preventDefault();r.setLocation(t);return false}})}if(!q._bindings){q._bindings=0}q._bindings++},unbind:function(){h(j).unbind("hashchange."+this.app.eventNamespace());h(j).unbind("popstate."+this.app.eventNamespace());h("a").die("click.history-"+this.app.eventNamespace());p.DefaultLocationProxy._bindings--;if(p.DefaultLocationProxy._bindings<=0){j.clearInterval(p.DefaultLocationProxy._interval)}},getLocation:function(){return p.DefaultLocationProxy.fullPath(j.location)},setLocation:function(q){if(/^([^#\/]|$)/.test(q)){if(o){q="/"+q}else{q="#!/"+q}}if(q!=this.getLocation()){if(o&&/^\//.test(q)){history.pushState({path:q},j.title,q);this.app.trigger("location-changed")}else{return(j.location=q)}}},_startPolling:function(s){var r=this;if(!p.DefaultLocationProxy._interval){if(!s){s=10}var q=function(){var t=r.getLocation();if(typeof p.DefaultLocationProxy._last_location=="undefined"||t!=p.DefaultLocationProxy._last_location){j.setTimeout(function(){h(j).trigger("hashchange",[true])},0)}p.DefaultLocationProxy._last_location=t};q();p.DefaultLocationProxy._interval=j.setInterval(q,s)}}};p.Application=function(q){var r=this;this.routes={};this.listeners=new p.Object({});this.arounds=[];this.befores=[];this.namespace=(new Date()).getTime()+"-"+parseInt(Math.random()*1000,10);this.context_prototype=function(){p.EventContext.apply(this,arguments)};this.context_prototype.prototype=new p.EventContext();if(d(q)){q.apply(this,[this])}if(!this._location_proxy){this.setLocationProxy(new p.DefaultLocationProxy(this,this.run_interval_every))}if(this.debug){this.bindToAllEvents(function(t,s){r.log(r.toString(),t.cleaned_type,s||{})})}};p.Application.prototype=h.extend({},p.Object.prototype,{ROUTE_VERBS:["get","post","put","delete"],APP_EVENTS:["run","unload","lookup-route","run-route","route-found","event-context-before","event-context-after","changed","error","check-form-submission","redirect","location-changed"],_last_route:null,_location_proxy:null,_running:false,element_selector:"body",debug:false,raise_errors:false,run_interval_every:50,disable_push_state:false,template_engine:null,toString:function(){return"Sammy.Application:"+this.element_selector},$element:function(q){return q?h(this.element_selector).find(q):h(this.element_selector)},use:function(){var q=c(arguments),s=q.shift(),r=s||"";try{q.unshift(this);if(typeof s=="string"){r="Sammy."+s;s=p[s]}s.apply(this,q)}catch(t){if(typeof s==="undefined"){this.error("Plugin Error: called use() but plugin ("+r.toString()+") is not defined",t)}else{if(!d(s)){this.error("Plugin Error: called use() but '"+r.toString()+"' is not a function",t)}else{this.error("Plugin Error",t)}}}return this},setLocationProxy:function(q){var r=this._location_proxy;this._location_proxy=q;if(this.isRunning()){if(r){r.unbind()}this._location_proxy.bind()}},route:function(u,r,w){var t=this,v=[],q,s;if(!w&&d(r)){r=u;w=r;u="any"}u=u.toLowerCase();if(r.constructor==String){k.lastIndex=0;while((s=k.exec(r))!==null){v.push(s[1])}r=new RegExp(r.replace(k,g)+"$")}if(typeof w=="string"){w=t[w]}q=function(x){var y={verb:x,path:r,callback:w,param_names:v};t.routes[x]=t.routes[x]||[];t.routes[x].push(y)};if(u==="any"){h.each(this.ROUTE_VERBS,function(y,x){q(x)})}else{q(u)}return this},get:n("get"),post:n("post"),put:n("put"),del:n("delete"),any:n("any"),mapRoutes:function(r){var q=this;h.each(r,function(s,t){q.route.apply(q,t)});return this},eventNamespace:function(){return["sammy-app",this.namespace].join("-")},bind:function(q,s,u){var t=this;if(typeof u=="undefined"){u=s}var r=function(){var x,v,w;x=arguments[0];w=arguments[1];if(w&&w.context){v=w.context;delete w.context}else{v=new t.context_prototype(t,"bind",x.type,w,x.target)}x.cleaned_type=x.type.replace(t.eventNamespace(),"");u.apply(v,[x,w])};if(!this.listeners[q]){this.listeners[q]=[]}this.listeners[q].push(r);if(this.isRunning()){this._listen(q,r)}return this},trigger:function(q,r){this.$element().trigger([q,this.eventNamespace()].join("."),[r]);return this},refresh:function(){this.last_location=null;this.trigger("location-changed");return this},before:function(q,r){if(d(q)){r=q;q={}}this.befores.push([q,r]);return this},after:function(q){return this.bind("event-context-after",q)},around:function(q){this.arounds.push(q);return this},isRunning:function(){return this._running},helpers:function(q){h.extend(this.context_prototype.prototype,q);return this},helper:function(q,r){this.context_prototype.prototype[q]=r;return this},run:function(q){if(this.isRunning()){return false}var r=this;h.each(this.listeners.toHash(),function(s,t){h.each(t,function(v,u){r._listen(s,u)})});this.trigger("run",{start_url:q});this._running=true;this.last_location=null;if(!(/\#(.+)/.test(this.getLocation()))&&typeof q!="undefined"){this.setLocation(q)}this._checkLocation();this._location_proxy.bind();this.bind("location-changed",function(){r._checkLocation()});this.bind("submit",function(t){var s=r._checkFormSubmission(h(t.target).closest("form"));return(s===false)?t.preventDefault():false});h(j).bind("beforeunload",function(){r.unload()});return this.trigger("changed")},unload:function(){if(!this.isRunning()){return false}var q=this;this.trigger("unload");this._location_proxy.unbind();this.$element().unbind("submit").removeClass(q.eventNamespace());h.each(this.listeners.toHash(),function(r,s){h.each(s,function(u,t){q._unlisten(r,t)})});this._running=false;return this},bindToAllEvents:function(r){var q=this;h.each(this.APP_EVENTS,function(s,t){q.bind(t,r)});h.each(this.listeners.keys(true),function(t,s){if(h.inArray(s,q.APP_EVENTS)==-1){q.bind(s,r)}});return this},routablePath:function(q){return q.replace(l,"")},lookupRoute:function(w,u){var v=this,t=false,s=0,q,r;if(typeof this.routes[w]!="undefined"){q=this.routes[w].length;for(;s<q;s++){r=this.routes[w][s];if(v.routablePath(u).match(r.path)){t=r;break}}}return t},runRoute:function(s,F,u,x){var t=this,D=this.lookupRoute(s,F),r,A,v,z,E,B,y,C,q;this.log("runRoute",[s,F].join(" "));this.trigger("run-route",{verb:s,path:F,params:u});if(typeof u=="undefined"){u={}}h.extend(u,this._parseQueryString(F));if(D){this.trigger("route-found",{route:D});if((C=D.path.exec(this.routablePath(F)))!==null){C.shift();h.each(C,function(G,H){if(D.param_names[G]){u[D.param_names[G]]=i(H)}else{if(!u.splat){u.splat=[]}u.splat.push(i(H))}})}r=new this.context_prototype(this,s,F,u,x);v=this.arounds.slice(0);E=this.befores.slice(0);y=[r].concat(u.splat);A=function(){var G;while(E.length>0){B=E.shift();if(t.contextMatchesOptions(r,B[0])){G=B[1].apply(r,[r]);if(G===false){return false}}}t.last_route=D;r.trigger("event-context-before",{context:r});G=D.callback.apply(r,y);r.trigger("event-context-after",{context:r});return G};h.each(v.reverse(),function(G,H){var I=A;A=function(){return H.apply(r,[I])}});try{q=A()}catch(w){this.error(["500 Error",s,F].join(" "),w)}return q}else{return this.notFound(s,F)}},contextMatchesOptions:function(t,v,r){var s=v;if(typeof s==="undefined"||s=={}){return true}if(typeof r==="undefined"){r=true}if(typeof s==="string"||d(s.test)){s={path:s}}if(s.only){return this.contextMatchesOptions(t,s.only,true)}else{if(s.except){return this.contextMatchesOptions(t,s.except,false)}}var q=true,u=true;if(s.path){if(!d(s.path.test)){s.path=new RegExp(s.path.toString()+"$")}q=s.path.test(t.path)}if(s.verb){if(typeof s.verb==="string"){u=s.verb===t.verb}else{u=s.verb.indexOf(t.verb)>-1}}return r?(u&&q):!(u&&q)},getLocation:function(){return this._location_proxy.getLocation()},setLocation:function(q){return this._location_proxy.setLocation(q)},swap:function(q){return this.$element().html(q)},templateCache:function(q,r){if(typeof r!="undefined"){return a[q]=r}else{return a[q]}},clearTemplateCache:function(){return a={}},notFound:function(s,r){var q=this.error(["404 Not Found",s,r].join(" "));return(s==="get")?q:true},error:function(r,q){if(!q){q=new Error()}q.message=[r,q.message].join(" ");this.trigger("error",{message:q.message,error:q});if(this.raise_errors){throw (q)}else{this.log(q.message,q)}},_checkLocation:function(){var q,r;q=this.getLocation();if(!this.last_location||this.last_location[0]!="get"||this.last_location[1]!=q){this.last_location=["get",q];r=this.runRoute("get",q)}return r},_getFormVerb:function(s){var r=h(s),t,q;q=r.find('input[name="_method"]');if(q.length>0){t=q.val()}if(!t){t=r[0].getAttribute("method")}if(!t||t==""){t="get"}return h.trim(t.toString().toLowerCase())},_checkFormSubmission:function(s){var q,t,v,u,r;this.trigger("check-form-submission",{form:s});q=h(s);t=q.attr("action")||"";v=this._getFormVerb(q);this.log("_checkFormSubmission",q,t,v);if(v==="get"){this.setLocation(t+"?"+this._serializeFormParams(q));r=false}else{u=h.extend({},this._parseFormParams(q));r=this.runRoute(v,t,u,s.get(0))}return(typeof r=="undefined")?false:r},_serializeFormParams:function(r){var t="",q=r.serializeArray(),s;if(q.length>0){t=this._encodeFormPair(q[0].name,q[0].value);for(s=1;s<q.length;s++){t=t+"&"+this._encodeFormPair(q[s].name,q[s].value)}}return t},_encodeFormPair:function(q,r){return b(q)+"="+b(r)},_parseFormParams:function(q){var t={},s=q.serializeArray(),r;for(r=0;r<s.length;r++){t=this._parseParamPair(t,s[r].name,s[r].value)}return t},_parseQueryString:function(t){var v={},s,r,u,q;s=t.match(l);if(s){r=s[1].split("&");for(q=0;q<r.length;q++){u=r[q].split("=");v=this._parseParamPair(v,i(u[0]),i(u[1]||""))}}return v},_parseParamPair:function(s,q,r){if(s[q]){if(m(s[q])){s[q].push(r)}else{s[q]=[s[q],r]}}else{s[q]=r}return s},_listen:function(q,r){return this.$element().bind([q,this.eventNamespace()].join("."),r)},_unlisten:function(q,r){return this.$element().unbind([q,this.eventNamespace()].join("."),r)}});p.RenderContext=function(q){this.event_context=q;this.callbacks=[];this.previous_content=null;this.content=null;this.next_engine=false;this.waiting=false};p.RenderContext.prototype=h.extend({},p.Object.prototype,{then:function(s){if(!d(s)){if(typeof s==="string"&&s in this.event_context){var r=this.event_context[s];s=function(t){return r.apply(this.event_context,[t])}}else{return this}}var q=this;if(this.waiting){this.callbacks.push(s)}else{this.wait();j.setTimeout(function(){var t=s.apply(q,[q.content,q.previous_content]);if(t!==false){q.next(t)}},0)}return this},wait:function(){this.waiting=true},next:function(q){this.waiting=false;if(typeof q!=="undefined"){this.previous_content=this.content;this.content=q}if(this.callbacks.length>0){this.then(this.callbacks.shift())}},load:function(q,r,t){var s=this;return this.then(function(){var u,v,x,w;if(d(r)){t=r;r={}}else{r=h.extend({},r)}if(t){this.then(t)}if(typeof q==="string"){x=(q.match(/\.json$/)||r.json);u=((x&&r.cache===true)||r.cache!==false);s.next_engine=s.event_context.engineFor(q);delete r.cache;delete r.json;if(r.engine){s.next_engine=r.engine;delete r.engine}if(u&&(v=this.event_context.app.templateCache(q))){return v}this.wait();h.ajax(h.extend({url:q,data:{},dataType:x?"json":null,type:"get",success:function(y){if(u){s.event_context.app.templateCache(q,y)}s.next(y)}},r));return false}else{if(q.nodeType){return q.innerHTML}if(q.selector){s.next_engine=q.attr("data-engine");if(r.clone===false){return q.remove()[0].innerHTML.toString()}else{return q[0].innerHTML.toString()}}}})},loadPartials:function(q){if(q){this.partials=this.partials||{};for(name in q){this.load(q[name]).then(function(r){this.partials[name]=r})}}return this},render:function(q,s,t,r){if(d(q)&&!s){return this.then(q)}else{return this.loadPartials(r).load(q).interpolate(s,q).then(t)}},partial:function(q,r){return this.render(q,r).swap()},send:function(){var s=this,r=c(arguments),q=r.shift();if(m(r[0])){r=r[0]}return this.then(function(t){r.push(function(u){s.next(u)});s.wait();q.apply(q,r);return false})},collect:function(u,t,q){var s=this;var r=function(){if(d(u)){t=u;u=this.content}var v=[],w=false;h.each(u,function(x,z){var y=t.apply(s,[x,z]);if(y.jquery&&y.length==1){y=y[0];w=true}v.push(y);return y});return w?v:v.join("")};return q?r():this.then(r)},renderEach:function(q,r,s,t){if(m(r)){t=s;s=r;r=null}return this.load(q).then(function(v){var u=this;if(!s){s=m(this.previous_content)?this.previous_content:[]}if(t){h.each(s,function(w,y){var z={},x=this.next_engine||q;r?(z[r]=y):(z=y);t(y,u.event_context.interpolate(v,z,x))})}else{return this.collect(s,function(w,y){var z={},x=this.next_engine||q;r?(z[r]=y):(z=y);return this.event_context.interpolate(v,z,x)},true)}})},interpolate:function(t,s,q){var r=this;return this.then(function(v,u){if(!t&&u){t=u}if(this.next_engine){s=this.next_engine;this.next_engine=false}var w=r.event_context.interpolate(v,t,s,this.partials);return q?u+w:w})},swap:function(){return this.then(function(q){this.event_context.swap(q)}).trigger("changed",{})},appendTo:function(q){return this.then(function(r){h(q).append(r)}).trigger("changed",{})},prependTo:function(q){return this.then(function(r){h(q).prepend(r)}).trigger("changed",{})},replace:function(q){return this.then(function(r){h(q).html(r)}).trigger("changed",{})},trigger:function(q,r){return this.then(function(s){if(typeof r=="undefined"){r={content:s}}this.event_context.trigger(q,r)})}});p.EventContext=function(u,t,r,s,q){this.app=u;this.verb=t;this.path=r;this.params=new p.Object(s);this.target=q};p.EventContext.prototype=h.extend({},p.Object.prototype,{$element:function(){return this.app.$element(c(arguments).shift())},engineFor:function(s){var r=this,q;if(d(s)){return s}s=(s||r.app.template_engine).toString();if((q=s.match(/\.([^\.\?\#]+)$/))){s=q[1]}if(s&&d(r[s])){return r[s]}if(r.app.template_engine){return this.engineFor(r.app.template_engine)}return function(t,u){return t}},interpolate:function(s,t,r,q){return this.engineFor(r).apply(this,[s,t,q])},render:function(q,s,t,r){return new p.RenderContext(this).render(q,s,t,r)},renderEach:function(q,r,s,t){return new p.RenderContext(this).renderEach(q,r,s,t)},load:function(q,r,s){return new p.RenderContext(this).load(q,r,s)},partial:function(q,r){return new p.RenderContext(this).partial(q,r)},send:function(){var q=new p.RenderContext(this);return q.send.apply(q,arguments)},redirect:function(){var y,w=c(arguments),v=this.app.getLocation(),r=w.length;if(r>1){var u=0,z=[],q=[],t={},x=false;for(;u<r;u++){if(typeof w[u]=="string"){z.push(w[u])}else{h.extend(t,w[u]);x=true}}y=z.join("/");if(x){for(var s in t){q.push(this.app._encodeFormPair(s,t[s]))}y+="?"+q.join("&")}}else{y=w[0]}this.trigger("redirect",{to:y});this.app.last_location=[this.verb,this.path];this.app.setLocation(y);if(new RegExp(y).test(v)){this.app.trigger("location-changed")}},trigger:function(q,r){if(typeof r=="undefined"){r={}}if(!r.context){r.context=this}return this.app.trigger(q,r)},eventNamespace:function(){return this.app.eventNamespace()},swap:function(q){return this.app.swap(q)},notFound:function(){return this.app.notFound(this.verb,this.path)},json:function(q){return h.parseJSON(q)},toString:function(){return"Sammy.EventContext: "+[this.verb,this.path,this.params].join(" ")}});h.sammy=j.Sammy=p})(jQuery,window);
