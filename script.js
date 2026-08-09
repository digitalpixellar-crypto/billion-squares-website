
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


/* ===== V6.3 GROWTH CORRIDOR EXPLORER ===== */
(function(){
  const tabs=document.querySelectorAll(".corridor-tab");
  if(!tabs.length) return;

  const data={
    chandanvelly:{
      number:"01",label:"CHANDANVELLY SEZ CORRIDOR",title:"Industrial growth + data infrastructure corridor",
      description:"A developing investment belt influenced by industrial activity, logistics, manufacturing and large-scale data infrastructure.",
      landmarks:[
        ["Financial District","Approx. 48 km","~60–75 min"],
        ["ORR Exit 3 / TSPA","Approx. 36 km","~45–55 min"],
        ["Rajiv Gandhi International Airport","Approx. 44 km","~50–65 min"]
      ],
      drivers:[
        ["Amazon Data Center ecosystem","Large-scale digital infrastructure investment in the broader corridor."],
        ["Chandanvelly Industrial SEZ","Industrial and manufacturing activity supporting employment-led growth."],
        ["Regional Ring Road influence","Long-term regional connectivity catalyst for western/south-western belts."]
      ],
      approval:"Gated Farm Plots",approvalText:"Selected farm-layout opportunities with project-specific registration and development terms."
    },
    patancheru:{
      number:"02",label:"PATANCHERU CORRIDOR",title:"Established west-Hyderabad employment & logistics belt",
      description:"A mature western growth corridor supported by industrial employment, ORR access and expanding residential demand.",
      landmarks:[
        ["Financial District","Approx. 30 km","~40–50 min"],
        ["ORR Exit / Kokapet side","Approx. 25 km","~35–45 min"],
        ["Rajiv Gandhi International Airport","Approx. 52 km","~60–75 min"]
      ],
      drivers:[
        ["Industrial employment base","Long-established manufacturing and industrial ecosystem."],
        ["ORR connectivity","Strong access toward Gachibowli, Kokapet and major employment districts."],
        ["Residential expansion","Steady housing and plotted-development demand across west Hyderabad."]
      ],
      approval:"Spot Registration / Open Plots",approvalText:"Project-specific plotted opportunities where registration status and layout approvals must be verified individually."
    },
    sadashivpet:{
      number:"03",label:"SADASHIVPET NH-65 BELT",title:"Affordable plotted-growth corridor on NH-65",
      description:"A plotted-development belt benefiting from highway connectivity, industrial spillover and long-term regional expansion.",
      landmarks:[
        ["Financial District","Approx. 65 km","~75–90 min"],
        ["Patancheru","Approx. 38 km","~40–50 min"],
        ["Rajiv Gandhi International Airport","Approx. 86 km","~95–115 min"]
      ],
      drivers:[
        ["NH-65 connectivity","Direct Hyderabad–Mumbai highway access supports movement and visibility."],
        ["RRR planning influence","Regional Ring Road planning is a long-term connectivity catalyst."],
        ["Industrial spillover","Growth from Sangareddy, Patancheru and surrounding industrial clusters."]
      ],
      approval:"DTCP Approved Villa Plots",approvalText:"Selected projects may offer DTCP-approved villa plots; approvals should be verified from official project documents."
    },
    mumbai:{
      number:"04",label:"MUMBAI HIGHWAY CORRIDOR",title:"High-visibility investment spine connecting west Hyderabad",
      description:"A broad investment corridor linking established western Hyderabad with Patancheru, Sangareddy and emerging plotted markets.",
      landmarks:[
        ["Financial District","Approx. 35–70 km","~45–90 min"],
        ["ORR West Access","Approx. 20–45 km","~30–60 min"],
        ["Rajiv Gandhi International Airport","Approx. 55–90 km","~65–120 min"]
      ],
      drivers:[
        ["NH-65 / Mumbai Highway","Primary regional mobility spine connecting major western investment belts."],
        ["Industrial SEZs","Multiple manufacturing, warehousing and employment clusters along the corridor."],
        ["RRR & regional connectivity","Future road infrastructure may support broader corridor accessibility."]
      ],
      approval:"Mixed Plot Formats",approvalText:"The corridor includes DTCP layouts, open plots and project-specific registration formats. Verify each project independently."
    }
  };

  const $=id=>document.getElementById(id);
  function render(key){
    const d=data[key];
    $("corridorNumber").textContent=d.number;
    $("corridorLabel").textContent=d.label;
    $("corridorTitle").textContent=d.title;
    $("corridorDescription").textContent=d.description;
    $("approvalTitle").textContent=d.approval;
    $("approvalDescription").textContent=d.approvalText;
    $("landmarkList").innerHTML=d.landmarks.map(x=>`<div class="landmark-row"><span>${x[0]}</span><div><b>${x[1]}</b><small>${x[2]}</small></div></div>`).join("");
    $("driverList").innerHTML=d.drivers.map(x=>`<div class="driver-item"><i class="driver-dot"></i><div><b>${x[0]}</b><p>${x[1]}</p></div></div>`).join("");
  }
  tabs.forEach(tab=>tab.addEventListener("click",()=>{
    tabs.forEach(t=>{t.classList.remove("active");t.setAttribute("aria-selected","false")});
    tab.classList.add("active");tab.setAttribute("aria-selected","true");
    render(tab.dataset.corridor);
  }));
  render("chandanvelly");
})();

/* ===== V6.3 TELANGANA LAND UNIT CONVERTER ===== */
(function(){
  const sqy=document.getElementById("unitSqYds"),g=document.getElementById("unitGuntas"),a=document.getElementById("unitAcres"),sf=document.getElementById("unitSqFt"),reset=document.getElementById("resetConverter");
  if(!sqy) return;
  let updating=false;
  function fmt(n,max=4){if(!Number.isFinite(n)) return ""; return parseFloat(n.toFixed(max)).toString();}
  function fromSqYds(v,source){
    if(updating) return; updating=true;
    const sqYds=Number(v)||0;
    if(source!=="sqy") sqy.value=fmt(sqYds,4);
    if(source!=="g") g.value=fmt(sqYds/121,4);
    if(source!=="a") a.value=fmt(sqYds/4840,6);
    if(source!=="sf") sf.value=fmt(sqYds*9,2);
    updating=false;
  }
  sqy.addEventListener("input",()=>fromSqYds(sqy.value,"sqy"));
  g.addEventListener("input",()=>fromSqYds((Number(g.value)||0)*121,"g"));
  a.addEventListener("input",()=>fromSqYds((Number(a.value)||0)*4840,"a"));
  sf.addEventListener("input",()=>fromSqYds((Number(sf.value)||0)/9,"sf"));
  reset.addEventListener("click",()=>{sqy.value=242;fromSqYds(242,"sqy")});
  fromSqYds(242,"sqy");
})();

/* ===== V6.3 SITE VISIT BOOKING MODAL ===== */
(function(){
  const modal=document.getElementById("siteVisitModal");
  if(!modal) return;
  const triggers=document.querySelectorAll("[data-open-booking]");
  const closeEls=modal.querySelectorAll("[data-close-booking]");
  const steps=[...modal.querySelectorAll("[data-booking-step]")];
  const indicators=[...modal.querySelectorAll("[data-step-indicator]")];
  const back=document.getElementById("bookingBack"),next=document.getElementById("bookingNext"),submit=document.getElementById("bookingSubmit");
  const form=document.getElementById("siteVisitForm");
  let step=1;

  const today=new Date(); today.setMinutes(today.getMinutes()-today.getTimezoneOffset());
  document.getElementById("bookingDate").min=today.toISOString().split("T")[0];

  function openModal(e){if(e)e.preventDefault();modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";show(1)}
  function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow=""}
  function show(n){
    step=n;
    steps.forEach(s=>s.classList.toggle("active",Number(s.dataset.bookingStep)===n));
    indicators.forEach(i=>{const k=Number(i.dataset.stepIndicator);i.classList.toggle("active",k===n);i.classList.toggle("done",k<n)});
    back.style.display=n>1?"inline-flex":"none";
    next.style.display=n<3?"inline-flex":"none";
    submit.style.display=n===3?"inline-flex":"none";
    if(n===3){
      const date=document.getElementById("bookingDate").value||"Not selected";
      document.getElementById("bookingSummary").innerHTML=`<b>Visit summary</b><br>${document.getElementById("bookingCorridor").value} · ${date} · ${document.getElementById("bookingTransport").value}`;
    }
  }
  triggers.forEach(t=>t.addEventListener("click",openModal));
  closeEls.forEach(x=>x.addEventListener("click",closeModal));
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&modal.classList.contains("open"))closeModal()});

  modal.querySelectorAll("[data-booking-corridor]").forEach(btn=>btn.addEventListener("click",()=>{
    modal.querySelectorAll("[data-booking-corridor]").forEach(x=>x.classList.remove("active"));btn.classList.add("active");document.getElementById("bookingCorridor").value=btn.dataset.bookingCorridor;
  }));
  modal.querySelectorAll("[data-booking-transport]").forEach(btn=>btn.addEventListener("click",()=>{
    modal.querySelectorAll("[data-booking-transport]").forEach(x=>x.classList.remove("active"));btn.classList.add("active");document.getElementById("bookingTransport").value=btn.dataset.bookingTransport;
  }));
  next.addEventListener("click",()=>{
    if(step===2&&!document.getElementById("bookingDate").value){document.getElementById("bookingDate").reportValidity();return;}
    show(Math.min(3,step+1));
  });
  back.addEventListener("click",()=>show(Math.max(1,step-1)));
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const name=document.getElementById("bookingName"),phone=document.getElementById("bookingPhone"),date=document.getElementById("bookingDate");
    if(!name.value.trim()){name.reportValidity();return}
    if(!phone.value.trim()){phone.reportValidity();return}
    const msg=`Hello Billion Squares,

I would like to book a 1:1 site visit.

Corridor: ${document.getElementById("bookingCorridor").value}
Preferred Date: ${date.value}
Transport: ${document.getElementById("bookingTransport").value}

Name: ${name.value.trim()}
WhatsApp Number: ${phone.value.trim()}

Please confirm the site visit schedule.`;
    window.open(`https://wa.me/918125125055?text=${encodeURIComponent(msg)}`,"_blank");
    closeModal();
  });
})();


/* ===== V6.4 FAQ ACCORDION ===== */
(function(){
  const items=[...document.querySelectorAll(".faq-item")];
  if(!items.length) return;

  items.forEach(item=>{
    const button=item.querySelector(".faq-question");
    button.addEventListener("click",()=>{
      const isOpen=item.classList.contains("active");

      items.forEach(other=>{
        other.classList.remove("active");
        const otherBtn=other.querySelector(".faq-question");
        if(otherBtn) otherBtn.setAttribute("aria-expanded","false");
      });

      if(!isOpen){
        item.classList.add("active");
        button.setAttribute("aria-expanded","true");
      }
    });
  });
})();


/* ===== V6.5 SRI NILAYAM MASTER PLOT INVENTORY ===== */
(function(){
 const data=[{"phase":"Phase 1","plot":1,"extent":312.0,"facing":"North-West","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 1","plot":2,"extent":218.0,"facing":"West","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 1","plot":3,"extent":205.0,"facing":"West","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 1","plot":4,"extent":244.0,"facing":"West","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 1","plot":5,"extent":313.0,"facing":"North-East","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 1","plot":6,"extent":183.0,"facing":"East","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":7,"extent":183.0,"facing":"East","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":8,"extent":183.0,"facing":"East","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":9,"extent":183.0,"facing":"East","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":10,"extent":183.0,"facing":"East","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":11,"extent":183.0,"facing":"East","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":12,"extent":183.0,"facing":"East","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":13,"extent":183.0,"facing":"East","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":14,"extent":175.0,"facing":"South-East","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":15,"extent":179.0,"facing":"South-West","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":16,"extent":183.0,"facing":"West","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":17,"extent":183.0,"facing":"West","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":18,"extent":183.0,"facing":"West","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":19,"extent":183.0,"facing":"West","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":20,"extent":183.0,"facing":"West","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":21,"extent":183.0,"facing":"West","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":22,"extent":183.0,"facing":"West","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":23,"extent":183.0,"facing":"West","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":24,"extent":260.0,"facing":"North-West","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 1","plot":25,"extent":359.0,"facing":"North-East","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 1","plot":26,"extent":183.0,"facing":"East","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":27,"extent":183.0,"facing":"East","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":28,"extent":183.0,"facing":"East","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":29,"extent":183.0,"facing":"East","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":30,"extent":183.0,"facing":"East","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":31,"extent":183.0,"facing":"East","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":32,"extent":183.0,"facing":"East","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":33,"extent":175.0,"facing":"South-East","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 1","plot":34,"extent":179.0,"facing":"South-West","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 1","plot":35,"extent":183.0,"facing":"West","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":36,"extent":183.0,"facing":"West","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":37,"extent":183.0,"facing":"West","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":38,"extent":183.0,"facing":"West","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":39,"extent":183.0,"facing":"West","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":40,"extent":183.0,"facing":"West","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":41,"extent":183.0,"facing":"West","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":42,"extent":305.0,"facing":"North-East","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 1","plot":43,"extent":1299.0,"facing":"North-West","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 1","plot":44,"extent":638.0,"facing":"East","status":"Available","plotSize":"115'0\" X 50'0\""},{"phase":"Phase 1","plot":45,"extent":638.0,"facing":"East","status":"Reserved","plotSize":"115'0\" X 50'0\""},{"phase":"Phase 1","plot":46,"extent":638.0,"facing":"East","status":"Reserved","plotSize":"115'0\" X 50'0\""},{"phase":"Phase 1","plot":47,"extent":329.0,"facing":"South-East","status":"Reserved","plotSize":"65'0\" X 47'0\""},{"phase":"Phase 1","plot":48,"extent":259.0,"facing":"South","status":"Reserved","plotSize":"47'0\" X 50'0\""},{"phase":"Phase 1","plot":49,"extent":259.0,"facing":"South","status":"Reserved","plotSize":"47'0\" X 50'0\""},{"phase":"Phase 1","plot":50,"extent":259.0,"facing":"South-West","status":"Reserved","plotSize":"47'0\" X 50'0\""},{"phase":"Phase 1","plot":51,"extent":639.0,"facing":"West","status":"Reserved","plotSize":"115'0\" X 50'0\""},{"phase":"Phase 1","plot":52,"extent":639.0,"facing":"West","status":"Available","plotSize":"115'0\" X 50'0\""},{"phase":"Phase 1","plot":53,"extent":639.0,"facing":"West","status":"Available","plotSize":"115'0\" X 50'0\""},{"phase":"Phase 1","plot":54,"extent":1019.0,"facing":"North-West","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 1","plot":55,"extent":319.0,"facing":"North-East","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 1","plot":56,"extent":272.0,"facing":"East","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 1","plot":57,"extent":342.0,"facing":"East","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 1","plot":58,"extent":367.0,"facing":"East","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 1","plot":59,"extent":183.0,"facing":"East","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":60,"extent":178.0,"facing":"South-East","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":61,"extent":179.0,"facing":"West","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":62,"extent":179.0,"facing":"West","status":"Available","plotSize":"50'0\" X 33'0\""},{"phase":"Phase 1","plot":63,"extent":96.0,"facing":"South-East","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 2","plot":1,"extent":428.48,"facing":"West","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 2","plot":2,"extent":467.03,"facing":"West","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 2","plot":3,"extent":479.27,"facing":"West","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 2","plot":4,"extent":582.43,"facing":"West","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 2","plot":5,"extent":704.85,"facing":"West","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 2","plot":6,"extent":707.44,"facing":"South-West","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 2","plot":7,"extent":568.77,"facing":"South-East","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 2","plot":8,"extent":474.75,"facing":"North-West","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 2","plot":9,"extent":null,"facing":"West","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 2","plot":10,"extent":null,"facing":"East","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 2","plot":11,"extent":212.0,"facing":"East","status":"Available","plotSize":"36'0'' X 53'0''"},{"phase":"Phase 2","plot":12,"extent":212.0,"facing":"East","status":"Available","plotSize":"36'0'' X 53'0''"},{"phase":"Phase 2","plot":13,"extent":212.0,"facing":"East","status":"Available","plotSize":"36'0'' X 53'0''"},{"phase":"Phase 2","plot":14,"extent":302.87,"facing":"North-East","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 2","plot":15,"extent":230.62,"facing":"North-West","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 2","plot":16,"extent":212.0,"facing":"West","status":"Available","plotSize":"36'0'' X 53'0''"},{"phase":"Phase 2","plot":17,"extent":212.0,"facing":"West","status":"Available","plotSize":"36'0'' X 53'0''"},{"phase":"Phase 2","plot":18,"extent":212.0,"facing":"West","status":"Available","plotSize":"36'0'' X 53'0''"},{"phase":"Phase 2","plot":19,"extent":212.0,"facing":"West","status":"Available","plotSize":"36'0'' X 53'0''"},{"phase":"Phase 2","plot":20,"extent":212.0,"facing":"West","status":"Available","plotSize":"36'0'' X 53'0''"},{"phase":"Phase 2","plot":21,"extent":420.81,"facing":"South-West","status":"Reserved","plotSize":"UNEVEN"},{"phase":"Phase 2","plot":22,"extent":362.1,"facing":"South-East","status":"Reserved","plotSize":"UNEVEN"},{"phase":"Phase 2","plot":23,"extent":420.32,"facing":"East","status":"Reserved","plotSize":"UNEVEN"},{"phase":"Phase 2","plot":24,"extent":341.37,"facing":"East","status":"Reserved","plotSize":"UNEVEN"},{"phase":"Phase 2","plot":25,"extent":262.41,"facing":"East","status":"Available","plotSize":"UNEVEN"},{"phase":"Phase 2","plot":26,"extent":null,"facing":"East","status":"Available","plotSize":"UNEVEN"}];
 const body=document.getElementById("plotInventoryBody");
 if(!body) return;
 const search=document.getElementById("plotSearch"),facing=document.getElementById("facingFilter"),phase=document.getElementById("phaseFilter");
 const pills=[...document.querySelectorAll(".status-pill")],count=document.getElementById("visiblePlotCount"),empty=document.getElementById("inventoryEmpty");
 let status="all";

 function fmt(v){return Number.isInteger(v)?v.toLocaleString("en-IN"):v.toLocaleString("en-IN",{maximumFractionDigits:2})}
 function makeRow(item){
   const extent=item.extent===null?"To be confirmed":fmt(item.extent)+" Sq. Yds";
   const sub=item.plotSize&&item.plotSize!=="UNEVEN"?item.plotSize:(item.extent===null?"Extent pending in master sheet":"Master extent");
   const message=`Hello Billion Squares,

I am interested in Sri Nilayam ${item.phase} - Plot #${item.plot}.

Extent: ${extent}
Facing: ${item.facing}
Current Status: ${item.status}

Please share the latest availability, price and site-visit details for this plot.`;
   const wa=`https://wa.me/918125125055?text=${encodeURIComponent(message)}`;
   return `<tr>
    <td><div class="plot-id"><i>${item.phase==="Phase 1"?"P1":"P2"}</i><b>Plot #${item.plot}</b></div></td>
    <td><span class="extent-main">${extent}</span><span class="extent-sub">${sub}</span></td>
    <td><span class="facing-tag">${item.facing}</span></td>
    <td><span class="phase-tag">${item.phase}</span></td>
    <td><span class="status-badge ${String(item.status).toLowerCase()}">${item.status}</span></td>
    <td><a class="plot-wa" href="${wa}" target="_blank" rel="noopener">Enquire Plot #${item.plot} ↗</a></td>
   </tr>`;
 }
 function render(){
   const q=(search.value||"").toLowerCase().replace(/plot|#/g,"").trim();
   const filtered=data.filter(item=>{
     const sm=!q||String(item.plot).includes(q);
     const fm=facing.value==="all"||item.facing===facing.value;
     const pm=phase.value==="all"||item.phase===phase.value;
     const stm=status==="all"||item.status===status;
     return sm&&fm&&pm&&stm;
   });
   body.innerHTML=filtered.map(makeRow).join("");
   count.textContent=filtered.length;
   empty.classList.toggle("visible",filtered.length===0);
 }
 search.addEventListener("input",render);
 facing.addEventListener("change",render);
 phase.addEventListener("change",render);
 pills.forEach(p=>p.addEventListener("click",()=>{pills.forEach(x=>x.classList.remove("active"));p.classList.add("active");status=p.dataset.status;render();}));
 render();
})();
