(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{ldWM:function(o,r){o.exports=function(o){for(var r=[],h=0;h<o.length;h++){var t=o.charCodeAt(h);if(t>=55296&&t<=56319&&h+1<o.length){var a=o.charCodeAt(h+1);if(a>=56320&&a<=57343){var n=1024*(t-55296)+a-56320+65536;r.push(240+Math.floor(n/64/64/64),128+Math.floor(n/64/64)%64,128+Math.floor(n/64)%64,128+n%64),h+=1;continue}}t>=2048?r.push(224+Math.floor(t/64/64),128+Math.floor(t/64)%64,128+t%64):t>=128?r.push(192+Math.floor(t/64),128+t%64):r.push(t)}return r}}}]);