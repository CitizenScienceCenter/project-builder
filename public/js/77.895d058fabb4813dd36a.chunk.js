(window.webpackJsonp=window.webpackJsonp||[]).push([[77],{jE9Z:function(t,e,r){"use strict";
/*!
  * vue-router v3.1.3
  * (c) 2019 Evan You
  * @license MIT
  */function n(t){return Object.prototype.toString.call(t).indexOf("Error")>-1}function o(t,e){return e instanceof t||e&&(e.name===t.name||e._name===t._name)}function i(t,e){for(var r in e)t[r]=e[r];return t}var a={name:"RouterView",functional:!0,props:{name:{type:String,default:"default"}},render:function(t,e){var r=e.props,n=e.children,o=e.parent,a=e.data;a.routerView=!0;for(var u=o.$createElement,c=r.name,s=o.$route,p=o._routerViewCache||(o._routerViewCache={}),f=0,h=!1;o&&o._routerRoot!==o;){var l=o.$vnode&&o.$vnode.data;l&&(l.routerView&&f++,l.keepAlive&&o._inactive&&(h=!0)),o=o.$parent}if(a.routerViewDepth=f,h)return u(p[c],a,n);var d=s.matched[f];if(!d)return p[c]=null,u();var v=p[c]=d.components[c];a.registerRouteInstance=function(t,e){var r=d.instances[c];(e&&r!==t||!e&&r===t)&&(d.instances[c]=e)},(a.hook||(a.hook={})).prepatch=function(t,e){d.instances[c]=e.componentInstance},a.hook.init=function(t){t.data.keepAlive&&t.componentInstance&&t.componentInstance!==d.instances[c]&&(d.instances[c]=t.componentInstance)};var y=a.props=function(t,e){switch(typeof e){case"undefined":return;case"object":return e;case"function":return e(t);case"boolean":return e?t.params:void 0;default:0}}(s,d.props&&d.props[c]);if(y){y=a.props=i({},y);var m=a.attrs=a.attrs||{};for(var g in y)v.props&&g in v.props||(m[g]=y[g],delete y[g])}return u(v,a,n)}};var u=/[!'()*]/g,c=function(t){return"%"+t.charCodeAt(0).toString(16)},s=/%2C/g,p=function(t){return encodeURIComponent(t).replace(u,c).replace(s,",")},f=decodeURIComponent;function h(t){var e={};return(t=t.trim().replace(/^(\?|#|&)/,""))?(t.split("&").forEach(function(t){var r=t.replace(/\+/g," ").split("="),n=f(r.shift()),o=r.length>0?f(r.join("=")):null;void 0===e[n]?e[n]=o:Array.isArray(e[n])?e[n].push(o):e[n]=[e[n],o]}),e):e}function l(t){var e=t?Object.keys(t).map(function(e){var r=t[e];if(void 0===r)return"";if(null===r)return p(e);if(Array.isArray(r)){var n=[];return r.forEach(function(t){void 0!==t&&(null===t?n.push(p(e)):n.push(p(e)+"="+p(t)))}),n.join("&")}return p(e)+"="+p(r)}).filter(function(t){return t.length>0}).join("&"):null;return e?"?"+e:""}var d=/\/?$/;function v(t,e,r,n){var o=n&&n.options.stringifyQuery,i=e.query||{};try{i=y(i)}catch(t){}var a={name:e.name||t&&t.name,meta:t&&t.meta||{},path:e.path||"/",hash:e.hash||"",query:i,params:e.params||{},fullPath:g(e,o),matched:t?function(t){var e=[];for(;t;)e.unshift(t),t=t.parent;return e}(t):[]};return r&&(a.redirectedFrom=g(r,o)),Object.freeze(a)}function y(t){if(Array.isArray(t))return t.map(y);if(t&&"object"==typeof t){var e={};for(var r in t)e[r]=y(t[r]);return e}return t}var m=v(null,{path:"/"});function g(t,e){var r=t.path,n=t.query;void 0===n&&(n={});var o=t.hash;return void 0===o&&(o=""),(r||"/")+(e||l)(n)+o}function w(t,e){return e===m?t===e:!!e&&(t.path&&e.path?t.path.replace(d,"")===e.path.replace(d,"")&&t.hash===e.hash&&b(t.query,e.query):!(!t.name||!e.name)&&(t.name===e.name&&t.hash===e.hash&&b(t.query,e.query)&&b(t.params,e.params)))}function b(t,e){if(void 0===t&&(t={}),void 0===e&&(e={}),!t||!e)return t===e;var r=Object.keys(t),n=Object.keys(e);return r.length===n.length&&r.every(function(r){var n=t[r],o=e[r];return"object"==typeof n&&"object"==typeof o?b(n,o):String(n)===String(o)})}function x(t,e,r){var n=t.charAt(0);if("/"===n)return t;if("?"===n||"#"===n)return e+t;var o=e.split("/");r&&o[o.length-1]||o.pop();for(var i=t.replace(/^\//,"").split("/"),a=0;a<i.length;a++){var u=i[a];".."===u?o.pop():"."!==u&&o.push(u)}return""!==o[0]&&o.unshift(""),o.join("/")}function k(t){return t.replace(/\/\//g,"/")}var R=Array.isArray||function(t){return"[object Array]"==Object.prototype.toString.call(t)},E=B,O=S,_=function(t,e){return P(S(t,e))},A=P,j=M,C=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function S(t,e){for(var r,n=[],o=0,i=0,a="",u=e&&e.delimiter||"/";null!=(r=C.exec(t));){var c=r[0],s=r[1],p=r.index;if(a+=t.slice(i,p),i=p+c.length,s)a+=s[1];else{var f=t[i],h=r[2],l=r[3],d=r[4],v=r[5],y=r[6],m=r[7];a&&(n.push(a),a="");var g=null!=h&&null!=f&&f!==h,w="+"===y||"*"===y,b="?"===y||"*"===y,x=r[2]||u,k=d||v;n.push({name:l||o++,prefix:h||"",delimiter:x,optional:b,repeat:w,partial:g,asterisk:!!m,pattern:k?q(k):m?".*":"[^"+L(x)+"]+?"})}}return i<t.length&&(a+=t.substr(i)),a&&n.push(a),n}function $(t){return encodeURI(t).replace(/[\/?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}function T(t){return encodeURI(t).replace(/[?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}function P(t){for(var e=new Array(t.length),r=0;r<t.length;r++)"object"==typeof t[r]&&(e[r]=new RegExp("^(?:"+t[r].pattern+")$"));return function(r,n){for(var o="",i=r||{},a=(n||{}).pretty?$:encodeURIComponent,u=0;u<t.length;u++){var c=t[u];if("string"!=typeof c){var s,p=i[c.name];if(null==p){if(c.optional){c.partial&&(o+=c.prefix);continue}throw new TypeError('Expected "'+c.name+'" to be defined')}if(R(p)){if(!c.repeat)throw new TypeError('Expected "'+c.name+'" to not repeat, but received `'+JSON.stringify(p)+"`");if(0===p.length){if(c.optional)continue;throw new TypeError('Expected "'+c.name+'" to not be empty')}for(var f=0;f<p.length;f++){if(s=a(p[f]),!e[u].test(s))throw new TypeError('Expected all "'+c.name+'" to match "'+c.pattern+'", but received `'+JSON.stringify(s)+"`");o+=(0===f?c.prefix:c.delimiter)+s}}else{if(s=c.asterisk?T(p):a(p),!e[u].test(s))throw new TypeError('Expected "'+c.name+'" to match "'+c.pattern+'", but received "'+s+'"');o+=c.prefix+s}}else o+=c}return o}}function L(t){return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function q(t){return t.replace(/([=!:$\/()])/g,"\\$1")}function U(t,e){return t.keys=e,t}function I(t){return t.sensitive?"":"i"}function M(t,e,r){R(e)||(r=e||r,e=[]);for(var n=(r=r||{}).strict,o=!1!==r.end,i="",a=0;a<t.length;a++){var u=t[a];if("string"==typeof u)i+=L(u);else{var c=L(u.prefix),s="(?:"+u.pattern+")";e.push(u),u.repeat&&(s+="(?:"+c+s+")*"),i+=s=u.optional?u.partial?c+"("+s+")?":"(?:"+c+"("+s+"))?":c+"("+s+")"}}var p=L(r.delimiter||"/"),f=i.slice(-p.length)===p;return n||(i=(f?i.slice(0,-p.length):i)+"(?:"+p+"(?=$))?"),i+=o?"$":n&&f?"":"(?="+p+"|$)",U(new RegExp("^"+i,I(r)),e)}function B(t,e,r){return R(e)||(r=e||r,e=[]),r=r||{},t instanceof RegExp?function(t,e){var r=t.source.match(/\((?!\?)/g);if(r)for(var n=0;n<r.length;n++)e.push({name:n,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return U(t,e)}(t,e):R(t)?function(t,e,r){for(var n=[],o=0;o<t.length;o++)n.push(B(t[o],e,r).source);return U(new RegExp("(?:"+n.join("|")+")",I(r)),e)}(t,e,r):function(t,e,r){return M(S(t,r),e,r)}(t,e,r)}E.parse=O,E.compile=_,E.tokensToFunction=A,E.tokensToRegExp=j;var V=Object.create(null);function H(t,e,r){e=e||{};try{var n=V[t]||(V[t]=E.compile(t));return e.pathMatch&&(e[0]=e.pathMatch),n(e,{pretty:!0})}catch(t){return""}finally{delete e[0]}}function z(t,e,r,n){var o="string"==typeof t?{path:t}:t;if(o._normalized)return o;if(o.name)return i({},t);if(!o.path&&o.params&&e){(o=i({},o))._normalized=!0;var a=i(i({},e.params),o.params);if(e.name)o.name=e.name,o.params=a;else if(e.matched.length){var u=e.matched[e.matched.length-1].path;o.path=H(u,a,e.path)}else 0;return o}var c=function(t){var e="",r="",n=t.indexOf("#");n>=0&&(e=t.slice(n),t=t.slice(0,n));var o=t.indexOf("?");return o>=0&&(r=t.slice(o+1),t=t.slice(0,o)),{path:t,query:r,hash:e}}(o.path||""),s=e&&e.path||"/",p=c.path?x(c.path,s,r||o.append):s,f=function(t,e,r){void 0===e&&(e={});var n,o=r||h;try{n=o(t||"")}catch(t){n={}}for(var i in e)n[i]=e[i];return n}(c.query,o.query,n&&n.options.parseQuery),l=o.hash||c.hash;return l&&"#"!==l.charAt(0)&&(l="#"+l),{_normalized:!0,path:p,query:f,hash:l}}var D,F=[String,Object],N=[String,Array],J=function(){},K={name:"RouterLink",props:{to:{type:F,required:!0},tag:{type:String,default:"a"},exact:Boolean,append:Boolean,replace:Boolean,activeClass:String,exactActiveClass:String,event:{type:N,default:"click"}},render:function(t){var e=this,r=this.$router,n=this.$route,o=r.resolve(this.to,n,this.append),a=o.location,u=o.route,c=o.href,s={},p=r.options.linkActiveClass,f=r.options.linkExactActiveClass,h=null==p?"router-link-active":p,l=null==f?"router-link-exact-active":f,y=null==this.activeClass?h:this.activeClass,m=null==this.exactActiveClass?l:this.exactActiveClass,g=u.redirectedFrom?v(null,z(u.redirectedFrom),null,r):u;s[m]=w(n,g),s[y]=this.exact?s[m]:function(t,e){return 0===t.path.replace(d,"/").indexOf(e.path.replace(d,"/"))&&(!e.hash||t.hash===e.hash)&&function(t,e){for(var r in e)if(!(r in t))return!1;return!0}(t.query,e.query)}(n,g);var b=function(t){Q(t)&&(e.replace?r.replace(a,J):r.push(a,J))},x={click:Q};Array.isArray(this.event)?this.event.forEach(function(t){x[t]=b}):x[this.event]=b;var k={class:s},R=!this.$scopedSlots.$hasNormal&&this.$scopedSlots.default&&this.$scopedSlots.default({href:c,route:u,navigate:b,isActive:s[y],isExactActive:s[m]});if(R){if(1===R.length)return R[0];if(R.length>1||!R.length)return 0===R.length?t():t("span",{},R)}if("a"===this.tag)k.on=x,k.attrs={href:c};else{var E=function t(e){if(e)for(var r,n=0;n<e.length;n++){if("a"===(r=e[n]).tag)return r;if(r.children&&(r=t(r.children)))return r}}(this.$slots.default);if(E){E.isStatic=!1;var O=E.data=i({},E.data);for(var _ in O.on=O.on||{},O.on){var A=O.on[_];_ in x&&(O.on[_]=Array.isArray(A)?A:[A])}for(var j in x)j in O.on?O.on[j].push(x[j]):O.on[j]=b;(E.data.attrs=i({},E.data.attrs)).href=c}else k.on=x}return t(this.tag,k,this.$slots.default)}};function Q(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey||t.defaultPrevented||void 0!==t.button&&0!==t.button)){if(t.currentTarget&&t.currentTarget.getAttribute){var e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}var X="undefined"!=typeof window;function Y(t,e,r,n){var o=e||[],i=r||Object.create(null),a=n||Object.create(null);t.forEach(function(t){!function t(e,r,n,o,i,a){var u=o.path;var c=o.name;0;var s=o.pathToRegexpOptions||{};var p=function(t,e,r){r||(t=t.replace(/\/$/,""));if("/"===t[0])return t;if(null==e)return t;return k(e.path+"/"+t)}(u,i,s.strict);"boolean"==typeof o.caseSensitive&&(s.sensitive=o.caseSensitive);var f={path:p,regex:function(t,e){var r=E(t,[],e);0;return r}(p,s),components:o.components||{default:o.component},instances:{},name:c,parent:i,matchAs:a,redirect:o.redirect,beforeEnter:o.beforeEnter,meta:o.meta||{},props:null==o.props?{}:o.components?o.props:{default:o.props}};o.children&&o.children.forEach(function(o){var i=a?k(a+"/"+o.path):void 0;t(e,r,n,o,f,i)});r[f.path]||(e.push(f.path),r[f.path]=f);if(void 0!==o.alias)for(var h=Array.isArray(o.alias)?o.alias:[o.alias],l=0;l<h.length;++l){var d=h[l];0;var v={path:d,children:o.children};t(e,r,n,v,i,f.path||"/")}c&&(n[c]||(n[c]=f))}(o,i,a,t)});for(var u=0,c=o.length;u<c;u++)"*"===o[u]&&(o.push(o.splice(u,1)[0]),c--,u--);return{pathList:o,pathMap:i,nameMap:a}}function W(t,e){var r=Y(t),n=r.pathList,o=r.pathMap,i=r.nameMap;function a(t,r,a){var u=z(t,r,!1,e),s=u.name;if(s){var p=i[s];if(!p)return c(null,u);var f=p.regex.keys.filter(function(t){return!t.optional}).map(function(t){return t.name});if("object"!=typeof u.params&&(u.params={}),r&&"object"==typeof r.params)for(var h in r.params)!(h in u.params)&&f.indexOf(h)>-1&&(u.params[h]=r.params[h]);return u.path=H(p.path,u.params),c(p,u,a)}if(u.path){u.params={};for(var l=0;l<n.length;l++){var d=n[l],v=o[d];if(Z(v.regex,u.path,u.params))return c(v,u,a)}}return c(null,u)}function u(t,r){var n=t.redirect,o="function"==typeof n?n(v(t,r,null,e)):n;if("string"==typeof o&&(o={path:o}),!o||"object"!=typeof o)return c(null,r);var u=o,s=u.name,p=u.path,f=r.query,h=r.hash,l=r.params;if(f=u.hasOwnProperty("query")?u.query:f,h=u.hasOwnProperty("hash")?u.hash:h,l=u.hasOwnProperty("params")?u.params:l,s){i[s];return a({_normalized:!0,name:s,query:f,hash:h,params:l},void 0,r)}if(p){var d=function(t,e){return x(t,e.parent?e.parent.path:"/",!0)}(p,t);return a({_normalized:!0,path:H(d,l),query:f,hash:h},void 0,r)}return c(null,r)}function c(t,r,n){return t&&t.redirect?u(t,n||r):t&&t.matchAs?function(t,e,r){var n=a({_normalized:!0,path:H(r,e.params)});if(n){var o=n.matched,i=o[o.length-1];return e.params=n.params,c(i,e)}return c(null,e)}(0,r,t.matchAs):v(t,r,n,e)}return{match:a,addRoutes:function(t){Y(t,n,o,i)}}}function Z(t,e,r){var n=e.match(t);if(!n)return!1;if(!r)return!0;for(var o=1,i=n.length;o<i;++o){var a=t.keys[o-1],u="string"==typeof n[o]?decodeURIComponent(n[o]):n[o];a&&(r[a.name||"pathMatch"]=u)}return!0}var G=X&&window.performance&&window.performance.now?window.performance:Date;function tt(){return G.now().toFixed(3)}var et=tt();function rt(){return et}function nt(t){return et=t}var ot=Object.create(null);function it(){var t=window.location.protocol+"//"+window.location.host,e=window.location.href.replace(t,"");window.history.replaceState({key:rt()},"",e),window.addEventListener("popstate",function(t){ut(),t.state&&t.state.key&&nt(t.state.key)})}function at(t,e,r,n){if(t.app){var o=t.options.scrollBehavior;o&&t.app.$nextTick(function(){var i=function(){var t=rt();if(t)return ot[t]}(),a=o.call(t,e,r,n?i:null);a&&("function"==typeof a.then?a.then(function(t){ht(t,i)}).catch(function(t){0}):ht(a,i))})}}function ut(){var t=rt();t&&(ot[t]={x:window.pageXOffset,y:window.pageYOffset})}function ct(t){return pt(t.x)||pt(t.y)}function st(t){return{x:pt(t.x)?t.x:window.pageXOffset,y:pt(t.y)?t.y:window.pageYOffset}}function pt(t){return"number"==typeof t}var ft=/^#\d/;function ht(t,e){var r="object"==typeof t;if(r&&"string"==typeof t.selector){var n=ft.test(t.selector)?document.getElementById(t.selector.slice(1)):document.querySelector(t.selector);if(n){var o=t.offset&&"object"==typeof t.offset?t.offset:{};e=function(t,e){var r=document.documentElement.getBoundingClientRect(),n=t.getBoundingClientRect();return{x:n.left-r.left-e.x,y:n.top-r.top-e.y}}(n,o=function(t){return{x:pt(t.x)?t.x:0,y:pt(t.y)?t.y:0}}(o))}else ct(t)&&(e=st(t))}else r&&ct(t)&&(e=st(t));e&&window.scrollTo(e.x,e.y)}var lt=X&&function(){var t=window.navigator.userAgent;return(-1===t.indexOf("Android 2.")&&-1===t.indexOf("Android 4.0")||-1===t.indexOf("Mobile Safari")||-1!==t.indexOf("Chrome")||-1!==t.indexOf("Windows Phone"))&&(window.history&&"pushState"in window.history)}();function dt(t,e){ut();var r=window.history;try{e?r.replaceState({key:rt()},"",t):r.pushState({key:nt(tt())},"",t)}catch(r){window.location[e?"replace":"assign"](t)}}function vt(t){dt(t,!0)}function yt(t,e,r){var n=function(o){o>=t.length?r():t[o]?e(t[o],function(){n(o+1)}):n(o+1)};n(0)}function mt(t){return function(e,r,o){var i=!1,a=0,u=null;gt(t,function(t,e,r,c){if("function"==typeof t&&void 0===t.cid){i=!0,a++;var s,p=xt(function(e){(function(t){return t.__esModule||bt&&"Module"===t[Symbol.toStringTag]})(e)&&(e=e.default),t.resolved="function"==typeof e?e:D.extend(e),r.components[c]=e,--a<=0&&o()}),f=xt(function(t){var e="Failed to resolve async component "+c+": "+t;u||(u=n(t)?t:new Error(e),o(u))});try{s=t(p,f)}catch(t){f(t)}if(s)if("function"==typeof s.then)s.then(p,f);else{var h=s.component;h&&"function"==typeof h.then&&h.then(p,f)}}}),i||o()}}function gt(t,e){return wt(t.map(function(t){return Object.keys(t.components).map(function(r){return e(t.components[r],t.instances[r],t,r)})}))}function wt(t){return Array.prototype.concat.apply([],t)}var bt="function"==typeof Symbol&&"symbol"==typeof Symbol.toStringTag;function xt(t){var e=!1;return function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];if(!e)return e=!0,t.apply(this,r)}}var kt=function(t){function e(e){t.call(this),this.name=this._name="NavigationDuplicated",this.message='Navigating to current location ("'+e.fullPath+'") is not allowed',Object.defineProperty(this,"stack",{value:(new t).stack,writable:!0,configurable:!0})}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(Error);kt._name="NavigationDuplicated";var Rt=function(t,e){this.router=t,this.base=function(t){if(!t)if(X){var e=document.querySelector("base");t=(t=e&&e.getAttribute("href")||"/").replace(/^https?:\/\/[^\/]+/,"")}else t="/";"/"!==t.charAt(0)&&(t="/"+t);return t.replace(/\/$/,"")}(e),this.current=m,this.pending=null,this.ready=!1,this.readyCbs=[],this.readyErrorCbs=[],this.errorCbs=[]};function Et(t,e,r,n){var o=gt(t,function(t,n,o,i){var a=function(t,e){"function"!=typeof t&&(t=D.extend(t));return t.options[e]}(t,e);if(a)return Array.isArray(a)?a.map(function(t){return r(t,n,o,i)}):r(a,n,o,i)});return wt(n?o.reverse():o)}function Ot(t,e){if(e)return function(){return t.apply(e,arguments)}}Rt.prototype.listen=function(t){this.cb=t},Rt.prototype.onReady=function(t,e){this.ready?t():(this.readyCbs.push(t),e&&this.readyErrorCbs.push(e))},Rt.prototype.onError=function(t){this.errorCbs.push(t)},Rt.prototype.transitionTo=function(t,e,r){var n=this,o=this.router.match(t,this.current);this.confirmTransition(o,function(){n.updateRoute(o),e&&e(o),n.ensureURL(),n.ready||(n.ready=!0,n.readyCbs.forEach(function(t){t(o)}))},function(t){r&&r(t),t&&!n.ready&&(n.ready=!0,n.readyErrorCbs.forEach(function(e){e(t)}))})},Rt.prototype.confirmTransition=function(t,e,r){var i=this,a=this.current,u=function(t){!o(kt,t)&&n(t)&&(i.errorCbs.length?i.errorCbs.forEach(function(e){e(t)}):console.error(t)),r&&r(t)};if(w(t,a)&&t.matched.length===a.matched.length)return this.ensureURL(),u(new kt(t));var c=function(t,e){var r,n=Math.max(t.length,e.length);for(r=0;r<n&&t[r]===e[r];r++);return{updated:e.slice(0,r),activated:e.slice(r),deactivated:t.slice(r)}}(this.current.matched,t.matched),s=c.updated,p=c.deactivated,f=c.activated,h=[].concat(function(t){return Et(t,"beforeRouteLeave",Ot,!0)}(p),this.router.beforeHooks,function(t){return Et(t,"beforeRouteUpdate",Ot)}(s),f.map(function(t){return t.beforeEnter}),mt(f));this.pending=t;var l=function(e,r){if(i.pending!==t)return u();try{e(t,a,function(t){!1===t||n(t)?(i.ensureURL(!0),u(t)):"string"==typeof t||"object"==typeof t&&("string"==typeof t.path||"string"==typeof t.name)?(u(),"object"==typeof t&&t.replace?i.replace(t):i.push(t)):r(t)})}catch(t){u(t)}};yt(h,l,function(){var r=[];yt(function(t,e,r){return Et(t,"beforeRouteEnter",function(t,n,o,i){return function(t,e,r,n,o){return function(i,a,u){return t(i,a,function(t){"function"==typeof t&&n.push(function(){!function t(e,r,n,o){r[n]&&!r[n]._isBeingDestroyed?e(r[n]):o()&&setTimeout(function(){t(e,r,n,o)},16)}(t,e.instances,r,o)}),u(t)})}}(t,o,i,e,r)})}(f,r,function(){return i.current===t}).concat(i.router.resolveHooks),l,function(){if(i.pending!==t)return u();i.pending=null,e(t),i.router.app&&i.router.app.$nextTick(function(){r.forEach(function(t){t()})})})})},Rt.prototype.updateRoute=function(t){var e=this.current;this.current=t,this.cb&&this.cb(t),this.router.afterHooks.forEach(function(r){r&&r(t,e)})};var _t=function(t){function e(e,r){var n=this;t.call(this,e,r);var o=e.options.scrollBehavior,i=lt&&o;i&&it();var a=At(this.base);window.addEventListener("popstate",function(t){var r=n.current,o=At(n.base);n.current===m&&o===a||n.transitionTo(o,function(t){i&&at(e,t,r,!0)})})}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.go=function(t){window.history.go(t)},e.prototype.push=function(t,e,r){var n=this,o=this.current;this.transitionTo(t,function(t){dt(k(n.base+t.fullPath)),at(n.router,t,o,!1),e&&e(t)},r)},e.prototype.replace=function(t,e,r){var n=this,o=this.current;this.transitionTo(t,function(t){vt(k(n.base+t.fullPath)),at(n.router,t,o,!1),e&&e(t)},r)},e.prototype.ensureURL=function(t){if(At(this.base)!==this.current.fullPath){var e=k(this.base+this.current.fullPath);t?dt(e):vt(e)}},e.prototype.getCurrentLocation=function(){return At(this.base)},e}(Rt);function At(t){var e=decodeURI(window.location.pathname);return t&&0===e.indexOf(t)&&(e=e.slice(t.length)),(e||"/")+window.location.search+window.location.hash}var jt=function(t){function e(e,r,n){t.call(this,e,r),n&&function(t){var e=At(t);if(!/^\/#/.test(e))return window.location.replace(k(t+"/#"+e)),!0}(this.base)||Ct()}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.setupListeners=function(){var t=this,e=this.router.options.scrollBehavior,r=lt&&e;r&&it(),window.addEventListener(lt?"popstate":"hashchange",function(){var e=t.current;Ct()&&t.transitionTo(St(),function(n){r&&at(t.router,n,e,!0),lt||Pt(n.fullPath)})})},e.prototype.push=function(t,e,r){var n=this,o=this.current;this.transitionTo(t,function(t){Tt(t.fullPath),at(n.router,t,o,!1),e&&e(t)},r)},e.prototype.replace=function(t,e,r){var n=this,o=this.current;this.transitionTo(t,function(t){Pt(t.fullPath),at(n.router,t,o,!1),e&&e(t)},r)},e.prototype.go=function(t){window.history.go(t)},e.prototype.ensureURL=function(t){var e=this.current.fullPath;St()!==e&&(t?Tt(e):Pt(e))},e.prototype.getCurrentLocation=function(){return St()},e}(Rt);function Ct(){var t=St();return"/"===t.charAt(0)||(Pt("/"+t),!1)}function St(){var t=window.location.href,e=t.indexOf("#");if(e<0)return"";var r=(t=t.slice(e+1)).indexOf("?");if(r<0){var n=t.indexOf("#");t=n>-1?decodeURI(t.slice(0,n))+t.slice(n):decodeURI(t)}else r>-1&&(t=decodeURI(t.slice(0,r))+t.slice(r));return t}function $t(t){var e=window.location.href,r=e.indexOf("#");return(r>=0?e.slice(0,r):e)+"#"+t}function Tt(t){lt?dt($t(t)):window.location.hash=t}function Pt(t){lt?vt($t(t)):window.location.replace($t(t))}var Lt=function(t){function e(e,r){t.call(this,e,r),this.stack=[],this.index=-1}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.push=function(t,e,r){var n=this;this.transitionTo(t,function(t){n.stack=n.stack.slice(0,n.index+1).concat(t),n.index++,e&&e(t)},r)},e.prototype.replace=function(t,e,r){var n=this;this.transitionTo(t,function(t){n.stack=n.stack.slice(0,n.index).concat(t),e&&e(t)},r)},e.prototype.go=function(t){var e=this,r=this.index+t;if(!(r<0||r>=this.stack.length)){var n=this.stack[r];this.confirmTransition(n,function(){e.index=r,e.updateRoute(n)},function(t){o(kt,t)&&(e.index=r)})}},e.prototype.getCurrentLocation=function(){var t=this.stack[this.stack.length-1];return t?t.fullPath:"/"},e.prototype.ensureURL=function(){},e}(Rt),qt=function(t){void 0===t&&(t={}),this.app=null,this.apps=[],this.options=t,this.beforeHooks=[],this.resolveHooks=[],this.afterHooks=[],this.matcher=W(t.routes||[],this);var e=t.mode||"hash";switch(this.fallback="history"===e&&!lt&&!1!==t.fallback,this.fallback&&(e="hash"),X||(e="abstract"),this.mode=e,e){case"history":this.history=new _t(this,t.base);break;case"hash":this.history=new jt(this,t.base,this.fallback);break;case"abstract":this.history=new Lt(this,t.base);break;default:0}},Ut={currentRoute:{configurable:!0}};function It(t,e){return t.push(e),function(){var r=t.indexOf(e);r>-1&&t.splice(r,1)}}qt.prototype.match=function(t,e,r){return this.matcher.match(t,e,r)},Ut.currentRoute.get=function(){return this.history&&this.history.current},qt.prototype.init=function(t){var e=this;if(this.apps.push(t),t.$once("hook:destroyed",function(){var r=e.apps.indexOf(t);r>-1&&e.apps.splice(r,1),e.app===t&&(e.app=e.apps[0]||null)}),!this.app){this.app=t;var r=this.history;if(r instanceof _t)r.transitionTo(r.getCurrentLocation());else if(r instanceof jt){var n=function(){r.setupListeners()};r.transitionTo(r.getCurrentLocation(),n,n)}r.listen(function(t){e.apps.forEach(function(e){e._route=t})})}},qt.prototype.beforeEach=function(t){return It(this.beforeHooks,t)},qt.prototype.beforeResolve=function(t){return It(this.resolveHooks,t)},qt.prototype.afterEach=function(t){return It(this.afterHooks,t)},qt.prototype.onReady=function(t,e){this.history.onReady(t,e)},qt.prototype.onError=function(t){this.history.onError(t)},qt.prototype.push=function(t,e,r){var n=this;if(!e&&!r&&"undefined"!=typeof Promise)return new Promise(function(e,r){n.history.push(t,e,r)});this.history.push(t,e,r)},qt.prototype.replace=function(t,e,r){var n=this;if(!e&&!r&&"undefined"!=typeof Promise)return new Promise(function(e,r){n.history.replace(t,e,r)});this.history.replace(t,e,r)},qt.prototype.go=function(t){this.history.go(t)},qt.prototype.back=function(){this.go(-1)},qt.prototype.forward=function(){this.go(1)},qt.prototype.getMatchedComponents=function(t){var e=t?t.matched?t:this.resolve(t).route:this.currentRoute;return e?[].concat.apply([],e.matched.map(function(t){return Object.keys(t.components).map(function(e){return t.components[e]})})):[]},qt.prototype.resolve=function(t,e,r){var n=z(t,e=e||this.history.current,r,this),o=this.match(n,e),i=o.redirectedFrom||o.fullPath;return{location:n,route:o,href:function(t,e,r){var n="hash"===r?"#"+e:e;return t?k(t+"/"+n):n}(this.history.base,i,this.mode),normalizedTo:n,resolved:o}},qt.prototype.addRoutes=function(t){this.matcher.addRoutes(t),this.history.current!==m&&this.history.transitionTo(this.history.getCurrentLocation())},Object.defineProperties(qt.prototype,Ut),qt.install=function t(e){if(!t.installed||D!==e){t.installed=!0,D=e;var r=function(t){return void 0!==t},n=function(t,e){var n=t.$options._parentVnode;r(n)&&r(n=n.data)&&r(n=n.registerRouteInstance)&&n(t,e)};e.mixin({beforeCreate:function(){r(this.$options.router)?(this._routerRoot=this,this._router=this.$options.router,this._router.init(this),e.util.defineReactive(this,"_route",this._router.history.current)):this._routerRoot=this.$parent&&this.$parent._routerRoot||this,n(this,this)},destroyed:function(){n(this)}}),Object.defineProperty(e.prototype,"$router",{get:function(){return this._routerRoot._router}}),Object.defineProperty(e.prototype,"$route",{get:function(){return this._routerRoot._route}}),e.component("RouterView",a),e.component("RouterLink",K);var o=e.config.optionMergeStrategies;o.beforeRouteEnter=o.beforeRouteLeave=o.beforeRouteUpdate=o.created}},qt.version="3.1.3",X&&window.Vue&&window.Vue.use(qt),e.a=qt}}]);