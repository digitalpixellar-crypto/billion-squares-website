
(function(){
  const intro = document.getElementById('brandIntro');
  if(!intro) return;

  const seen = sessionStorage.getItem('bsBrandIntroSeen');
  if(seen){
    intro.remove();
    return;
  }

  document.body.classList.add('intro-lock');

  window.addEventListener('load', ()=>{
    setTimeout(()=>{
      intro.classList.add('is-leaving');
      document.body.classList.remove('intro-lock');
      sessionStorage.setItem('bsBrandIntroSeen','1');
      setTimeout(()=>intro.remove(),850);
    }, 2050);
  });
})();


const b=document.querySelector('.menu-btn'), m=document.querySelector('.mobile-menu');
if(b&&m) b.addEventListener('click',()=>{const open=m.classList.toggle('open');b.setAttribute('aria-expanded',open?'true':'false')});
document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>m?.classList.remove('open')));
const f=document.querySelector('#leadForm');
if(f) f.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(f);const msg=`Hello Billion Squares,%0A%0AName: ${encodeURIComponent(d.get('name')||'')}%0APhone: ${encodeURIComponent(d.get('phone')||'')}%0AEmail: ${encodeURIComponent(d.get('email')||'')}%0AProject: ${encodeURIComponent(d.get('project')||'')}%0AMessage: ${encodeURIComponent(d.get('message')||'')}`;window.open(`https://wa.me/918125125055?text=${msg}`,'_blank')});
