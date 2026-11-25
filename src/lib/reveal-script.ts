/**
 * Tiny inline scripts that drive the CSS scroll-reveal system (globals.css:
 * [data-animate], [data-stagger] > [data-animate-child], [data-words]).
 *
 * - `revealHeadScript` runs in <head> before first paint and adds `html.js`,
 *   which is what enables the hidden starting states. Without JS (or if this
 *   never runs) everything simply renders visible.
 * - `revealBodyScript` runs at the end of <body>, during HTML parsing — well
 *   before React hydrates — so entrances start immediately. One shared
 *   IntersectionObserver adds `.in` once per element; a MutationObserver picks
 *   up content added by client-side navigations.
 */
export const revealHeadScript = `document.documentElement.classList.add("js")`;

export const revealBodyScript = `(function(){
var d=document.documentElement;
if(!("IntersectionObserver" in window)){d.classList.remove("js");return;}
var sel="[data-animate],[data-stagger],[data-words]";
var io=new IntersectionObserver(function(es){for(var i=0;i<es.length;i++){var e=es[i];if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}}},{rootMargin:"0px 0px -24px 0px"});
function scan(n){if(n.nodeType!==1)return;if(n.matches(sel)&&!n.classList.contains("in"))io.observe(n);var l=n.querySelectorAll(sel);for(var i=0;i<l.length;i++)if(!l[i].classList.contains("in"))io.observe(l[i]);}
scan(document.body);
new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var a=ms[i].addedNodes;for(var j=0;j<a.length;j++)scan(a[j]);}}).observe(document.body,{childList:true,subtree:true});
})();`;
