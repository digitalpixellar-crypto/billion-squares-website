
(function(){
 const intro=document.getElementById('brandIntro');
 if(intro){
   const seen=sessionStorage.getItem('bsIntroV6');
   if(seen) intro.remove();
   else {
     document.body.classList.add('intro-lock');
     window.addEventListener('load',()=>setTimeout(()=>{
       intro.classList.add('is-leaving');
       document.body.classList.remove('intro-lock');
       sessionStorage.setItem('bsIntroV6','1');
       setTimeout(()=>intro.remove(),800);
     },1900));
   }
 }
 const btn=document.querySelector('.menu-btn'), menu=document.querySelector('.mobile-nav');
 if(btn&&menu) btn.addEventListener('click',()=>{const o=menu.classList.toggle('open');btn.setAttribute('aria-expanded',o?'true':'false')});
 document.querySelectorAll('.mobile-nav a').forEach(a=>a.addEventListener('click',()=>menu?.classList.remove('open')));
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in-view')}),{threshold:.12});
 document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
 const form=document.getElementById('leadForm');
 if(form) form.addEventListener('submit',e=>{
   e.preventDefault(); const d=new FormData(form);
   const msg=`Hello Billion Squares,%0A%0AName: ${encodeURIComponent(d.get('name')||'')}%0APhone: ${encodeURIComponent(d.get('phone')||'')}%0AEmail: ${encodeURIComponent(d.get('email')||'')}%0AProject: ${encodeURIComponent(d.get('project')||'')}%0AMessage: ${encodeURIComponent(d.get('message')||'')}`;
   window.open(`https://wa.me/918125125055?text=${msg}`,'_blank');
 });
})();
