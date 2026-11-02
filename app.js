const categories = [
  {id:'renovation',icon:'🛠️',title:'Ta’mir va qurilish',desc:'Kvartira, uy va ofis ta’miri',count:'Usta xizmatlari'},
  {id:'electric',icon:'⚡',title:'Elektrik va santexnika',desc:'Elektr tarmoqlari, quvur va jihozlar',count:'Texnik xizmat'},
  {id:'landscape',icon:'🌿',title:'Obodonlashtirish',desc:'Maysa o‘rish, bog‘ va hudud parvarishi',count:'Hudud xizmatlari'},
  {id:'security',icon:'📹',title:'Kamera va xavfsizlik',desc:'Kuzatuv kamerasi va tizim montaji',count:'Montaj va sozlash'},
  {id:'cleaning',icon:'🧹',title:'Tozalash va parvarish',desc:'Uy, ofis va hududlarni tozalash',count:'Tozalik xizmatlari'},
  {id:'help',icon:'🤝',title:'Yordam',desc:'Ko‘chirish, yuk ortish va kundalik yumushlarda ko‘mak',count:'Yordam xizmatlari'},
  {id:'other',icon:'🚚',title:'Boshqa xizmatlar',desc:'Yuk tashish, payvandlash va boshqa yo‘nalishlar',count:'Turli yo‘nalishlar'}
];

const features = [
  {icon:'🛡️',title:'Tekshirilgan mutaxassislar',text:'Profil, aloqa ma’lumotlari va malaka hujjatlari bosqichma-bosqich tekshiriladi.'},
  {icon:'🧾',title:'Shaffof xarajatlar',text:'Materiallar, miqdor va narxlar buyurtma jarayonida mijozga ko‘rinadi.'},
  {icon:'🏪',title:'Materiallar do‘konlari',text:'Mutaxassis kerakli mahsulotni platformadagi yetkazib beruvchi yoki do‘kondan topadi.'},
  {icon:'⭐',title:'Haqiqiy baholash',text:'Reyting faqat yakunlangan buyurtma va mijoz fikri asosida shakllanadi.'}
];

let activeCategory = 'all';
let expertDraft = {};
const grid = document.getElementById('categoryGrid');
const filters = document.getElementById('categoryFilters');
const search = document.getElementById('serviceSearch');
const backdrop = document.getElementById('modalBackdrop');
const modalContent = document.getElementById('modalContent');

function renderFilters(){
  filters.innerHTML = `<button class="filter ${activeCategory==='all'?'active':''}" data-filter="all">Barchasi</button>` +
    categories.map(c=>`<button class="filter ${activeCategory===c.id?'active':''}" data-filter="${c.id}">${c.title}</button>`).join('');
}

function renderCategories(){
  const q = search.value.trim().toLocaleLowerCase('uz');
  const filtered = categories.filter(c =>
    (activeCategory==='all' || c.id===activeCategory) &&
    (!q || `${c.title} ${c.desc}`.toLocaleLowerCase('uz').includes(q))
  );
  grid.innerHTML = filtered.length
    ? filtered.map((c,i)=>`<button class="category-card" data-modal="order" data-service="${c.id}"><div class="category-icon tone-${i%6}">${c.icon}</div><div class="category-content"><small>${c.count}</small><h3>${c.title}</h3><p>${c.desc}</p></div><span class="card-arrow">↗</span></button>`).join('')
    : '<div class="empty-state">Bu so‘rov bo‘yicha xizmat topilmadi. Boshqa so‘z bilan qidirib ko‘ring.</div>';
}

function renderFeatures(){
  document.getElementById('featuresGrid').innerHTML = features.map((f,i)=>
    `<article class="feature-card"><div class="feature-top"><span class="feature-icon">${f.icon}</span><span class="feature-index">0${i+1}</span></div><h3>${f.title}</h3><p>${f.text}</p></article>`
  ).join('');
}

renderFilters();
renderCategories();
renderFeatures();

filters.addEventListener('click',e=>{
  const button=e.target.closest('[data-filter]');
  if(!button)return;
  activeCategory=button.dataset.filter;
  renderFilters();
  renderCategories();
});
search.addEventListener('input',renderCategories);

document.addEventListener('click',e=>{
  const modalButton=e.target.closest('[data-modal]');
  if(modalButton){
    e.preventDefault();
    const preselected = modalButton.dataset.service || '';
    openModal(modalButton.dataset.modal, preselected);
  }
});

const menuToggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav-links');
menuToggle.addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const labels={order:'Xizmatga buyurtma',expert:'Mutaxassis sifatida qo‘shilish',institution:'Tashkilot so‘rovi',store:'Do‘konni platformaga qo‘shish',login:'Kirish'};

function categoryOptions(selected=''){
  return `<option value="">Tanlang</option>${categories.map(c=>`<option value="${c.id}" ${selected===c.id?'selected':''}>${c.title}</option>`).join('')}<option value="custom" ${selected==='custom'?'selected':''}>Boshqa</option>`;
}

function openModal(type, preselected=''){
  expertDraft = {};
  renderInitialForm(type, {service:preselected});
  backdrop.hidden=false;
  document.body.classList.add('modal-open');
}

function renderInitialForm(type, values={}){
  const isLogin=type==='login';
  const needsCategory=['expert','institution','store','order'].includes(type);
  const categoryLabel=type==='expert'?'Mutaxassislik yo‘nalishi':type==='institution'?'Kerakli xizmat':type==='store'?'Mahsulot yo‘nalishi':'Qanday xizmat kerak?';
  const customField=type==='expert' ? `
    <label id="customSpecialtyField" class="conditional-field" ${values.service==='custom'?'':'hidden'}>
      Mutaxassislikni kiriting
      <input id="customSpecialty" name="customSpecialty" type="text" maxlength="80" placeholder="Masalan: mebel yig‘ish, payvandlash..." value="${escapeHtml(values.customSpecialty||'')}" ${values.service==='custom'?'required':''}/>
    </label>` : '';
  const categoryField=needsCategory ? `
    <label>${categoryLabel}
      <select id="serviceCategory" name="serviceCategory" required>${categoryOptions(values.service||'')}</select>
    </label>${customField}` : '';

  modalContent.innerHTML = `
    <span class="section-kicker">USTATOP · DEMO</span>
    <h2 id="modalTitle">${labels[type]||'UstaTop'}</h2>
    <p class="modal-intro">${isLogin?'Hozircha demo shakl. Keyingi bosqichda SMS tasdiqlash ulanadi.':'Ma’lumotlarni kiriting. Hozir bu shakl demo rejimida ishlaydi.'}</p>
    <form id="requestForm" novalidate>
      ${!isLogin?`<label>Ism yoki tashkilot nomi<input name="fullName" required maxlength="100" placeholder="Ismingiz" value="${escapeHtml(values.fullName||'')}" /></label>`:''}
      <label>Telefon raqam<input name="phone" required type="tel" inputmode="tel" placeholder="+998 90 123 45 67" value="${escapeHtml(values.phone||'')}" /></label>
      ${categoryField}
      ${!isLogin?`<label>Qo‘shimcha ma’lumot<textarea name="description" rows="3" maxlength="500" placeholder="Talab yoki izoh (ixtiyoriy)">${escapeHtml(values.description||'')}</textarea></label>`:''}
      <button class="button button-primary form-submit" type="submit">${type==='expert'?'Keyingi bosqich':'Yuborish'} <span>→</span></button>
    </form>`;

  const categorySelect=document.getElementById('serviceCategory');
  if(type==='expert' && categorySelect){
    categorySelect.addEventListener('change',()=>toggleCustomSpecialty(categorySelect.value));
  }

  document.getElementById('requestForm').addEventListener('submit',e=>{
    e.preventDefault();
    const form=e.currentTarget;
    if(!validateVisibleFields(form))return;
    const data=Object.fromEntries(new FormData(form).entries());
    if(type==='expert'){
      expertDraft={...data, service: data.serviceCategory};
      if(data.serviceCategory==='custom') expertDraft.customSpecialty=data.customSpecialty||'';
      renderIdentityStep();
    } else {
      renderGenericDemoResult(type);
    }
  });
}

function toggleCustomSpecialty(value){
  const wrapper=document.getElementById('customSpecialtyField');
  const input=document.getElementById('customSpecialty');
  if(!wrapper || !input)return;
  const show=value==='custom';
  wrapper.hidden=!show;
  input.required=show;
  if(!show) input.value='';
  if(show) input.focus();
}

function renderIdentityStep(){
  modalContent.innerHTML=`
    <div class="form-step-indicator"><span class="step-done">1. Profil</span><i></i><span class="step-current">2. Shaxsni tasdiqlash</span></div>
    <span class="section-kicker">USTATOP · MUTAXASSIS TEKSHIRUVI</span>
    <h2 id="modalTitle">Shaxsiy ma’lumotlar</h2>
    <p class="modal-intro">Mutaxassis profilini tasdiqlash uchun pasport ma’lumotlarini kiriting.</p>
    <div class="privacy-warning"><strong>Demo rejimi:</strong> hozircha haqiqiy JShShIR yoki pasport ma’lumotlarini kiritmang. Ushbu prototip ma’lumotlarni serverga yubormaydi va saqlamaydi. Sinovda namunaviy ma’lumotlardan foydalaning.</div>
    <form id="identityForm" novalidate>
      <label>JShShIR <span class="label-hint">14 ta raqam</span>
        <input id="pinfl" name="pinfl" type="text" inputmode="numeric" autocomplete="off" maxlength="14" minlength="14" pattern="[0-9]{14}" placeholder="Masalan: 12345678901234" required />
      </label>
      <div class="identity-fields-row">
        <label>Pasport seriyasi
          <input id="passportSeries" name="passportSeries" type="text" autocomplete="off" maxlength="2" minlength="2" pattern="[A-Za-z]{2}" placeholder="AA" required />
        </label>
        <label>Pasport raqami
          <input id="passportNumber" name="passportNumber" type="text" inputmode="numeric" autocomplete="off" maxlength="7" minlength="7" pattern="[0-9]{7}" placeholder="1234567" required />
        </label>
      </div>
      <label class="consent-row"><input id="identityConsent" type="checkbox" required /> <span>Ma’lumotlarim mutaxassis shaxsini tekshirish maqsadida qayta ishlanishiga roziman.</span></label>
      <div class="modal-button-row">
        <button class="button button-outline" type="button" id="backToProfile">← Orqaga</button>
        <button class="button button-primary form-submit" type="submit">Davom etish <span>→</span></button>
      </div>
    </form>`;

  const pinfl=document.getElementById('pinfl');
  const series=document.getElementById('passportSeries');
  const passportNumber=document.getElementById('passportNumber');
  pinfl.addEventListener('input',()=>{pinfl.value=pinfl.value.replace(/\D/g,'').slice(0,14);});
  series.addEventListener('input',()=>{series.value=series.value.replace(/[^a-z]/gi,'').toUpperCase().slice(0,2);});
  passportNumber.addEventListener('input',()=>{passportNumber.value=passportNumber.value.replace(/\D/g,'').slice(0,7);});
  document.getElementById('backToProfile').addEventListener('click',()=>renderInitialForm('expert',expertDraft));
  document.getElementById('identityForm').addEventListener('submit',e=>{
    e.preventDefault();
    if(!validateVisibleFields(e.currentTarget))return;
    // Identity values intentionally remain in memory only in this frontend demo.
    renderDemoComplete();
  });
}

function renderDemoComplete(){
  modalContent.innerHTML=`
    <div class="success-state">
      <div>✓</div>
      <h2>Tekshiruv bosqichi yakunlandi</h2>
      <p>Bu faqat interfeys demosi. Pasport va JShShIR ma’lumotlari serverga yuborilmadi hamda saqlanmadi. Haqiqiy identifikatsiya backend, HTTPS, shifrlash, cheklangan xodimlar ruxsati va maxfiylik siyosati joriy etilgandan keyin ulanadi.</p>
      <button class="button button-primary" id="demoClose">Yopish</button>
    </div>`;
  document.getElementById('demoClose').addEventListener('click',closeModal);
}

function renderGenericDemoResult(type){
  modalContent.innerHTML=`
    <div class="success-state">
      <div>✓</div>
      <h2>${type==='login'?'Demo bosqich yakunlandi':'Ma’lumotlar kiritildi'}</h2>
      <p>Bu demo versiya. Hozircha ma’lumot serverga yuborilmaydi yoki saqlanmaydi. Backend ulangach, so‘rovlar xavfsiz qayta ishlanadi.</p>
      <button class="button button-primary" id="successClose">Yopish</button>
    </div>`;
  document.getElementById('successClose').addEventListener('click',closeModal);
}

function validateVisibleFields(form){
  for(const field of form.querySelectorAll('input,select,textarea')){
    if(field.disabled || field.closest('[hidden]')) continue;
    if(!field.checkValidity()){
      field.reportValidity();
      field.focus();
      return false;
    }
  }
  return true;
}

function escapeHtml(value){
  return String(value).replace(/[&<>"']/g,char=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[char]);
}

function closeModal(){
  backdrop.hidden=true;
  document.body.classList.remove('modal-open');
  modalContent.innerHTML='';
}

document.getElementById('modalClose').addEventListener('click',closeModal);
backdrop.addEventListener('mousedown',e=>{if(e.target===backdrop)closeModal();});
document.addEventListener('keydown',e=>{if(e.key==='Escape' && !backdrop.hidden)closeModal();});
