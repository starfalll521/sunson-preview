/* Extra craft only. Existing navigation, enquiries and task-index controllers remain authoritative. */
(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const allowed=()=>window.gsap&&!reduced.matches;
 const header=document.querySelector('.source-header,.site-header');
 const menus=[...document.querySelectorAll('.source-nav-group,.nav-group,.sun-topic-menu,.source-form details,.products')];
 menus.forEach(menu=>menu.addEventListener('toggle',()=>{
  if(!menu.open||!allowed())return;
  const content=[...menu.children].find(e=>e.tagName!=='SUMMARY');
  if(content)gsap.fromTo(content,{opacity:.75,y:-6},{opacity:1,y:0,duration:.24,ease:'expo.out',clearProps:'opacity,transform',overwrite:true});
 }));
 const sourceNav=document.querySelector('#source-navigation');
 if(sourceNav&&'MutationObserver' in window){
  const observer=new MutationObserver(()=>{
   if(sourceNav.classList.contains('is-open')&&allowed())gsap.fromTo(sourceNav,{opacity:.8,y:-8},{opacity:1,y:0,duration:.28,ease:'expo.out',clearProps:'opacity,transform',overwrite:true});
  });observer.observe(sourceNav,{attributes:true,attributeFilter:['class']});
 }
 document.addEventListener('keydown',e=>{
  if(e.key!=='Escape'||sourceNav?.classList.contains('is-open'))return;
  const open=header?.querySelector('details[open]');
  if(open)queueMicrotask(()=>open.querySelector('summary')?.focus());
 },true);
 document.querySelectorAll('.sun-table-scroll').forEach(box=>{
  const measure=()=>box.dataset.scrollable=String(box.scrollWidth>box.clientWidth+2);
  measure();if('ResizeObserver' in window)new ResizeObserver(measure).observe(box);
 });
 const scope=document.querySelector('.bio-overview .scope-links');
 if(scope&&'IntersectionObserver' in window){
  const links=[...scope.querySelectorAll('a[href^="#"]')];
  const items=links.map(a=>document.getElementById(a.hash.slice(1))).filter(Boolean);
  const watcher=new IntersectionObserver(entries=>{
   const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];
   if(!visible)return;links.forEach(a=>{if(a.hash==='#'+visible.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});
  },{rootMargin:'-120px 0px -45% 0px',threshold:0});items.forEach(item=>watcher.observe(item));
 }
 if(!window.gsap)return;
 const context=gsap.matchMedia();
 context.add('(prefers-reduced-motion: no-preference)',()=>{
  const art=document.querySelector('[data-inner-art]');
  if(!art){
   const reference=document.querySelector('.task-product-reference');
   if(reference)gsap.fromTo(reference,{clipPath:'inset(0 2% 0 0)'},{clipPath:'inset(0 0% 0 0)',duration:.6,ease:'expo.out',clearProps:'clipPath'});
   return;
  }
  const draw=()=>{
   const paths=[...art.querySelectorAll('path')].slice(0,18);
   if(paths.length){
    paths.forEach(path=>{
     const length=path.getTotalLength();
     if(length>0)gsap.fromTo(path,{strokeDasharray:`${length} ${length}`,strokeDashoffset:length*.18},{strokeDashoffset:0,duration:.7,ease:'expo.out',clearProps:'strokeDasharray,strokeDashoffset'});
    });
   }else{
    const image=art.querySelector('img');if(image)gsap.fromTo(image,{scale:1.025},{scale:1,duration:.75,ease:'power2.out',clearProps:'transform'});
   }
  };
  if('IntersectionObserver' in window){const watcher=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){draw();watcher.disconnect()}},{threshold:.18});watcher.observe(art);return()=>watcher.disconnect()}
 });
})();
