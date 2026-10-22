/* Native links and details remain usable without animation or remote dependencies. */
(()=>{
const header=document.querySelector('[data-navigation-version="93"]');if(!header)return;
const toggle=header.querySelector('.sn-toggle'),nav=header.querySelector('.sn-links'),groups=[...nav.querySelectorAll('.sn-dropdown')],mobile=matchMedia('(max-width:1023px)');
const close=(restore=false)=>{header.classList.remove('sn-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');toggle.querySelector('path').setAttribute('d','M4 8h16M4 16h16');groups.forEach(g=>g.open=false);if(restore)toggle.focus();};
toggle.addEventListener('click',()=>{if(header.classList.contains('sn-open'))return close();header.classList.add('sn-open');toggle.setAttribute('aria-expanded','true');toggle.setAttribute('aria-label','Close navigation');toggle.querySelector('path').setAttribute('d','M5 5l14 14M19 5L5 19');});
groups.forEach(group=>group.addEventListener('toggle',()=>{if(group.open)groups.forEach(other=>{if(other!==group)other.open=false;});}));
header.addEventListener('keydown',event=>{if(event.key!=='Escape')return;event.preventDefault();const open=groups.find(g=>g.open);if(open){open.open=false;open.querySelector('summary').focus();}else if(header.classList.contains('sn-open'))close(true);});
document.addEventListener('click',event=>{if(!header.contains(event.target))close();});
document.addEventListener('focusin',event=>{if(event.target!==document.body&&!header.contains(event.target))close();});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>close()));
mobile.addEventListener('change',()=>close());header.classList.add('sn-ready');
})();
