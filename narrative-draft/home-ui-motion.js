(() => {
 'use strict';
 const root=document.body;
 if(!root.classList.contains('home-ui-motion')) return;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const active=new Set();
 const animate=(el,frames,options)=>{
   if(reduce.matches||document.hidden||!el.animate) return;
   const anim=el.animate(frames,options);active.add(anim);
   anim.finished.then(()=>active.delete(anim),()=>active.delete(anim));
 };
 // Never hide copy in CSS: failed/disabled JavaScript leaves the full page readable.
 const targets=document.querySelectorAll('#research-in-view .everyday-intro h2,#enzyme-innovation .intro-pair h2,#work-and-perspectives header,#from-research-to-use .company-story h2,#blog-insights h2,#conversation h2');
 const reveal='IntersectionObserver' in window?new IntersectionObserver(entries=>{
   entries.forEach(({target,isIntersecting})=>{
     if(!isIntersecting)return;
     reveal.unobserve(target);
     animate(target,[{opacity:.35,transform:'translateY(20px)'},{opacity:1,transform:'translateY(0)'}],{duration:620,easing:'cubic-bezier(.2,.65,.3,1)'});
   });
 },{threshold:.18,rootMargin:'0px 0px -40px 0px'}):null;
 targets.forEach(el=>{if(el.getBoundingClientRect().top>innerHeight)reveal?.observe(el)});
 document.querySelectorAll('#work-and-perspectives figure img,#from-research-to-use .company-image img').forEach(img=>{
   const wrap=document.createElement('div');wrap.className='motion-image-window';
   img.before(wrap);wrap.append(img);
 });
 // Existing controllers still own tab state, keyboard operation and model motion.
 const tabObservers=[];
 document.querySelectorAll('.everyday-tabs,.science-tabs').forEach(list=>{
   let selected=list.querySelector('[aria-selected=true]');
   const observer=new MutationObserver(()=>{
     const next=list.querySelector('[aria-selected=true]');
     if(!next||next===selected)return;selected=next;
     const panel=document.getElementById(next.getAttribute('aria-controls'));
     const heading=panel?.querySelector('h3');
     if(heading){heading.getAnimations().forEach(a=>a.cancel());animate(heading,[{opacity:.45,translate:'0 6px'},{opacity:1,translate:'0 0'}],{duration:240,easing:'ease-out'});}
   });
   observer.observe(list,{attributes:true,attributeFilter:['aria-selected'],subtree:true});tabObservers.push(observer);
 });
 // Count only a quantity. The foundation year remains a date, never a counter.
 const area=document.querySelector('.company-facts>div:last-child dd');
 let countFrame=0,finishCount=()=>{};
 if(area&&area.textContent.trim().startsWith('120,000')){
   const textNode=[...area.childNodes].find(n=>n.nodeType===Node.TEXT_NODE);
   const original=textNode?.textContent;
   if(textNode){
     const stop=()=>{cancelAnimationFrame(countFrame);textNode.textContent=original};finishCount=stop;
     const counter='IntersectionObserver' in window?new IntersectionObserver(entries=>{
       if(!entries.some(e=>e.isIntersecting))return;counter.disconnect();
       if(reduce.matches||document.hidden)return;
       area.setAttribute('aria-label',area.textContent.trim());
       const digits=document.createElement('span');digits.setAttribute('aria-hidden','true');digits.style.fontSize='inherit';
       textNode.replaceWith(digits);digits.textContent='0 ';
       const started=performance.now();
       finishCount=()=>{cancelAnimationFrame(countFrame);if(digits.isConnected)digits.replaceWith(textNode);textNode.textContent=original;area.removeAttribute('aria-label')};
       const step=now=>{const t=Math.min((now-started)/1100,1);digits.textContent=Math.round(120000*(1-Math.pow(1-t,3))).toLocaleString('en-US')+' ';if(t<1)countFrame=requestAnimationFrame(step);else finishCount()};
       countFrame=requestAnimationFrame(step);
     },{threshold:.6}):null;
     counter?.observe(area);
   }
 }
 const progress=document.createElement('div');progress.className='home-reading-progress';progress.setAttribute('aria-hidden','true');root.append(progress);
 let frame=0;
 const update=()=>{frame=0;const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?Math.min(1,Math.max(0,scrollY/max)):0})`};
 const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);update();
 const settle=()=>{active.forEach(a=>a.cancel());active.clear();finishCount()};
 reduce.addEventListener('change',()=>{if(reduce.matches)settle()});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)settle()});
 addEventListener('pagehide',()=>{settle();reveal?.disconnect();tabObservers.forEach(o=>o.disconnect());cancelAnimationFrame(frame);removeEventListener('scroll',schedule);removeEventListener('resize',schedule)},{once:true});
})();
