(() => {
  'use strict';
  if (!document.querySelector('main.co110,main.mq110')) return;
  const entries = [...document.querySelectorAll('main .source-topic-nav a[href]')]
    .map(link => {
      const url = new URL(link.href, location.href);
      return url.pathname === location.pathname && url.hash
        ? {link, section:document.getElementById(decodeURIComponent(url.hash.slice(1)))} : null;
    }).filter(item => item && item.section);
  const setCurrent = id => entries.forEach(({link,section}) => {
    if (section.id === id) link.setAttribute('aria-current','location');
    else link.removeAttribute('aria-current');
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(changes => {
      const visible = changes.filter(item => item.isIntersecting)
        .sort((a,b) => a.boundingClientRect.top-b.boundingClientRect.top);
      if (visible[0]) setCurrent(visible[0].target.id);
    },{rootMargin:'-20% 0px -60% 0px',threshold:0});
    entries.forEach(({section}) => observer.observe(section));
  }
  entries.forEach(({link,section}) => link.addEventListener('click',() => setCurrent(section.id)));
})();
