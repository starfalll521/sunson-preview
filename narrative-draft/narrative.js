document.querySelectorAll('[data-carousel]').forEach(root=>{
  const slides=[...root.querySelectorAll('.slide')],controls=root.querySelector('.carousel-controls');let index=0;
  const show=()=>{slides.forEach((slide,i)=>slide.hidden=i!==index);root.querySelector('[data-count]').textContent=`${index+1} / ${slides.length}`;};
  root.classList.add('enhanced');controls.hidden=false;
  root.querySelector('[data-prev]').addEventListener('click',()=>{index=(index-1+slides.length)%slides.length;show();});
  root.querySelector('[data-next]').addEventListener('click',()=>{index=(index+1)%slides.length;show();});
  show();
});
const header=document.querySelector('.site-header'),menu=document.querySelector('.menu-toggle');
if(header&&menu){
function closeMenu(){header.classList.remove('nav-open');menu.setAttribute('aria-expanded','false');document.querySelectorAll('.nav-group').forEach(x=>x.open=false);}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';header.classList.toggle('nav-open',open);menu.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('.nav-group').forEach(group=>group.addEventListener('toggle',()=>{if(group.open)document.querySelectorAll('.nav-group').forEach(other=>{if(other!==group)other.open=false;});}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'){const wasOpen=header.classList.contains('nav-open');closeMenu();if(wasOpen)menu.focus();}});
document.addEventListener('click',event=>{if(!header.contains(event.target))closeMenu();});

header.classList.add('nav-ready');

}
