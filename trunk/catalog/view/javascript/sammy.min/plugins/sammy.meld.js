// -- Sammy.js -- /plugins/sammy.meld.js
// http://sammyjs.org
// Version: 0.7.0
// Built: 2011-07-30 16:55:46 -0700
(function(a){Sammy=Sammy||{};Sammy.Meld=function(d,c){var e={selector:function(f){return"."+f},remove_false:true};var b=function(h,i,g){var f=a(h);g=a.extend(e,g||{});if(typeof i==="string"){f.html(i)}else{a.each(i,function(s,q){var k=g.selector(s),p=f.filter(k),t,r,m=false,n=f.index(p);if(p.length===0){p=f.find(k)}if(p.length>0){if(a.isArray(q)){t=a("<div/>");if(p.is("ol, ul")){m=true;r=p.children("li:first");if(r.length==0){r=a("<li/>")}}else{if(p.children().length==1){m=true;r=p.children(":first").clone()}else{r=p.clone()}}for(var l=0;l<q.length;l++){t.append(b(r.clone(),q[l],g))}if(m){p.html(t.html())}else{if(p[0]==f[0]){f=a(t.html())}else{if(n>=0){var o=[n,1];o=o.concat(t.children().get());f.splice.apply(f,o)}}}}else{if(g.remove_false&&q===false){f.splice(n,1)}else{if(typeof q==="object"){if(p.is(":empty")){p.attr(q,true)}else{p.html(b(p.html(),q,g))}}else{p.html(q.toString())}}}}else{f.attr(s,q,true)}})}var j=f;return j};if(!c){c="meld"}d.helper(c,b)}})(jQuery);