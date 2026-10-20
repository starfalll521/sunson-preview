(()=>{let tabs=[...document.querySelectorAll('[role=tab][id^="application-tab-"]')];function show(t){tabs.forEach(x=>{let on=x===t;x.setAttribute('aria-selected',String(on));x.tabIndex=on?0:-1;let p=document.getElementById(x.getAttribute('aria-controls'));p.hidden=!on;p.classList.toggle('sun-panel-enter',on)})}tabs.forEach((t,i)=>{t.addEventListener('click',()=>show(t));t.addEventListener('keydown',e=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();let n=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;show(tabs[n]);tabs[n].focus()}})});})();
/* task-index-20261019 */
(()=>{
 const header=document.querySelector('.source-header');
 const menu=document.querySelector('.sun-topic-menu');
 const mobile=matchMedia('(max-width:767px)');
 const measure=()=>{
  if(header)document.documentElement.style.setProperty('--sun-header-height',header.getBoundingClientRect().height+'px');
  const topic=menu?(mobile.matches?menu.querySelector('summary'):menu):null;
  document.documentElement.style.setProperty('--sun-topic-height',(topic?topic.getBoundingClientRect().height:0)+'px');
 };
 if('ResizeObserver' in window){const observer=new ResizeObserver(measure);if(header)observer.observe(header);if(menu)observer.observe(menu)}
 addEventListener('resize',measure);measure();
 if(!menu)return;
 const adapt=()=>{menu.open=!mobile.matches};adapt();mobile.addEventListener('change',adapt);
 menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{if(mobile.matches)menu.open=false}));
 const sections=[...menu.querySelectorAll('a')].map(a=>document.getElementById(a.hash.slice(1))).filter(Boolean);
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{
   const current=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];
   if(!current)return;
   menu.querySelectorAll('a').forEach(a=>{if(a.hash==='#'+current.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});
  },{rootMargin:'-180px 0px -45% 0px',threshold:0});sections.forEach(s=>observer.observe(s));
 }
})();
