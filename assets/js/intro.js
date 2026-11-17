/* Ambient stars, floating hearts and scroll progress. */
"use strict";
(() => {
 const stars=document.getElementById("stars"),floaties=document.getElementById("floaties");
 if(!stars||!floaties||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
 function add(parent,cls,glyphs,n){for(let i=0;i<n;i++){const x=document.createElement("span");x.className=cls;x.textContent=glyphs[i%glyphs.length];x.style.left=Math.random()*100+"%";x.style.setProperty("--duration",12+Math.random()*13+"s");x.style.setProperty("--delay",Math.random()*-20+"s");x.style.setProperty("--drift",Math.random()*100-50+"px");if(cls==="star"){x.style.top=Math.random()*100+"%";x.style.setProperty("--duration",2+Math.random()*4+"s");}parent.append(x);}}
 add(stars,"star",["✦","✧","·"],innerWidth<600?24:48);add(floaties,"floaty",["♡","♥","✧"],innerWidth<600?9:18);
 addEventListener("scroll",()=>{const max=document.documentElement.scrollHeight-innerHeight;document.getElementById("progress").style.transform=`scaleX(${max?scrollY/max:0})`;},{passive:true});
})();
