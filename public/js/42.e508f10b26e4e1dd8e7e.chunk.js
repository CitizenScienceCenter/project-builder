(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{qZep:function(n,r,t){"use strict";t.d(r,"a",function(){return g});var e=t("CJs6");
/*!
OpenLayers tile url function to load tile seeded with TileCache url scheme

@package ol-tilecache
@author Vladimir Vershinin <ghettovoice@gmail.com>
@version 3.0.2
@licence MIT
@copyright (c) 2016-2019, Vladimir Vershinin <ghettovoice@gmail.com>
*/
/**
 * This file is part of ol-tilecache package.
 * @module ol-tilecache
 * @license MIT
 * @author Vladimir Vershinin
 */function o(n,r){var t=r-n.toString().length+1;return(new Array(parseInt(t>0&&t,10)).join("0")+n).toString().slice(-r)}var i=function(){return function(n,r){if(Array.isArray(n))return n;if(Symbol.iterator in Object(n))return function(n,r){var t=[],e=!0,o=!1,i=void 0;try{for(var u,a=n[Symbol.iterator]();!(e=(u=a.next()).done)&&(t.push(u.value),!r||t.length!==r);e=!0);}catch(n){o=!0,i=n}finally{try{!e&&a.return&&a.return()}finally{if(o)throw i}}return t}(n,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();
/**
 * This file is part of ol-tilecache package.
 * @module ol-tilecache
 * @license MIT
 * @author Vladimir Vershinin
 */function u(n,r,t,e,o){var i=n.getZForResolution(e),u=e/n.getResolution(i),a=n.getOrigin(i),c=n.getTileSize(i);(function(n){return"[object Array]"===Object.prototype.toString.call(n)})(c)||(c=[c,c]);var l=o?.5:0,f=o?0:.5,h=Math.floor((r-a[0])/e+l),d=Math.floor((t-a[1])/e+f),g=u*h/c[0],v=u*d/c[1];return o?(g=Math.ceil(g)-1,v=Math.ceil(v)-1):(g=Math.floor(g),v=Math.floor(v)),[g,v]}
/**
 * This file is part of ol-tilecache package.
 * @module ol-tilecache
 * @license MIT
 * @author Vladimir Vershinin
 */
var a=/{z}/g,c=/{0z}/g,l=/{x\d?}/g,f=/{y\d?}/g,h=/{-y\d?}/g,d=[-20037508.342789244,-20037508.342789244,20037508.342789244,20037508.342789244];function g(n){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Object(e.b)(),t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:d;return p(function(n){var r=[],t=/{(\d)-(\d)}/.exec(n)||/{([a-z])-([a-z])}/.exec(n);if(t)for(var e=t[1].charCodeAt(0),o=t[2].charCodeAt(0),i=e;i<=o;++i)r.push(n.replace(t[0],String.fromCharCode(i)));else r.push(n);return r}(n),r,t)}function v(n){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Object(e.b)(),t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:d;return function(e){if(null!=e)return n.replace(a,s(e[0])).replace(c,s(e[0],!0)).replace(l,m(e[1])).replace(f,function(n){return m(-e[2]-1)(n)}).replace(h,function(n){var o=e[0];return m(function(n){return n.maxY-n.minY+1}(function(n,r,t){var e=n.getResolution(t),o=u(n,r[0],r[1],e,!1),a=i(o,2),c=a[0],l=a[1],f=u(n,r[2],r[3],e,!0),h=i(f,2);return{minX:c,minY:l,maxX:h[0],maxY:h[1]}}(r,t,o))+e[2])(n)})}}function p(n){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Object(e.b)(),t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:d;return function(n){if(1===n.length)return n[0];return function(r,t,e){if(null!=r){var o=(r[1]<<r[0])+r[2],i=function(n,r){var t=n%r;return t*r<0?t+r:t}(o,n.length);return n[i](r,t,e)}}}
/**
 * This file is part of ol-tilecache package.
 * @module ol-tilecache
 * @license MIT
 * @author Vladimir Vershinin
 */(n.map(function(n){return v(n,r,t)}))}function s(n,r){return function(){return r?o(n,2):n.toString()}}function m(n){return function(r){var t=r.match(/\d/);return t?o(n,9).slice(3*(t[0]-1),3*t[0]):n.toString()}}"undefined"!=typeof window&&window.ol&&(window.ol.tileCacheUrlFn={createTileUrlFunction:g,createTileUrlFunctionFromTemplate:v,createTileUrlFunctionFromTemplates:p})}}]);