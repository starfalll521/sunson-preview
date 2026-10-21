/* One scoped scene. Fixed SVG geometry, one GSAP timeline, no per-frame layout reads. */
(()=>{
 'use strict';
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 const mounted=new WeakMap();
 const poses=[0,.62,1.22,1.85];
 function mount(root){
  if(mounted.has(root))return;
  const svg=root.querySelector('[data-atlas-helix]');
  if(!svg||!window.SUNSONHelixModel)return;
  const model=SUNSONHelixModel.create(svg),motion=window.gsap;
  const tabs=[...root.querySelectorAll('[role="tab"]')];
  const light=root.querySelector('.atlas-light'),object=root.querySelector('.atlas-object');
  const controls=root.querySelector('[data-atlas-controls]'),toggle=root.querySelector('[data-atlas-toggle]');
  const replay=root.querySelector('[data-atlas-replay]'),icon=toggle.querySelector('[data-atlas-control-icon]');
  const readout=toggle.querySelector('span');
  let state={angle:0},selected=0,inView=false,userPaused=false,entered=false,destroyed=false;
  let rotation=null,illumination=null,feedback=null,observer=null,mutation=null,phase='ready';
  const current=()=>Math.max(0,tabs.findIndex(tab=>tab.getAttribute('aria-selected')==='true'));
  function paint(){model.render(state.angle)}
  function mayRun(){return motion&&!preference.matches&&inView&&!document.hidden&&!userPaused&&!destroyed}
  function sync(){
   root.dataset.atlasMotion=preference.matches?'reduced':!motion?'static':userPaused?'paused':mayRun()?phase:'suspended';
   root.dataset.atlasState=String(selected);
   controls.hidden=!motion||preference.matches;
   toggle.setAttribute('aria-pressed',String(userPaused));
   readout.textContent=userPaused?'Resume motion':'Pause motion';
   icon.setAttribute('d',userPaused?'M7 4l9 6-9 6Z':'M7 4v12M13 4v12');
   if(controls.hidden&&controls.contains(document.activeElement))tabs[selected].focus();
  }
  function stop(){rotation?.kill();rotation=null;illumination?.kill();illumination=null}
  function clearFeedback(){
   feedback?.kill();feedback=null;
   if(motion){
    const reading=[...root.querySelectorAll('.science-reading')];
    motion.killTweensOf(reading);motion.set(reading,{clearProps:'transform,opacity'});
   }
  }
  function sweep(){
   if(!motion||!mayRun())return;
   illumination?.kill();
   illumination=motion.timeline({onComplete:()=>{illumination=null}})
    .fromTo(light,{xPercent:-30,opacity:0},{xPercent:0,opacity:.7,duration:.4,ease:'sine.out'},0)
    .to(light,{xPercent:25,opacity:0,duration:1.25,ease:'sine.inOut'},.4);
  }
  function observe(){
   phase='observing';
   rotation=motion.to(state,{angle:state.angle+Math.PI*2,duration:28,repeat:-1,ease:'none',onUpdate:paint});
   if(!mayRun())rotation.pause();sync();
  }
  function begin(){
   entered=true;phase='entering';sweep();
   rotation=motion.to(state,{angle:state.angle+Math.PI,duration:4.2,ease:'sine.inOut',onUpdate:paint,onComplete:observe});
  }
  function drive(){
   if(destroyed)return;
   if(preference.matches||!motion){
    stop();clearFeedback();
    state.angle=poses[selected];paint();
    if(motion){motion.set([object,light],{clearProps:'transform,opacity'});}
   }else if(mayRun()){
    if(!entered)begin();else if(rotation)rotation.resume();else observe();
    illumination?.resume();
   }else{rotation?.pause();illumination?.pause();clearFeedback();}
   sync();
  }
  function select(){
   const next=current();if(next===selected)return;
   selected=next;root.dataset.atlasState=String(next);
   if(motion){
    clearFeedback();
    const content=root.querySelector('#research-panel-'+next+' .science-reading');
    if(mayRun())feedback=motion.fromTo(content,{opacity:.7,x:8},{opacity:1,x:0,duration:.22,ease:'power2.out',clearProps:'transform,opacity'});
   }
   stop();
   let target=poses[next]+Math.round((state.angle-poses[next])/(Math.PI*2))*Math.PI*2;
   if(mayRun()){
    phase='responding';sweep();
    rotation=motion.to(state,{angle:target,duration:.65,ease:'power2.out',onUpdate:paint,onComplete:observe});
   }else{state.angle=target;paint();}
   sync();
  }
  function pause(){userPaused=!userPaused;drive()}
  function restart(){
   if(!motion||preference.matches)return;
   stop();entered=false;
   /* A deliberate replay resumes the sequence; ordinary tab selection preserves pause. */
   userPaused=false;drive();
  }
  function visibility(){drive()}
  function preferenceChanged(){drive()}
  function cleanup(){
   if(destroyed)return;destroyed=true;stop();clearFeedback();observer?.disconnect();mutation?.disconnect();model.destroy();
   if(motion)motion.set(light,{clearProps:'transform,opacity'});
   document.removeEventListener('visibilitychange',visibility);
   preference.removeEventListener('change',preferenceChanged);
   toggle.removeEventListener('click',pause);replay.removeEventListener('click',restart);
   window.removeEventListener('pagehide',cleanup);mounted.delete(root);
  }
  selected=current();state.angle=poses[selected];paint();
  root.dataset.atlasReady='true';mounted.set(root,{cleanup});
  mutation=new MutationObserver(select);
  mutation.observe(root.querySelector('[role="tablist"]'),{subtree:true,attributes:true,attributeFilter:['aria-selected']});
  observer=new IntersectionObserver(entries=>{inView=entries.some(e=>e.isIntersecting);drive()},{threshold:.12});
  observer.observe(root.querySelector('.atlas-visual'));
  toggle.addEventListener('click',pause);replay.addEventListener('click',restart);
  document.addEventListener('visibilitychange',visibility);preference.addEventListener('change',preferenceChanged);
  window.addEventListener('pagehide',cleanup);drive();
 }
 const mountAll=()=>document.querySelectorAll('[data-science-atlas]').forEach(mount);
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mountAll,{once:true});else mountAll();
 window.addEventListener('pageshow',event=>{if(event.persisted)mountAll()});
})();
