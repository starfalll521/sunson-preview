/* Generated from the four source controllers by home_motion_bundle.py.
   One homepage entry, one preference source, one GSAP lifecycle context.
   Fast feedback is immediate; finite media/science sequences use shared tokens. */
(()=>{
 'use strict';
 const home=document.querySelector('.bio-home-scale');
 if(!home||home.dataset.motionReady)return;
 home.dataset.motionReady='true';
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const runtime={reduce,canAnimate:()=>Boolean(window.gsap)&&!reduce.matches,
  tokens:Object.freeze({feedback:.18,fast:.4,slow:.9,stagger:.12,ease:'power3.out'})};
 const initialize=()=>{setupCore(runtime);setupResearch(runtime);setupMaterialsAndProcess(runtime);setupScientificField(runtime);setupCinema(runtime);setupScienceSculpture(runtime)};
 const context=window.gsap?gsap.context(initialize):null;
 if(!context)initialize();
 window.addEventListener('pagehide',()=>context?.revert(),{once:true});
function setupCore(runtime){
/* Progressive enhancement: copy, routes and diagrams remain readable without JS. */
const reducedMotion=runtime.reduce;
const canAnimate=runtime.canAnimate;
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
   const study=document.querySelector('[data-process]');
  if(study&&window.ScrollTrigger)ScrollTrigger.create({trigger:study,start:'top 85%',once:true,onEnter:()=>{
   const flow=study.querySelector('.manufacturing-flow');
   gsap.fromTo(flow,{'--flow':0},{'--flow':1,duration:.65,ease:'power2.out',clearProps:'--flow'});
   gsap.fromTo(study.querySelectorAll('.process-point'),{scale:.7},{scale:1,duration:.4,stagger:.08,ease:'expo.out',clearProps:'transform'});
  }});
 });
}


}

function setupResearch(runtime){

 'use strict';
 const reduce=runtime.reduce;
 const enabled=()=>Boolean(window.gsap)&&!reduce.matches;
 const timelines=new Set();
 const stop=timeline=>{if(timeline){timeline.kill();timelines.delete(timeline)}};

 const research=document.querySelector('[data-research-viewer]');
 if(research){
  const buttons=[...document.querySelectorAll('[data-research-switch]')];
  const image=research.querySelector('.research-use-image'),sourceImage=research.querySelector('.research-source-image');
  const sourceCaption=research.querySelector('[data-source-caption]'),useCaption=research.querySelector('[data-use-caption]');
  let sequence=null,current='source';
  const finish=()=>{
   stop(sequence);sequence=null;
   if(window.gsap)gsap.killTweensOf(image);
   image.style.removeProperty('clip-path');
  };
  const show=(mode,animate=true)=>{
   if(!['source','use'].includes(mode))return;
   if(current===mode&&animate)return;
   const previous=getComputedStyle(image).clipPath;
   stop(sequence);sequence=null;current=mode;research.dataset.view=mode;
   buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.researchSwitch===mode)));
   sourceCaption.hidden=mode!=='source';useCaption.hidden=mode!=='use';
   sourceImage.setAttribute('aria-hidden',String(mode!=='source'));
   image.setAttribute('aria-hidden',String(mode!=='use'));
   image.alt='Conceptual study of grain, fruit and linen';
   if(!animate||!enabled()){finish();return}
   sequence=gsap.timeline({onComplete:()=>{const done=sequence;sequence=null;timelines.delete(done);finish()}});
   timelines.add(sequence);
   sequence.fromTo(image,{clipPath:previous==='none'?'inset(0 0 100% 0)':previous},{clipPath:mode==='use'?'inset(0 0 0% 0)':'inset(0 0 100% 0)',duration:.55,ease:'expo.out',clearProps:'clipPath'},0);
  };
  buttons.forEach((button,i)=>{
   button.disabled=false;
   button.addEventListener('click',()=>show(button.dataset.researchSwitch));
   button.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))return;
    event.preventDefault();const next=buttons[1-i];next.focus();show(next.dataset.researchSwitch);
   });
  });
  show('source',false);
  reduce.addEventListener('change',finish);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)finish()});
 }

 window.addEventListener('pagehide',()=>{timelines.forEach(timeline=>timeline.kill());timelines.clear()});

}

function setupMaterialsAndProcess(runtime){

 'use strict';
 const home=document.querySelector('.bio-home-scale');
 if(!home)return;
 const reduce=runtime.reduce;
 const material=document.querySelector('[data-material-arrival]');
 const process=document.querySelector('[data-process-flow]');
 const stages=process?[...process.querySelectorAll('.manufacturing-flow>li')]:[];
 const replay=process?.querySelector('[data-process-replay]');
 const alive=new Set(),triggers=new Set();
 let sequence=null;
 const stop=()=>{if(sequence){sequence.kill();alive.delete(sequence);sequence=null}};
 const complete=()=>{
  stop();
  stages.forEach(stage=>{stage.dataset.processComplete='true';stage.removeAttribute('data-process-active')});
  process?.classList.remove('sequence-running');
 };
 const play=()=>{
  stop();
  if(!window.gsap||reduce.matches){complete();return}
  process.classList.add('sequence-running');
  stages.forEach(stage=>{stage.removeAttribute('data-process-complete');stage.removeAttribute('data-process-active')});
  sequence=gsap.timeline({onComplete:()=>{const done=sequence;sequence=null;alive.delete(done);complete()}});
  alive.add(sequence);
  stages.forEach((stage,index)=>{
   sequence.call(()=>{
    stages.forEach((item,k)=>item.setAttribute('data-process-active',String(k===index)));
    stage.dataset.processComplete='true';
   },null,index*.4);
  });
  sequence.to({}, {duration:.38},1.2);
 };
 const syncReplay=()=>{
  if(!replay)return;
  const available=Boolean(window.gsap)&&!reduce.matches;
  if(!available&&document.activeElement===replay)document.querySelector('#from-research-to-use .reading-link')?.focus();
  replay.hidden=!available;
 };
 if(replay){syncReplay();replay.addEventListener('click',play)}
 if(window.gsap&&window.ScrollTrigger){
  const media=gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)',()=>{
   if(material){
    const image=material.querySelector('img');
    const tween=gsap.fromTo(image,{scale:1.045},{scale:1,duration:1.15,ease:'power3.out',clearProps:'transform',paused:true});
    alive.add(tween);
    triggers.add(ScrollTrigger.create({trigger:material,start:'top 86%',once:true,onEnter:()=>tween.play()}));
   }
   if(process)triggers.add(ScrollTrigger.create({trigger:process,start:'top 78%',once:true,onEnter:play}));
   return ()=>{
    complete();alive.forEach(tween=>tween.kill());alive.clear();
    triggers.forEach(trigger=>trigger.kill());triggers.clear();
    material?.querySelector('img')?.style.removeProperty('transform');
   };
  });
  window.addEventListener('pagehide',()=>media.revert(),{once:true});
 }
 reduce.addEventListener('change',()=>{syncReplay();if(reduce.matches)complete()});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)complete()});

}

function setupScientificField(runtime){

 'use strict';
 const root=document.querySelector('[data-science-field]');if(!root)return;
 const buttons=[...root.querySelectorAll('[role="tab"]')],panels=[...root.querySelectorAll('[role="tabpanel"]')],legends=[...root.querySelectorAll('[data-field-legend]')];
 if(buttons.length!==4||panels.length!==4||legends.length!==4)return;
 let active=Math.max(0,buttons.findIndex(button=>button.getAttribute('aria-selected')==='true'));
 const select=(index,{focus=false}={})=>{
  if(index<0||index>3)return;active=index;
  buttons.forEach((button,i)=>{button.disabled=false;button.setAttribute('aria-selected',String(i===index));button.tabIndex=i===index?0:-1;panels[i].hidden=i!==index;legends[i].hidden=i!==index});
  root.dataset.scienceState=String(index);if(focus)buttons[index].focus();
 };
 buttons.forEach((button,index)=>{
  button.addEventListener('click',()=>select(index));
  button.addEventListener('keydown',event=>{
   let next=index;
   if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%4;
   else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index+3)%4;
   else if(event.key==='Home')next=0;
   else if(event.key==='End')next=3;
   else return;
   event.preventDefault();select(next,{focus:true});
  });
 });
 root.classList.add('science-ready');select(active);
 window.addEventListener('pageshow',event=>{if(event.persisted)select(active)});

}

function setupCinema(runtime){

 'use strict';
 const home=document.querySelector('.bio-home-landscape');
 if(!home||!window.gsap)return;
 if(window.ScrollTrigger)gsap.registerPlugin(ScrollTrigger);
 const media=gsap.matchMedia();
 media.add('(prefers-reduced-motion: no-preference)',()=>{
  const hero=home.querySelector('.bio-hero');
  const title=hero?.querySelectorAll('h1 .line');
  const copy=hero?.querySelector('.hero-copy>p');
  const action=hero?.querySelector('.hero-copy .action');
  const arrival=gsap.timeline({defaults:{ease:'expo.out'}});
  if(title?.length)arrival.fromTo(title,{y:18},{y:0,duration:.85,stagger:.075,clearProps:'transform'},0);
  if(copy)arrival.fromTo(copy,{y:12},{y:0,duration:.75,clearProps:'transform'},.1);
  if(action)arrival.fromTo(action,{y:8},{y:0,duration:.6,clearProps:'transform'},.18);
  if(window.ScrollTrigger){
   const image=hero?.querySelector('.hero-image');
   if(image&&matchMedia('(min-width: 900px)').matches){
    gsap.fromTo(image,{scale:1.035,yPercent:0},{scale:1.1,yPercent:4,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:true}});
   }
   const plates=home.querySelectorAll('.research-diptych-window');
   if(plates.length)ScrollTrigger.create({trigger:plates[0],start:'top 88%',once:true,onEnter:()=>{
    gsap.fromTo(plates,{clipPath:'inset(0 0 5% 0)',y:14},{clipPath:'inset(0 0 0% 0)',y:0,duration:.95,stagger:.09,ease:'expo.out',clearProps:'clipPath,transform'});
   }});
  }
 });
 window.addEventListener('pagehide',()=>media.revert(),{once:true});

}

function setupScienceSculpture(runtime){

 'use strict';
 if(window.SUNSONScienceSculpture)return;
 const mounted=new WeakMap(),instances=new Set();
 const sharedPreference=(typeof runtime!=='undefined'&&runtime.reduce)||matchMedia('(prefers-reduced-motion: reduce)');
 function mount(host,options={}){
  if(!host)return null;if(host.matches?.('.science-field-art'))host=host.closest('.science-figure');if(!host||mounted.has(host))return mounted.get(host)||null;
  const svg=host.querySelector('[data-helix-svg]'),field=host.closest('[data-science-field]');if(!svg||!field)return null;
  const tabs=[...field.querySelectorAll('[role="tab"]')];if(tabs.length!==4)return null;
  const pose=svg.querySelector('[data-helix-pose]'),back=svg.querySelector('[data-helix-depth="back"]'),front=svg.querySelector('[data-helix-depth="front"]');
  const edges=[...svg.querySelectorAll('[data-helix-segment]')].sort((a,b)=>Number(a.dataset.helixOrder)-Number(b.dataset.helixOrder));
  const reveal=svg.querySelector('[data-helix-reveal]'),rungs=[...svg.querySelectorAll('[data-helix-rung]')],tips=[...svg.querySelectorAll('[data-helix-tip]')],traces=[...svg.querySelectorAll('[data-helix-trace]')];
  if(!pose||!back||!front||!reveal||edges.length!==10||rungs.length!==18||tips.length!==4||traces.length!==2)return null;
  const reduce=options.reduce||sharedPreference,motion=window.gsap;
  const selected=()=>Math.max(0,tabs.findIndex(tab=>tab.getAttribute('aria-selected')==='true'));
  let targetState=selected(),destroyed=false,inView=false,userPaused=false,started=false,complete=false,phase='ready';
  let timeline=null,feedback=null,introPlaying=false,feedbackPlaying=false,observer=null,mutation=null;
  const controls=document.createElement('div');controls.className='science-vector-controls';controls.hidden=true;
  const replay=document.createElement('button');replay.type='button';replay.className='science-vector-replay';replay.textContent='Replay animation';
  const pause=document.createElement('button');pause.type='button';pause.className='science-motion-toggle';pause.textContent='Pause animation';controls.append(replay,pause);host.append(controls);
  const setData=(name,value)=>{host.dataset[name]=String(value);field.dataset[name]=String(value)};
  const label={ready:'Complete biological illustration',building:'Establishing the two strands',connecting:'Connecting the transverse bridges',transmitting:'Passing light along the biological axis',settling:'Returning to the complete resting form',complete:'Complete animation, resting',reduced:'Complete static illustration, reduced motion',static:'Complete static illustration'};
  function setPhase(name){phase=name;setData('sculpturePhase',name);setData('sculptureAction',label[name]||name)}
  function allowed(){return !destroyed&&!reduce.matches&&!userPaused&&inView&&!document.hidden}
  function syncUI(){
   controls.hidden=!motion||reduce.matches;pause.hidden=complete||!started;
   pause.dataset.paused=String(userPaused);pause.textContent=userPaused?'Play animation':'Pause animation';
   setData('sculpturePaused',userPaused||reduce.matches);setData('sculptureRunning',introPlaying||feedbackPlaying);
   if(controls.hidden&&(document.activeElement===pause||document.activeElement===replay))tabs[targetState]?.focus();
   else if(pause.hidden&&document.activeElement===pause)replay.focus();
  }
  function restoreComplete(){
   if(!motion)return;
   motion.set([...edges,...traces],{opacity:0});motion.set(reveal,{attr:{width:680}});motion.set(rungs,{scaleX:1,opacity:1,transformOrigin:'50% 50%'});motion.set(tips,{opacity:1});motion.set([back,front],{x:0,y:0});
   motion.set(traces,{strokeDashoffset:112});
  }
  function finish(){
   introPlaying=false;complete=true;restoreComplete();setPhase(reduce.matches?'reduced':'complete');syncUI();
  }
  function createTimeline(){
   if(!motion)return null;
   const tl=motion.timeline({paused:true,defaults:{ease:'power2.out'},onComplete:finish});
   tl.call(()=>setPhase('building'),null,0);
   tl.fromTo(reveal,{attr:{width:0}},{attr:{width:680},duration:1.8,ease:'power1.inOut'},0);
   tl.fromTo(edges,{opacity:0},{opacity:.94,duration:.55,stagger:.15,ease:'power1.inOut'},.1);
   tl.call(()=>setPhase('connecting'),null,1.8);
   tl.fromTo(rungs,{scaleX:0,opacity:0,transformOrigin:'50% 50%'},{scaleX:1,opacity:1,duration:.52,stagger:.1,ease:'power2.out'},1.8);
   tl.call(()=>setPhase('transmitting'),null,4.2);
   tl.to(traces,{opacity:.92,duration:.22},4.2);
   tl.fromTo(traces,{strokeDashoffset:112},{strokeDashoffset:-12,duration:2.35,ease:'none',immediateRender:false},4.25);
   tl.to(back,{x:-1.5,y:-.8,duration:1.15,repeat:1,yoyo:true,ease:'sine.inOut'},4.25);
   tl.to(front,{x:1.5,y:.8,duration:1.15,repeat:1,yoyo:true,ease:'sine.inOut'},4.25);
   tl.to(traces,{opacity:0,duration:.35},6.4);
   tl.call(()=>setPhase('settling'),null,6.8);
   tl.to(edges,{opacity:0,duration:1.55,ease:'sine.inOut'},6.8);
   tl.to([back,front],{x:0,y:0,duration:1.5,ease:'sine.inOut'},7.3);
   return tl;
  }
  function drive(){
   if(destroyed)return;
   if(!motion){setPhase('static');syncUI();return}
   if(reduce.matches){timeline?.kill();timeline=null;feedback?.kill();feedback=null;introPlaying=feedbackPlaying=false;complete=true;restoreComplete();setPhase('reduced');syncUI();return}
   if(!allowed()){timeline?.pause();feedback?.pause();introPlaying=feedbackPlaying=false;syncUI();return}
   if(!started&&!complete){started=true;timeline=createTimeline()}
   if(complete&&phase==='reduced')setPhase('complete');
   if(timeline&&!complete){timeline.play();introPlaying=true}
   if(feedback){feedback.play();feedbackPlaying=true}
   syncUI();
  }
  function onReplay(){
   if(!motion||reduce.matches||destroyed)return;
   timeline?.kill();timeline=null;restoreComplete();userPaused=false;started=false;complete=false;setPhase('ready');drive();
  }
  function togglePause(){userPaused=!userPaused;drive()}
  function onStateChange(){
   const index=selected();if(index===targetState)return;targetState=index;setData('sculptureState',index);feedback?.kill();feedback=null;feedbackPlaying=false;
   const rotations=[0,-.6,.45,.75],shifts=[0,-2,2,1];
   if(motion&&allowed()){
    feedbackPlaying=true;feedback=motion.to(pose,{rotation:rotations[index],x:shifts[index],duration:.62,ease:'power2.out',svgOrigin:'380 260',overwrite:'auto',onComplete:()=>{feedback=null;feedbackPlaying=false;syncUI()}});
   }else if(motion)motion.set(pose,{rotation:rotations[index],x:shifts[index],svgOrigin:'380 260'});
   syncUI();
  }
  function onPreference(){drive()}
  function onVisibility(){drive()}
  function destroy(){
   if(destroyed)return;destroyed=true;timeline?.kill();feedback?.kill();timeline=feedback=null;introPlaying=feedbackPlaying=false;observer?.disconnect();mutation?.disconnect();
   restoreComplete();if(motion)motion.set(pose,{rotation:0,x:0,svgOrigin:'380 260'});
   document.removeEventListener('visibilitychange',onVisibility);reduce.removeEventListener('change',onPreference);window.removeEventListener('pagehide',onPageHide);replay.removeEventListener('click',onReplay);pause.removeEventListener('click',togglePause);controls.remove();
   setData('sculptureReady',false);setData('sculptureRunning',false);mounted.delete(host);instances.delete(api);
  }
  function onPageHide(){destroy()}
  const api={destroy,get ready(){return !destroyed},get state(){return targetState},get phase(){return phase}};mounted.set(host,api);instances.add(api);
  setData('sculptureReady',true);setData('sculptureDecoded',true);setData('sculptureState',targetState);setData('sculptureRenderer','native-vector');setData('sculptureTexture','native-vector');setPhase(reduce.matches?'reduced':'ready');
  mutation=new MutationObserver(onStateChange);const tablist=field.querySelector('[role="tablist"]');if(tablist)mutation.observe(tablist,{attributes:true,subtree:true,attributeFilter:['aria-selected']});
  if('IntersectionObserver'in window){observer=new IntersectionObserver(entries=>{inView=entries.some(entry=>entry.isIntersecting);drive()},{threshold:.12});observer.observe(svg)}else inView=true;
  replay.addEventListener('click',onReplay);pause.addEventListener('click',togglePause);reduce.addEventListener('change',onPreference);document.addEventListener('visibilitychange',onVisibility);window.addEventListener('pagehide',onPageHide);drive();return api;
 }
 const mountAll=()=>document.querySelectorAll('[data-science-field] .science-figure').forEach(host=>mount(host));
 window.SUNSONScienceSculpture=Object.freeze({mount,destroyAll:()=>[...instances].forEach(instance=>instance.destroy())});
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mountAll,{once:true});else mountAll();window.addEventListener('pageshow',event=>{if(event.persisted)mountAll()});

}
})();
