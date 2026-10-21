/* Three authored application stories; no carousel or auto-advance. */
(()=>{'use strict';
 const section=document.querySelector('#research-in-view.research-everyday');if(!section)return;
 const tabs=Array.from(section.querySelectorAll('[role="tab"]'));
 const panels=tabs.map(t=>document.getElementById(t.getAttribute('aria-controls')));
 const photos=panels.map(p=>p.querySelector('img'));
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let active=0;
 function settle(){if(window.gsap)gsap.killTweensOf(photos);photos.forEach(p=>{p.style.transform='';p.style.opacity='';});}
 function select(index,focus){
  if(index===active){if(focus)tabs[index].focus();return;}
  settle();active=index;
  tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;panels[i].hidden=i!==index;});
  if(focus)tabs[index].focus();
  if(window.gsap&&!reduced.matches&&!document.hidden){
   gsap.set(photos[index],{scale:1.025,opacity:.65});
   gsap.to(photos[index],{scale:1,opacity:1,duration:.7,ease:'power3.out',lazy:false,overwrite:true,clearProps:'transform,opacity'});
  }
 }
 tabs.forEach((tab,i)=>{
  tab.addEventListener('click',()=>select(i,false));
  tab.addEventListener('keydown',event=>{
   let next=i;
   if(event.key==='ArrowRight')next=(i+1)%tabs.length;
   else if(event.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;
   else if(event.key==='Home')next=0;
   else if(event.key==='End')next=tabs.length-1;
   else return;
   event.preventDefault();select(next,true);
  });
 });
 document.addEventListener('visibilitychange',()=>{if(document.hidden)settle();});
 reduced.addEventListener('change',settle);
 if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)settle();});observer.observe(section);}
})();
