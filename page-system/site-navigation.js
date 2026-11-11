/* Native links/details remain usable without animation or remote dependencies. */
(() => {
  const header = document.querySelector('[data-navigation-version="96"]');
  if (!header) return;
  const primary = [...header.querySelectorAll('.np-item')];
  const shade = document.querySelector('.np-shade');
  const toggle = header.querySelector('.np-mobile-toggle');
  const nav = header.querySelector('.np-links');
  const media = matchMedia('(max-width:1439px)');
  const glyph = toggle.querySelector('path');
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
    shade.hidden = media.matches || !primary.some(item => item.open);
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
  }
  function closeAll() {
    closePanels();
    closeMobile();
  }
  primary.forEach(item => item.addEventListener('toggle', () => {
    syncCurrentLinks();
    if (item.open) primary.filter(other => other !== item).forEach(other => { other.open = false; });
    sync();
  }));
  shade.addEventListener('click', () => {
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
    header.classList.add('np-mobile-open');
    document.body.classList.add('np-locked');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation');
    glyph.setAttribute('d', 'M5 5l14 14M19 5L5 19');
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
  header.classList.add('np-ready');
  sync();
})();
/* Native links remain crawlable; unconfirmed scope is not represented as a live business page. */
(() => {
 const header=document.querySelector('[data-navigation-version="96"]');
 if(!header)return;
 const mobile=matchMedia('(max-width:1439px)');
 const fine=matchMedia('(hover:hover) and (pointer:fine)');
 const menus=[...header.querySelectorAll('.np-item-147')];
 function categoryRoot(button){return button.closest('.np-item[data-menu="industries"]')}
 header.querySelectorAll('.np-category-tabs-147 [role="tab"]').forEach(tab=>{
  tab.addEventListener('click',()=>{
   if(mobile.matches){
    const menu=categoryRoot(tab);menu.classList.add('np-category-view-147');
    const back=document.getElementById(tab.getAttribute('aria-controls')).querySelector('[data-category-back]');
    back.focus({preventScroll:true});header.querySelector('.np-links').scrollTop=0;
   }
  });
  tab.addEventListener('pointerenter',()=>{if(fine.matches&&!mobile.matches)tab.click()});
 });
 header.querySelectorAll('[data-category-back]').forEach(back=>back.addEventListener('click',()=>{
  const menu=categoryRoot(back);menu.classList.remove('np-category-view-147');
  menu.querySelector('[role="tab"][aria-selected="true"]').focus({preventScroll:true});
 }));
 menus.forEach(menu=>{
  menu.addEventListener('toggle',()=>{if(!menu.open)menu.classList.remove('np-category-view-147')});
  menu.addEventListener('pointerenter',()=>{if(fine.matches&&!mobile.matches)menu.open=true});
  menu.querySelector('summary').addEventListener('click',event=>{
   if(event.detail>0&&fine.matches&&!mobile.matches){event.preventDefault();menu.open=true}
  });
 });
 header.querySelectorAll('.np-links>.np-direct').forEach(a=>a.addEventListener('pointerenter',()=>{
  if(fine.matches&&!mobile.matches)menus.forEach(m=>m.open=false);
 }));
 document.addEventListener('keydown',event=>{
  const current=header.querySelector('.np-category-view-147[open]');
  if(event.key==='Escape'&&mobile.matches&&current){
   event.preventDefault();event.stopImmediatePropagation();current.classList.remove('np-category-view-147');
   current.querySelector('[role="tab"][aria-selected="true"]').focus({preventScroll:true});
  }
 },true);
 mobile.addEventListener('change',()=>menus.forEach(m=>m.classList.remove('np-category-view-147')));
})();
