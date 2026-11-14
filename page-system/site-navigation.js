/* Native links/details remain usable without animation or remote dependencies. */
(() => {
  const header = document.querySelector('[data-navigation-version="96"]');
  if (!header) return;
  const primary = [...header.querySelectorAll('.np-item')];
  const shade = document.querySelector('.np-shade');
  const toggle = header.querySelector('.np-mobile-toggle');
  const nav = header.querySelector('.np-links');
  const media = matchMedia('(max-width:1180px)');
  const phone = matchMedia('(max-width:767px)');
  const glyph = toggle.querySelector('path');
  const root = document.documentElement;
  function syncAuxiliaryRows() {
    // Separate the thresholds so small scroll reversals do not flicker.
    const threshold = root.classList.contains('np-aux-collapsed') ? 8 : 28;
    root.classList.toggle('np-aux-collapsed', !media.matches && window.scrollY > threshold);
  }
  // A shared product document can contain several model anchors. A pathname
  // match alone must not mark every model as the current location.
  const currentLinks = [...header.querySelectorAll('.np-links a[href], a.np-contact[href]')];
  const previewPages = new Map();
  const pagePath = path => {
    const canonical = previewPages.get(path) || path;
    return canonical.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
  };
  function syncCurrentLinks() {
    const here = new URL(location.href);
    const matches = [];
    currentLinks.forEach(link => {
      link.removeAttribute('aria-current');
      const target = new URL(link.href, here);
      if (target.origin !== here.origin || pagePath(target.pathname) !== pagePath(here.pathname)) return;
      if (target.hash && target.hash !== here.hash) return;
      matches.push({link, target});
    });
    const exact = matches.filter(item => item.target.hash);
    const candidates = exact.length ? exact : matches;
    const selected = candidates.find(item => item.link.classList.contains('np-direct')) || candidates[0];
    if (selected) selected.link.setAttribute('aria-current', selected.target.hash ? 'location' : 'page');
  }
  syncCurrentLinks();
  ['hashchange', 'popstate', 'pageshow'].forEach(event => addEventListener(event, syncCurrentLinks));
  function sync() {
    const drawerClosed = !header.classList.contains('np-mobile-open');
    nav.inert = phone.matches && drawerClosed;
    shade.inert = phone.matches && drawerClosed;
    shade.hidden = !phone.matches && (media.matches || !primary.some(item => item.open));
  }
  function closePanels() {
    primary.forEach(item => { item.open = false; });
    sync();
  }
  function closeMobile() {
    header.classList.remove('np-mobile-open');
    document.body.classList.remove('np-locked');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    glyph.setAttribute('d', 'M4 8h16M4 16h16');
    sync();
  }
  function closeAll() {
    if (!phone.matches) closePanels();
    closeMobile();
  }
  primary.forEach(item => item.addEventListener('toggle', () => {
    syncCurrentLinks();
    if (item.open) primary.filter(other => other !== item).forEach(other => { other.open = false; });
    sync();
  }));
  shade.addEventListener('click', () => {
    if (phone.matches) {
      closeAll();
      toggle.focus();
      return;
    }
    const open = primary.find(item => item.open);
    closePanels();
    if (open) open.querySelector('summary').focus();
  });
  header.querySelectorAll('.np-close').forEach(button => button.addEventListener('click', () => {
    const item = button.closest('.np-item');
    item.open = false;
    item.querySelector('summary').focus();
    sync();
  }));
  toggle.addEventListener('click', event => {
    const open = !header.classList.contains('np-mobile-open');
    if (!open) return closeAll();
    closePanels();
    header.classList.add('np-mobile-open');
    document.body.classList.add('np-locked');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation');
    glyph.setAttribute('d', 'M5 5l14 14M19 5L5 19');
    sync();
    if (media.matches && event.detail === 0) {
      nav.querySelector('.np-direct, .np-item > summary').focus({preventScroll:true});
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const nested = document.activeElement.closest('.np-mobile-sector[open]');
    const open = primary.find(item => item.open);
    if (nested && media.matches) {
      event.preventDefault();
      nested.open = false;
      nested.querySelector('summary').focus();
    } else if (open) {
      event.preventDefault();
      open.open = false;
      open.querySelector('summary').focus();
      sync();
    } else if (header.classList.contains('np-mobile-open')) {
      event.preventDefault();
      closeMobile();
      toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!header.contains(event.target) && !shade.contains(event.target)) closeAll();
  });
  document.addEventListener('focusin', event => {
    if (event.target !== document.body && !header.contains(event.target)) closeAll();
  });
  header.querySelectorAll('a').forEach(link => link.addEventListener('click', closeAll));
  header.querySelectorAll('[role="tablist"]').forEach(list => {
    const tabs = [...list.querySelectorAll('[role="tab"]')];
    function activate(tab, focus = false) {
      tabs.forEach(other => {
        const selected = other === tab;
        other.setAttribute('aria-selected', String(selected));
        other.tabIndex = selected ? 0 : -1;
        document.getElementById(other.getAttribute('aria-controls')).hidden = !selected;
      });
      if (focus) tab.focus();
    }
    tabs.forEach(tab => {
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', event => {
        let index = tabs.indexOf(tab);
        if (event.key === 'ArrowUp') index = (index + tabs.length - 1) % tabs.length;
        else if (event.key === 'ArrowDown') index = (index + 1) % tabs.length;
        else if (event.key === 'Home') index = 0;
        else if (event.key === 'End') index = tabs.length - 1;
        else return;
        event.preventDefault();
        activate(tabs[index], true);
      });
    });
  });
  media.addEventListener('change', closeAll);
  phone.addEventListener('change', closeAll);
  media.addEventListener('change', syncAuxiliaryRows);
  window.addEventListener('scroll', syncAuxiliaryRows, { passive: true });
  window.addEventListener('pageshow', syncAuxiliaryRows);
  syncAuxiliaryRows();
  header.classList.add('np-ready');
  sync();
})();
/* Native links remain crawlable; unconfirmed scope is not represented as a live business page. */
(() => {
 const header=document.querySelector('[data-navigation-version="96"]');
 if(!header)return;
 const mobile=matchMedia('(max-width:1180px)');
 const drilldown=matchMedia('(max-width:767px)');
 const fine=matchMedia('(hover:hover) and (pointer:fine)');
 const menus=[...header.querySelectorAll('.np-item-147')];
 const nav=header.querySelector('.np-links');
 const utility=header.querySelector('.np-utility');
 const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
 let menuAnimations=[];
 function animateMenuLevel(elements, direction){
  menuAnimations.forEach(animation=>animation.cancel());
  menuAnimations=[];
  if(!drilldown.matches || reduceMotion.matches || !header.classList.contains('np-mobile-open')) return;
  menuAnimations=Array.from(elements,element=>element.animate(
   [{transform:`translateX(${direction * 18}px)`, opacity:.25}, {transform:'translateX(0)', opacity:1}],
   {duration:280, easing:'cubic-bezier(.2,.65,.3,1)'}
  ));
 }
 function returnToCategories(menu){
  menu.classList.remove('np-category-view-147');
  nav.scrollTop=0;
  menu.querySelector('[role="tab"][aria-selected="true"]').focus({preventScroll:true});
  animateMenuLevel(menu.querySelectorAll('.np-intro-147, .np-category-tabs-147'),-1);
 }
 if(utility && nav){
  const utilityPosition=document.createComment('Utility navigation position');
  utility.before(utilityPosition);
  function placeUtility(){
   if(drilldown.matches) nav.append(utility);
   else utilityPosition.after(utility);
  }
  placeUtility();
  drilldown.addEventListener('change',placeUtility);
 }
 function categoryRoot(button){return button.closest('.np-item[data-menu="industries"]')}
 header.querySelectorAll('.np-category-tabs-147 [role="tab"]').forEach(tab=>{
  tab.addEventListener('click',()=>{
   if(drilldown.matches){
    const menu=categoryRoot(tab);menu.classList.add('np-category-view-147');
    const back=document.getElementById(tab.getAttribute('aria-controls')).querySelector('[data-category-back]');
    back.focus({preventScroll:true});
    nav.scrollTop=0;
    animateMenuLevel([back.closest('[role="tabpanel"]')],1);
   }
  });
  tab.addEventListener('pointerenter',()=>{if(fine.matches&&!mobile.matches)tab.click()});
 });
 header.querySelectorAll('[data-category-back]').forEach(back=>back.addEventListener('click',()=>returnToCategories(categoryRoot(back))));
 menus.forEach(menu=>{
  const summary=menu.querySelector('summary');
  const panel=menu.querySelector('.np-panel-147 > .np-inner');
  const back=document.createElement('button');
  back.type='button';
  back.className='np-menu-back';
  back.textContent='Back to main menu';
  back.addEventListener('click',()=>{
   menu.open=false;
   menu.classList.remove('np-category-view-147');
   nav.scrollTop=0;
   summary.focus({preventScroll:true});
  });
  panel?.prepend(back);
  menu.addEventListener('toggle',()=>{
   if(!menu.open){
    menu.classList.remove('np-category-view-147');
    if(!menus.some(item=>item.open)) animateMenuLevel(nav.children,-1);
   }
   else if(drilldown.matches && header.classList.contains('np-mobile-open')){
    nav.scrollTop=0;
    back.focus({preventScroll:true});
    animateMenuLevel([panel],1);
   }
  });
  menu.addEventListener('pointerenter',()=>{if(fine.matches&&!mobile.matches)menu.open=true});
  summary.addEventListener('click',event=>{
   if(event.detail>0&&fine.matches&&!mobile.matches){event.preventDefault();menu.open=true}
  });
 });
 header.querySelectorAll('.np-links>.np-direct').forEach(a=>a.addEventListener('pointerenter',()=>{
  if(fine.matches&&!mobile.matches)menus.forEach(m=>m.open=false);
 }));
 document.addEventListener('keydown',event=>{
  const current=header.querySelector('.np-category-view-147[open]');
  if(event.key==='Escape'&&drilldown.matches&&current){
   event.preventDefault();event.stopImmediatePropagation();
   returnToCategories(current);
  }
 },true);
 mobile.addEventListener('change',()=>menus.forEach(m=>m.classList.remove('np-category-view-147')));
 drilldown.addEventListener('change',()=>menus.forEach(m=>m.classList.remove('np-category-view-147')));
})();
