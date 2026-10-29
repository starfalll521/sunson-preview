/* Native links remain crawlable; unconfirmed scope is not represented as a live business page. */
(() => {
 const header=document.querySelector('[data-navigation-version="96"]');
 if(!header)return;
 const mobile=matchMedia('(max-width:1279px)');
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
