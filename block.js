"use strict";(function(t){function e(t){var e,n;try{e=JSON.parse(t)}catch(o){try{n=new Function("return "+t),e=n()}catch(t){l("Failed secondary JSON parse",!0)}}return e}function n(t){return"function"==typeof t}function o(t,e){var n,o,r=e,l=document;if(o=l.createElement(t),r)for(n in r)r.hasOwnProperty(n)&&o.setAttribute(n,r[n]);return o}function r(t,e,n){b?t.attachEvent("on"+e,n):t.addEventListener(e,n,!1)}function l(e,n){(g.debug||n)&&t.console&&t.console.log&&(n?console.error("[ABD] "+e):console.log("[ABD] "+e))}function i(t){l("start beginTest"),1!=z&&(!0,u(t),k.quick="testing",C.test=setTimeout(function(){a(t,1)},5))}function u(t){var e,n=document,r=n.body,i="width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;";if(null!=t&&"string"!=typeof t){for(null!=t.style&&(i+=t.style),P=o("div",{class:t.cssClass,style:i}),l("adding bait node to DOM"),r.appendChild(P),e=0;e<w.nullProps.length;e++)P[w.nullProps[e]];for(e=0;e<w.zeroProps.length;e++)P[w.zeroProps[e]]}else l("invalid bait being cast")}function a(t,e){var n,o=document.body,r=!1;if(null==P&&(l("recast bait"),u(t||x)),"string"==typeof t)return l("invalid bait used",!0),void(s()&&setTimeout(function(){!1},5));for(C.test>0&&(clearTimeout(C.test),C.test=0),null!==o.getAttribute("abp")&&(l("found adblock body attribute"),r=!0),n=0;n<w.nullProps.length;n++){if(null==P[w.nullProps[n]]){e>4&&(r=!0),l("found adblock null attr: "+w.nullProps[n]);break}if(1==r)break}for(n=0;n<w.zeroProps.length&&1!=r;n++)0==P[w.zeroProps[n]]&&(e>4&&(r=!0),l("found adblock zero attr: "+w.zeroProps[n]));if(void 0!==window.getComputedStyle){var i=window.getComputedStyle(P,null);"none"!=i.getPropertyValue("display")&&"hidden"!=i.getPropertyValue("visibility")||(e>4&&(r=!0),l("found adblock computedStyle indicator"))}!0,r||e++>=g.maxLoop?(z=r,l("exiting test loop - value: "+z),d(),s()&&setTimeout(function(){!1},5)):C.test=setTimeout(function(){a(t,e)},g.loopDelay)}function s(){if(null===P)return!0;try{n(P.remove)&&P.remove(),document.body.removeChild(P)}catch(t){}return P=null,!0}function d(){var t,e;if(null!==z)for(t=0;t<v.length;t++){e=v[t];try{null!=e&&(n(e.complete)&&e.complete(z),z&&n(e.found)?e.found():!1===z&&n(e.notfound)&&e.notfound())}catch(t){l("Failure in notify listeners "+t.Message,!0)}}}function c(){var e,n=!1;document.readyState&&"complete"==document.readyState&&(n=!0),e=function(){i(x,!1)},n?e():r(t,"load",e)}var f="1.0",p="offset",m="client",y=function(){},b=void 0===t.addEventListener,g={loopDelay:50,maxLoop:5,debug:!0,found:y,notfound:y,complete:y},h=function(){var t={};this.addUrl=function(e){return t[e]={url:e,state:"pending",format:null,data:null,result:null},t[e]},this.setResult=function(n,o,r){var l=t[n];if(null==l&&(l=this.addUrl(n)),l.state=o,null!=r){if("string"==typeof r)try{r=e(r),l.format="json"}catch(t){l.format="easylist"}return l.data=r,l}l.result=null}},v=[],P=null,x={cssClass:"pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links"},w={nullProps:[p+"Parent"],zeroProps:[]};w.zeroProps=[p+"Height",p+"Left",p+"Top",p+"Width",p+"Height",m+"Height",m+"Width"];var k={quick:null,remote:null},z=null,C={test:0,download:0},S={version:f,init:function(t){var e,n;if(t){for(e in n={complete:y,found:y,notfound:y},t)t.hasOwnProperty(e)&&("complete"==e||"found"==e||"notFound"==e?n[e.toLowerCase()]=t[e]:g[e]=t[e]);v.push(n),new h,c()}}};t.adblockDetector=S})(window);