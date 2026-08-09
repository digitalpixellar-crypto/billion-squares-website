const m=document.querySelector('.menu'),n=document.querySelector('.nav');
if(m&&n)m.addEventListener('click',()=>{const open=n.classList.toggle('open');m.setAttribute('aria-expanded',open?'true':'false');m.textContent=open?'✕':'☰';});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{n?.classList.remove('open');if(m){m.textContent='☰';m.setAttribute('aria-expanded','false')}}));
const f=document.querySelector('#leadForm');
if(f)f.addEventListener('submit',e=>{
 e.preventDefault();
 const data=new FormData(f);
 const msg=`Hello Billion Squares,%0A%0AName: ${encodeURIComponent(data.get('name')||'')}%0APhone: ${encodeURIComponent(data.get('phone')||'')}%0AEmail: ${encodeURIComponent(data.get('email')||'')}%0AInterested in: ${encodeURIComponent(data.get('project')||'')}%0AMessage: ${encodeURIComponent(data.get('message')||'')}%0A%0ASent from billionsquares.com`;
 window.open(`https://wa.me/918125125055?text=${msg}`,'_blank','noopener');
});
