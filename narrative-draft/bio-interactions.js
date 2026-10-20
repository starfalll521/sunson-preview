/* Progressive enhancement: copy, routes and diagrams remain readable without JS. */
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const canAnimate=()=>Boolean(window.gsap)&&!reducedMotion.matches;
const header=document.querySelector('.site-header'),menu=document.querySelector('.menu-toggle');
if(header&&menu){
 const close=()=>{header.classList.remove('nav-open');menu.setAttribute('aria-expanded','false');header.querySelectorAll('details').forEach(d=>d.open=false)};
 menu.addEventListener('click',()=>{
  const on=menu.getAttribute('aria-expanded')!=='true';
  header.classList.toggle('nav-open',on);menu.setAttribute('aria-expanded',String(on));
  if(on&&canAnimate())gsap.fromTo(header.querySelector('nav'),{opacity:.75,y:-8},{opacity:1,y:0,duration:.28,ease:'expo.out',clearProps:'opacity,transform',overwrite:true});
 });
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){const was=header.classList.contains('nav-open'),open=header.querySelector('details[open]');close();if(was)menu.focus();else if(open)open.querySelector('summary')?.focus()}});
 document.addEventListener('click',e=>{if(!header.contains(e.target))close()});
 header.querySelectorAll('.nav-panel a').forEach(a=>a.addEventListener('click',close));
 header.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>{
  if(d.open&&canAnimate())gsap.fromTo(d.querySelector('.nav-panel'),{opacity:.75,y:-8},{opacity:1,y:0,duration:.28,ease:'expo.out',clearProps:'opacity,transform',overwrite:true});
 }));
 header.classList.add('nav-ready');
}

document.querySelectorAll('[data-tabs]').forEach(root=>{
 const tabs=[...root.querySelectorAll('[role=tab]')],panels=[...root.querySelectorAll('[role=tabpanel]')];
 const tablist=root.querySelector('[role=tablist]');let selected=-1;
 const layout=matchMedia('(min-width:1024px)');
 const orient=()=>tablist.setAttribute('aria-orientation',layout.matches?'vertical':'horizontal');
 orient();layout.addEventListener('change',orient);
 const show=(i,focus=false,animate=true)=>{
  if(i===selected){if(focus)tabs[i].focus();return}
  const pieces=panels.flatMap(p=>[...p.children]);
  if(window.gsap){gsap.killTweensOf(pieces);gsap.set(pieces,{clearProps:'opacity,transform,clipPath'})}
  tabs.forEach((t,k)=>{t.setAttribute('aria-selected',String(k===i));t.tabIndex=k===i?0:-1;panels[k].hidden=k!==i});
  selected=i;if(focus)tabs[i].focus();
  if(animate&&canAnimate()){
   const plate=panels[i].querySelector('.research-plate'),note=panels[i].querySelector('.research-note');
   gsap.fromTo(plate,{clipPath:'inset(0 0 0 4%)'},{clipPath:'inset(0 0 0 0%)',duration:.4,ease:'expo.out',clearProps:'clipPath',overwrite:true});
   gsap.fromTo(note,{opacity:.65},{opacity:1,duration:.26,ease:'power2.out',clearProps:'opacity',overwrite:true});
  }
 };
 tabs.forEach((t,i)=>{t.addEventListener('click',()=>show(i));t.addEventListener('keydown',e=>{
  let n=i;if(e.key==='ArrowRight'||e.key==='ArrowDown')n=(i+1)%tabs.length;
  else if(e.key==='ArrowLeft'||e.key==='ArrowUp')n=(i+tabs.length-1)%tabs.length;
  else if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;else return;
  e.preventDefault();show(n,true);
 })});
 root.classList.add('tabs-ready');show(0,false,false);
 reducedMotion.addEventListener('change',()=>{
  if(window.gsap){const pieces=panels.flatMap(p=>[...p.children]);gsap.killTweensOf(pieces);gsap.set(pieces,{clearProps:'opacity,transform,clipPath'})}
 });
});

if(window.gsap){
 if(window.ScrollTrigger)gsap.registerPlugin(ScrollTrigger);
 const motion=gsap.matchMedia();
 motion.add('(prefers-reduced-motion: no-preference)',()=>{
  const image=document.querySelector('.hero-image');
  if(image)gsap.fromTo(image,{scale:1.035},{scale:1,duration:1.4,ease:'power2.out',clearProps:'transform'});
  const study=document.querySelector('[data-process]');
  if(study&&window.ScrollTrigger)ScrollTrigger.create({trigger:study,start:'top 85%',once:true,onEnter:()=>{
   const flow=study.querySelector('.manufacturing-flow');
   gsap.fromTo(flow,{'--flow':0},{'--flow':1,duration:.65,ease:'power2.out',clearProps:'--flow'});
   gsap.fromTo(study.querySelectorAll('.process-point'),{scale:.7},{scale:1,duration:.4,stagger:.08,ease:'expo.out',clearProps:'transform'});
  }});
 });
}

document.querySelectorAll('[data-reaction]').forEach(root=>{
 const buttons=[...root.querySelectorAll('[data-reaction-switch]')],left=root.querySelector('[data-chain-left]'),right=root.querySelector('[data-chain-right]'),bond=root.querySelector('[data-target-bond]'),enzyme=root.querySelector('.enzyme-body'),label=root.querySelector('[data-reaction-label]'),replay=root.querySelector('.reaction-replay');
 const titles=['A specific material.','A particular reaction.','A change in the material.'];
 let current=2,sequence=null,interacted=false;
 const parts=[left,right,bond,enzyme];
 if(window.gsap){left.removeAttribute('transform');right.removeAttribute('transform');gsap.set([left,right],{x:0,y:0})}
 const show=(i,animate=true)=>{
  current=i;buttons.forEach((b,k)=>b.setAttribute('aria-pressed',String(k===i)));label.textContent=titles[i];
  const lx=i===2?-95:0,rx=i===2?95:0,cy=i===1?82:i===2?-20:0;
  if(window.gsap){
   gsap.killTweensOf(parts);
   const method=animate&&canAnimate()?'to':'set',opts=method==='to'?{duration:.6,ease:'expo.out',overwrite:true}:{};
   gsap[method](left,{x:lx,y:cy,...opts});gsap[method](right,{x:rx,y:cy,...opts});
   gsap[method](bond,{y:cy,opacity:i===2?0:1,...opts});gsap[method](enzyme,{opacity:i===0?.5:1,...opts});
  }else{
   left.setAttribute('transform',`translate(${lx} ${cy})`);right.setAttribute('transform',`translate(${rx} ${cy})`);bond.setAttribute('transform',`translate(0 ${cy})`);bond.setAttribute('opacity',String(i===2?0:1));enzyme.style.opacity=i===0?'.5':'1';
  }
 };
 const stop=()=>{if(sequence){sequence.kill();sequence=null}};
 const play=()=>{
  stop();if(!canAnimate()){show(2,false);return}
  sequence=gsap.timeline();sequence.call(()=>show(0)).call(()=>show(1),null,.85).call(()=>show(2),null,1.7);
 };
 buttons.forEach((b,i)=>{
  b.disabled=false;b.addEventListener('click',()=>{interacted=true;stop();show(i)});
  b.addEventListener('keydown',e=>{let n=i;if(e.key==='ArrowRight'||e.key==='ArrowDown')n=(i+1)%3;else if(e.key==='ArrowLeft'||e.key==='ArrowUp')n=(i+2)%3;else return;e.preventDefault();interacted=true;stop();buttons[n].focus();show(n)})
 });
 replay.hidden=false;replay.addEventListener('click',()=>{interacted=true;play()});
 show(2,false);
 if(window.ScrollTrigger&&canAnimate())ScrollTrigger.create({trigger:root,start:'top 68%',once:true,onEnter:()=>{if(!interacted)play()}});
 reducedMotion.addEventListener('change',()=>{stop();show(current,false)});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){stop();show(2,false)}});
});
