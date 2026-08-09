
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


(function(){
  const corridor=document.getElementById("corridor");
  const budgetSlider=document.getElementById("investmentBudget");
  const budgetDisplay=document.getElementById("budgetDisplay");
  const corridorHint=document.getElementById("corridorHint");
  const periodButtons=document.querySelectorAll(".period-pill");
  const futureValueElement=document.getElementById("futureValue");
  const growthPercentageElement=document.getElementById("growthPercentage");
  const monthlyGrowthElement=document.getElementById("monthlyGrowth");
  const annualRateElement=document.getElementById("annualRate");
  const holdingPeriodElement=document.getElementById("holdingPeriod");
  const yearsBadge=document.getElementById("yearsBadge");
  const todayValue=document.getElementById("todayValue");
  const projectedValueSmall=document.getElementById("projectedValueSmall");
  const growthFill=document.getElementById("growthFill");
  const investmentReportBtn=document.getElementById("investmentReportBtn");
  if(!corridor||!budgetSlider) return;

  let selectedYears=5;
  const corridorNames={"22":"Chandanvelly SEZ Corridor","18":"Patancheru / Mumbai Highway","16":"Sadashivpet NH-65 Belt"};

  function formatBudget(lakhs){return lakhs>=100?"₹1 Crore":`₹${lakhs} Lakhs`;}
  function formatRupees(value){return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(value);}
  function updateSliderFill(){
    const min=Number(budgetSlider.min),max=Number(budgetSlider.max),value=Number(budgetSlider.value);
    const pct=((value-min)/(max-min))*100;
    budgetSlider.style.background=`linear-gradient(to right,#fe5a02 0%,#fe5a02 ${pct}%,#e2e1dc ${pct}%,#e2e1dc 100%)`;
  }
  function updateWhatsAppCTA(budget,rate,futureValue,percentageGrowth){
    const selectedCorridor=corridorNames[corridor.value];
    const message=`Hello Billion Squares,

I used the Hyderabad Land Investment & Value Growth Calculator on your website.

Target Corridor: ${selectedCorridor}
Investment Budget: ₹${budget} Lakhs
Holding Period: ${selectedYears} Years
Illustrative Annual Growth: ${rate}%
Estimated Future Value: ₹${futureValue.toFixed(2)} Lakhs
Estimated Total Growth: +${percentageGrowth.toFixed(1)}%

Please send me a detailed investment report and suitable property opportunities for this budget.`;
    investmentReportBtn.href=`https://wa.me/918125125055?text=${encodeURIComponent(message)}`;
  }
  function calculateInvestment(){
    const principal=Number(budgetSlider.value);
    const ratePct=Number(corridor.value);
    const rate=ratePct/100;
    const fv=principal*Math.pow(1+rate,selectedYears);
    const gain=fv-principal;
    const pct=((fv/principal)-1)*100;
    const monthly=(gain*100000)/(selectedYears*12);

    budgetDisplay.textContent=formatBudget(principal);
    corridorHint.textContent=`Illustrative annual appreciation assumption: ${ratePct}%`;
    futureValueElement.textContent=fv.toFixed(2);
    growthPercentageElement.textContent=`+${pct.toFixed(1)}%`;
    monthlyGrowthElement.textContent=formatRupees(monthly);
    annualRateElement.textContent=`${ratePct}%`;
    holdingPeriodElement.textContent=`${selectedYears} Years`;
    yearsBadge.textContent=`${selectedYears} YEAR OUTLOOK`;
    todayValue.textContent=`₹${principal}L`;
    projectedValueSmall.textContent=`₹${fv.toFixed(2)}L`;
    growthFill.style.width=`${Math.min(100,30+pct*.30)}%`;
    updateWhatsAppCTA(principal,ratePct,fv,pct);
    updateSliderFill();
  }

  budgetSlider.addEventListener("input",calculateInvestment);
  corridor.addEventListener("change",calculateInvestment);
  periodButtons.forEach(btn=>btn.addEventListener("click",function(){
    selectedYears=Number(this.dataset.years);
    periodButtons.forEach(x=>{x.classList.remove("active");x.setAttribute("aria-checked","false");});
    this.classList.add("active");this.setAttribute("aria-checked","true");calculateInvestment();
  }));
  calculateInvestment();
})();
