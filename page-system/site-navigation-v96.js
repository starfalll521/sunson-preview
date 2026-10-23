/* Native links/details remain usable without animation or remote dependencies. */
(() => {
  const header = document.querySelector('[data-navigation-version="96"]');
  if (!header) return;
  const primary = [...header.querySelectorAll('.np-item')];
  const shade = document.querySelector('.np-shade');
  const toggle = header.querySelector('.np-mobile-toggle');
  const nav = header.querySelector('.np-links');
  const media = matchMedia('(max-width:1180px)');
  const glyph = toggle.querySelector('path');
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
  toggle.addEventListener('click', () => {
    const open = !header.classList.contains('np-mobile-open');
    if (!open) return closeAll();
    header.classList.add('np-mobile-open');
    document.body.classList.add('np-locked');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation');
    glyph.setAttribute('d', 'M5 5l14 14M19 5L5 19');
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
