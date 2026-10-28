/* Selected A company motion: staged entrances, scroll-responsive photographs and growing rules. Baseline remains readable. */
(() => {
  'use strict';
  const main = document.querySelector('main.co110');
  if (!main || main.__sunsonSelectedMotion122) return;
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const state = {active:false,media:null,dispose:null,topicDispose:null,frames:new Set()};
  main.__sunsonSelectedMotion122 = state;

  const candidates = [...main.querySelectorAll(
    '.co-introduction h2,.co-introduction>.co-prose,.co-reasons-heading,' +
    '.co-research-stage>.co-prose,.co-production-copy article,.co-evidence-grid>.co-prose,' +
    '.co-support-visual,.co-identity-grid>div'
  )];
  const modules = candidates.filter(el => !candidates.some(other => other !== el && other.contains(el)));
  const frames = [...main.querySelectorAll('.co-photo-frame')];
  const hero = [...main.querySelectorAll('.co-opening-copy>h1,.co-opening-copy>p,.co-opening-copy>.co-hero-action')];
  const owned = [...modules,...frames,...hero];
  const original = new Map(owned.map(el => [el,el.getAttribute('style')]));
  const restore = () => original.forEach((style,el) => {
    if (style === null) el.removeAttribute('style');
    else el.setAttribute('style',style);
  });

  const initialHash = location.hash;
  let initialTarget = null;
  try { initialTarget = initialHash ? document.getElementById(decodeURIComponent(initialHash.slice(1))) : null; }
  catch (_) { /* Malformed fragments remain native browser navigation. */ }
  if (initialTarget !== main && !main.contains(initialTarget)) initialTarget = null;
  let hashSettled = !initialTarget;
  let userActed = false;
  const intentEvents = ['wheel','touchstart','pointerdown','keydown'];
  const markIntent = () => { userActed = true; };
  const removeIntent = () => intentEvents.forEach(name => window.removeEventListener(name,markIntent,true));
  if (initialTarget) intentEvents.forEach(name => window.addEventListener(name,markIntent,{capture:true,passive:true}));
  const frame = callback => {
    const id = requestAnimationFrame(() => { state.frames.delete(id); callback(); });
    state.frames.add(id);
    return id;
  };

  function occupiedTop() {
    const header=document.querySelector('.np-header');
    return (header?Math.max(0,header.getBoundingClientRect().bottom):100)+12;
  }

  function installAnchorNavigation() {
    const header=document.querySelector('.np-header');
    const measure=()=>{main.style.setProperty('--ed-header-height',(header?header.getBoundingClientRect().height:100)+'px');};
    const click=event=>{
      const link=event.target.closest('a[href]');
      if(!link||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
      let url,target;
      try{url=new URL(link.href,location.href);target=document.getElementById(decodeURIComponent(url.hash.slice(1)));}catch(_){return;}
      if(url.origin!==location.origin||url.pathname!==location.pathname||!target||!main.contains(target)||!target.matches('.co-section'))return;
      event.preventDefault();userActed=true;measure();
      const next=new URL(location.href);next.hash=target.id;
      if(next.href!==location.href)history.pushState(history.state,'',next.href);
      window.scrollTo({top:Math.max(0,target.getBoundingClientRect().top+window.scrollY-occupiedTop()),behavior:'instant'});
      if(ScrollTrigger)ScrollTrigger.update();
    };
    const observer='ResizeObserver' in window?new ResizeObserver(measure):null;
    if(observer&&header)observer.observe(header);
    main.addEventListener('click',click,true);window.addEventListener('resize',measure,{passive:true});measure();
    state.topicDispose=()=>{main.removeEventListener('click',click,true);window.removeEventListener('resize',measure);if(observer)observer.disconnect();main.style.removeProperty('--ed-header-height');};
  }

  function correctInitialHash() {
    if (hashSettled) return;
    hashSettled = true;
    removeIntent();
    if (userActed || location.hash !== initialHash || !initialTarget.isConnected) return;
    const margin = parseFloat(getComputedStyle(initialTarget).scrollMarginTop) || 0;
    const offset = Math.max(margin,occupiedTop());
    const top = Math.max(0,initialTarget.getBoundingClientRect().top + window.scrollY - offset);
    if (Math.abs(window.scrollY - top) > 3) window.scrollTo({top,behavior:'instant'});
    if (ScrollTrigger) ScrollTrigger.update();
  }

  function start() {
    if (state.active) return;
    state.active = true;
    installAnchorNavigation();
    if (!gsap || !ScrollTrigger || !gsap.matchMedia) {
      main.dataset.coSelectedMotion = 'static';
      return;
    }
    try {
      gsap.registerPlugin(ScrollTrigger);
      state.media = gsap.matchMedia();
      state.media.add({
        reduced:'(prefers-reduced-motion: reduce)',
        desktop:'(min-width: 901px) and (hover: hover) and (pointer: fine)',
        mobile:'(max-width: 900px)'
      },context => {
        restore();
        if (context.conditions.reduced) {
          main.dataset.coSelectedMotion = 'reduced';
          return restore;
        }
        main.dataset.coSelectedMotion = 'enhanced';
        const tweens = new Set();
        const triggers = new Set();
        const played = new Set();
        const createdLines = [];
        const initiallyBelow = modules.filter(el => {
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0 && rect.top >= window.innerHeight;
        });
        const reveal = batch => {
          const targets = batch.filter(el => !played.has(el));
          if (!targets.length) return;
          targets.forEach(el => played.add(el));
          tweens.add(gsap.fromTo(targets,{opacity:.36,y:context.conditions.desktop ? 32 : 20},{
            opacity:1,y:0,duration:.9,stagger:.12,ease:'power3.out',
            overwrite:'auto',clearProps:'opacity,transform'
          }));
        };
        // Baseline remains fully visible, including all offscreen content.
        // Only the entrance callback applies this small, readable tonal change.
        if (initiallyBelow.length) ScrollTrigger.batch(initiallyBelow,{
          start:'top 87%',once:true,interval:.08,batchMax:3,
          onEnter:reveal,onEnterBack:reveal
        }).forEach(trigger => triggers.add(trigger));

        if (!initialHash && window.scrollY < 80 && hero.length) {
          tweens.add(gsap.fromTo(hero,{opacity:.3,y:32},{
            opacity:1,y:0,duration:1.05,stagger:.13,ease:'power3.out',
            overwrite:'auto',clearProps:'opacity,transform'
          }));
        }

        // Animate each photograph's inner frame; img remains free for CSS hover.
        if (context.conditions.desktop) frames.forEach(photoFrame => {
          const tween = gsap.fromTo(photoFrame,{scale:1.075,yPercent:2.5},{
            scale:1.045,yPercent:-1.6,ease:'none',immediateRender:false,
            scrollTrigger:{
              trigger:photoFrame.closest('.co-photo') || photoFrame,
              start:'top bottom',end:'bottom top',scrub:.75,
              invalidateOnRefresh:true,
              onRefresh:self=>{photoFrame.dataset.coParallaxStart=String(Math.round(self.start));photoFrame.dataset.coParallaxEnd=String(Math.round(self.end));}
            }
          });
          tweens.add(tween);
          if (tween.scrollTrigger) triggers.add(tween.scrollTrigger);
        });

        // These decorative rules add no reading content or layout height.
        main.querySelectorAll('.co-section h2').forEach(heading => {
          const line = document.createElement('span');
          line.className = 'co-motion-line';
          line.setAttribute('aria-hidden','true');
          heading.appendChild(line);
          createdLines.push(line);
          const animateLine = () => {
            tweens.add(gsap.fromTo(line,{scaleX:.08,opacity:.3},{
              scaleX:1,opacity:1,duration:1.05,ease:'power3.out',
              clearProps:'transform,opacity'
            }));
          };
          if (heading.getBoundingClientRect().top < window.innerHeight) animateLine();
          else triggers.add(ScrollTrigger.create({trigger:heading,start:'top 87%',once:true,onEnter:animateLine}));
        });

        const focus = event => {
          const module = modules.find(el => el.contains(event.target));
          if (!module) return;
          played.add(module);
          tweens.add(gsap.set(module,{opacity:1,y:0,overwrite:'auto',clearProps:'opacity,transform'}));
        };
        main.addEventListener('focusin',focus);
        let disposed = false;
        state.dispose = () => {
          if (disposed) return;
          disposed = true;
          main.removeEventListener('focusin',focus);
          triggers.forEach(trigger => trigger.kill());
          tweens.forEach(tween => tween.kill());
          createdLines.forEach(line => line.remove());
          restore();
        };
        return state.dispose;
      },main);
      // Finish synchronous registration before the one-time initial fragment correction.
      ScrollTrigger.refresh();
    } catch (_) {
      if (state.dispose) state.dispose();
      if (state.media) state.media.revert();
      restore();
      main.dataset.coSelectedMotion = 'static';
    }
  }

  function stop() {
    state.active = false;
    if (state.dispose) state.dispose();
    if (state.media) state.media.revert();
    if (state.topicDispose) state.topicDispose();
    state.media = null;
    state.dispose = null;
    state.topicDispose = null;
    state.frames.forEach(id => cancelAnimationFrame(id));
    state.frames.clear();
    removeIntent();
    restore();
  }
  state.init = start;
  state.destroy = stop;
  window.addEventListener('pagehide',stop);
  window.addEventListener('pageshow',event => { if (event.persisted) start(); });
  start();

  const loaded = document.readyState === 'complete' ? Promise.resolve()
    : new Promise(resolve => window.addEventListener('load',resolve,{once:true}));
  const fonts = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  Promise.all([loaded,fonts]).then(() => {
    if (!state.active) return;
    // No timer/polling loop: one post-resource refresh, then one fragment correction.
    frame(() => {
      if (ScrollTrigger) ScrollTrigger.refresh();
      frame(() => { correctInitialHash(); scheduleTopic(); });
    });
  });
})();
