const header=document.querySelector('.header');
const menu=document.querySelector('.menu');
const nav=document.querySelector('#navigation');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>180),{passive:true});
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
document.querySelectorAll('.accordion button').forEach(button=>button.addEventListener('click',()=>{const article=button.parentElement;const wasOpen=article.classList.contains('open');document.querySelectorAll('.accordion article').forEach(item=>{item.classList.remove('open');item.querySelector('button b').textContent='+'});if(!wasOpen){article.classList.add('open');button.querySelector('b').textContent='−'}}));
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.12});document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));
