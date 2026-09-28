/* =====================================================================
   RAKSAKRTI front end
   ---------------------------------------------------------------------
   DATA FORM the site expects from your database (one JSON object per record):
   {
     id:       "gam",                  // unique string
     category: "language",             // language | song | ritual | performing | craft | oral
     name:     "Great Andamanese",     // name in English
     native:   "भांड पाथर",             // optional, name in its own script
     place:    "Village/District, State",
     status:   "critical",             // vulnerable | definite | severe | critical | dormant
     speakers: "fewer than 10",        // optional: speakers, practitioners or troupes left
     summary:  "One-line description",
     detail:   "Longer story shown when the card is opened",
     media:    [{ type: "audio|video|image|text", url: "..." }],  // optional
     contributor: "Name or handle"     // optional
   }
   To connect your database, replace ITEMS with: ITEMS = await (await fetch('/api/records')).json();
   and call render(). The sample records below are ILLUSTRATIVE: verify them
   with field sources before publishing.
   ===================================================================== */

const CATS = [
  { id: 'language',   hi: 'भाषा',   en: 'Languages',       c: '#C8332B' },
  { id: 'song',       hi: 'गीत',    en: 'Songs',           c: '#B5650D' },
  { id: 'ritual',     hi: 'अनुष्ठान', en: 'Rituals',         c: '#0F7B78' },
  { id: 'performing', hi: 'कला',    en: 'Performing arts', c: '#7A3FB0' },
  { id: 'craft',      hi: 'शिल्प',   en: 'Crafts & skills', c: '#2E6FBF' },
  { id: 'oral',       hi: 'कथा',    en: 'Oral epics',      c: '#A02D66' }
];

// lit = how many of 4 diyas glow (UNESCO-style vitality levels)
const STATUS = {
  vulnerable: { lit: 4, label: 'Vulnerable' },
  definite:   { lit: 3, label: 'Definitely endangered' },
  severe:     { lit: 2, label: 'Severely endangered' },
  critical:   { lit: 1, label: 'Critically endangered' },
  dormant:    { lit: 0, label: 'No native speakers' }
};

let ITEMS = [
  { id: 'gam', category: 'language', name: 'Great Andamanese', place: 'Strait Island, Andaman & Nicobar', status: 'critical', speakers: 'fewer than 10',
    summary: 'A mixed tongue that remains from the ten tribes of the Great Andamans.',
    detail: 'When Boa Sr., the last speaker of Bo, passed away in 2010, one whole branch of the family fell silent. A handful of elders still speak the mixed Great Andamanese that survives today.' },
  { id: 'ahom', category: 'language', name: 'Ahom (Tai-Ahom)', place: 'Upper Assam', status: 'dormant',
    summary: 'The Tai language of the Ahom kingdom, no longer anyone\'s mother tongue.',
    detail: 'Deodhai and Bailung priests still chant it in rituals, and old buranji chronicles preserve it on paper. Small learner groups are trying to bring back everyday speech.' },
  { id: 'nihali', category: 'language', name: 'Nihali', place: 'Satpura hills, Maharashtra & Madhya Pradesh', status: 'severe', speakers: 'about 2,000',
    summary: 'A language isolate with no proven relatives.',
    detail: 'Many Nihali speakers now use Korku, Marathi or Hindi at home. Each new recording keeps a unique branch of human speech on record.' },
  { id: 'koro', category: 'language', name: 'Koro Aka', place: 'East Kameng, Arunachal Pradesh', status: 'definite', speakers: 'about 1,000',
    summary: 'A Tibeto-Burman language that outsiders documented only in 2008.',
    detail: 'Researchers found that Koro is distinct from its neighbours. Younger speakers increasingly switch to Hindi and larger regional languages.' },
  { id: 'ovi', category: 'song', native: 'ओवी', name: 'Ovi grinding songs', place: 'Maharashtra', status: 'definite',
    summary: 'Couplets women sang at the grindstone, full of family history and feeling.',
    detail: 'As flour mills replaced hand grinding, the daily setting for these songs disappeared. Elder women still remember thousands of verses that nobody has written down.' },
  { id: 'tholpava', category: 'ritual', native: 'തോൽപ്പാവക്കൂത്ത്', name: 'Tholpavakoothu', place: 'Palakkad, Kerala', status: 'definite',
    summary: 'Leather shadow puppets tell the Ramayana inside Bhagavathi temples.',
    detail: 'Performed at night through the temple festival season and passed down within a few puppeteer families. Fewer young apprentices join each year.' },
  { id: 'bhand', category: 'performing', native: 'भांड पाथर', name: 'Bhand Pather', place: 'Kashmir Valley', status: 'severe',
    summary: 'Satirical folk theatre with music, mimicry and rustic humour.',
    detail: 'Bhand families perform it in open courtyards, poking fun at kings and neighbours alike. Only a small number of troupes still travel every season.' },
  { id: 'phad', category: 'oral', native: 'फड़', name: 'Phad storytelling', place: 'Bhilwara, Rajasthan', status: 'definite',
    summary: 'A painted scroll unrolled beside a singer who tells a folk deity\'s epic.',
    detail: 'Bhopas sing the tale of Pabuji or Devnarayan while a partner lights each scene with a lamp. The oral epic runs far longer than the scroll can show.' },
  { id: 'sanjhi', category: 'craft', native: 'सांझी', name: 'Sanjhi paper cutting', place: 'Mathura, Uttar Pradesh', status: 'definite',
    summary: 'Hand-cut paper stencils that draw Krishna\'s stories in colour.',
    detail: 'Once tied to devotional courtyard art, it now survives with a few families who cut a whole stencil from one sheet with scissors.' }
];

const LANGS = [
  ['en', 'English'], ['hi', 'हिन्दी'], ['bn', 'বাংলা'], ['ta', 'தமிழ்'], ['te', 'తెలుగు'], ['mr', 'मराठी']
];

const I18N = {
  en: { heroTitle: 'A song lives only while someone remembers it.',
    heroSub: 'Nearly 200 Indian languages, and countless songs and rituals, are fading with their elders. Record, share and learn them here, together.',
    explore: 'Explore fading voices', contribute: 'Add what you know', catTitle: 'Browse by tradition',
    voicesTitle: 'Voices about to fall silent', legend: 'Lit diyas show how much of a tradition is still practised.',
    formTitle: 'Share a song, word or ritual', more: 'Read the story' },
  hi: { heroTitle: 'गीत तभी तक जीवित है, जब तक कोई उसे याद रखता है।',
    heroSub: 'लगभग 200 भारतीय भाषाएँ और अनगिनत गीत व अनुष्ठान अपने बुज़ुर्गों के साथ लुप्त हो रहे हैं। यहाँ मिलकर उन्हें दर्ज करें, साझा करें और सीखें।',
    explore: 'लुप्त होती आवाज़ें देखें', contribute: 'जो आप जानते हैं, जोड़ें', catTitle: 'परंपरा के अनुसार खोजें',
    voicesTitle: 'खामोश होने की कगार पर आवाज़ें', legend: 'जलते दीये बताते हैं कि परंपरा कितनी बची है।',
    formTitle: 'कोई गीत, शब्द या रीति साझा करें', more: 'कहानी पढ़ें' },
  bn: { heroTitle: 'গান ততক্ষণই বেঁচে থাকে, যতক্ষণ কেউ তাকে মনে রাখে।',
    heroSub: 'প্রায় ২০০টি ভারতীয় ভাষা এবং অগণিত গান ও আচার প্রবীণদের সঙ্গে হারিয়ে যাচ্ছে। এখানে একসঙ্গে সেগুলো রেকর্ড করুন, ভাগ করুন ও শিখুন।',
    explore: 'হারিয়ে যাওয়া কণ্ঠ দেখুন', contribute: 'আপনার জানা যোগ করুন', catTitle: 'ঐতিহ্য অনুযায়ী দেখুন',
    voicesTitle: 'নীরব হওয়ার মুখে কণ্ঠস্বর', legend: 'জ্বলন্ত প্রদীপ দেখায় ঐতিহ্যের কতটা এখনও টিকে আছে।',
    formTitle: 'একটি গান, শব্দ বা রীতি ভাগ করুন', more: 'গল্পটি পড়ুন' },
  ta: { heroTitle: 'ஒரு பாடல் யாரோ நினைவில் வைத்திருக்கும் வரைதான் வாழ்கிறது.',
    heroSub: 'கிட்டத்தட்ட 200 இந்திய மொழிகளும் எண்ணற்ற பாடல்களும் சடங்குகளும் முதியவர்களுடன் மறைந்து வருகின்றன. அவற்றை இங்கே இணைந்து பதிவு செய்யுங்கள், பகிருங்கள், கற்றுக்கொள்ளுங்கள்.',
    explore: 'மறையும் குரல்களைப் பாருங்கள்', contribute: 'உங்களுக்குத் தெரிந்ததைச் சேர்க்கவும்', catTitle: 'பாரம்பரியம் வாரியாகப் பாருங்கள்',
    voicesTitle: 'அமைதியாகும் நிலையில் உள்ள குரல்கள்', legend: 'எரியும் தீபங்கள் பாரம்பரியம் எவ்வளவு எஞ்சியுள்ளது என்பதைக் காட்டுகின்றன.',
    formTitle: 'ஒரு பாடல், சொல் அல்லது சடங்கைப் பகிருங்கள்', more: 'கதையைப் படியுங்கள்' },
  te: { heroTitle: 'ఎవరో గుర్తుంచుకున్నంత వరకే పాట బతికి ఉంటుంది.',
    heroSub: 'దాదాపు 200 భారతీయ భాషలు, లెక్కలేనన్ని పాటలు, ఆచారాలు పెద్దలతో పాటు కనుమరుగవుతున్నాయి. ఇక్కడ కలిసి వాటిని నమోదు చేయండి, పంచుకోండి, నేర్చుకోండి.',
    explore: 'మసకబారుతున్న గొంతులను చూడండి', contribute: 'మీకు తెలిసింది జోడించండి', catTitle: 'సంప్రదాయం వారీగా చూడండి',
    voicesTitle: 'మౌనం అవుతున్న గొంతులు', legend: 'వెలిగే దీపాలు సంప్రదాయం ఎంత మిగిలి ఉందో చూపుతాయి.',
    formTitle: 'ఒక పాట, పదం లేదా ఆచారం పంచుకోండి', more: 'కథ చదవండి' },
  mr: { heroTitle: 'गाणं तोपर्यंतच जगतं, जोपर्यंत कोणीतरी ते लक्षात ठेवतं.',
    heroSub: 'जवळपास २०० भारतीय भाषा आणि असंख्य गाणी व विधी वडीलधाऱ्यांसोबत लुप्त होत आहेत. इथे एकत्र येऊन त्यांची नोंद करा, शेअर करा आणि शिका.',
    explore: 'लुप्त होणारे आवाज पहा', contribute: 'तुम्हाला माहीत असलेले जोडा', catTitle: 'परंपरेनुसार शोधा',
    voicesTitle: 'शांत होण्याच्या मार्गावरील आवाज', legend: 'तेवणारे दिवे परंपरा किती शिल्लक आहे ते दाखवतात.',
    formTitle: 'एखादे गाणे, शब्द किंवा विधी शेअर करा', more: 'कथा वाचा' }
};

/* ---------- helpers ---------- */
const $ = s => document.querySelector(s);
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const store = {
  get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } }
};
const state = { cat: 'all', status: 'all', q: '', lang: store.get('raksakrti-lang') };
const t = k => (I18N[state.lang] || I18N.en)[k] || I18N.en[k];

/* ---------- language popup ---------- */
function applyLang(code) {
  state.lang = code;
  document.documentElement.lang = code;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  render();
}
function openLang() {
  $('#langModal').hidden = false;
  $('#langGrid button').focus();
}
function closeLang(code) {
  if (code) { store.set('raksakrti-lang', code); applyLang(code); }
  $('#langModal').hidden = true;
}
$('#langGrid').innerHTML = LANGS.map(([c, n]) => `<button type="button" data-lang="${c}">${n}</button>`).join('');
$('#langGrid').addEventListener('click', e => { const b = e.target.closest('button'); if (b) closeLang(b.dataset.lang); });
$('#langBtn').addEventListener('click', openLang);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#langModal').hidden) closeLang(state.lang || 'en'); });

/* ---------- rendering ---------- */
function filtered() {
  const q = state.q.trim().toLowerCase();
  return ITEMS.filter(i =>
    (state.cat === 'all' || i.category === state.cat) &&
    (state.status === 'all' || i.status === state.status) &&
    (!q || [i.name, i.native, i.place, i.summary, i.category].join(' ').toLowerCase().includes(q)));
}
function cardHTML(i) {
  const cat = CATS.find(c => c.id === i.category) || CATS[0];
  const st = STATUS[i.status] || STATUS.definite;
  const flames = [1, 2, 3, 4].map(n => `<i class="diya${n <= st.lit ? ' lit' : ''}"></i>`).join('');
  return `<article class="card" style="--c:${cat.c}">
    <div class="card-top"><span>${esc(cat.en)}</span><span class="native">${esc(i.native)}</span></div>
    <h3>${esc(i.name)}</h3><p class="where">${esc(i.place)}</p>
    <div class="diyas" role="img" aria-label="${esc(st.label)}: ${st.lit} of 4 flames lit">${flames}<span>${esc(st.label)}</span></div>
    <p>${esc(i.summary)}</p>
    <details><summary>${esc(t('more'))}</summary><p>${esc(i.detail)}</p>
      ${i.speakers ? `<p><b>Still carrying it:</b> ${esc(i.speakers)}</p>` : ''}
      <a class="btn small" href="#contribute" data-add="${esc(i.name)}">Add a recording</a></details>
  </article>`;
}
function render() {
  $('#catGrid').innerHTML = CATS.map(c => {
    const n = ITEMS.filter(i => i.category === c.id).length;
    return `<button class="cat" style="--c:${c.c}" data-cat="${c.id}" aria-pressed="${state.cat === c.id}">
      <b>${c.hi}</b>${c.en}<br><small>${n} ${n === 1 ? 'record' : 'records'}</small></button>`;
  }).join('');
  const chips = [{ id: 'all', en: 'All' }, ...CATS];
  $('#chips').innerHTML = chips.map(c =>
    `<button class="chip" data-cat="${c.id}" aria-pressed="${state.cat === c.id}">${c.en}</button>`).join('');
  const list = filtered();
  $('#cards').innerHTML = list.map(cardHTML).join('');
  $('#empty').hidden = list.length > 0;
}
function setCat(id) { state.cat = state.cat === id ? 'all' : id; render(); }
['#catGrid', '#chips'].forEach(s => $(s).addEventListener('click', e => {
  const b = e.target.closest('[data-cat]');
  if (!b) return;
  setCat(b.dataset.cat);
  if (s === '#catGrid') $('#voices').scrollIntoView();
}));
$('#cards').addEventListener('click', e => {
  const a = e.target.closest('[data-add]');
  if (a) $('#addForm [name=name]').value = 'Recording for: ' + a.dataset.add;
});

/* ---------- header: search and advanced filter ---------- */
$('.search-area input').addEventListener('input', e => { state.q = e.target.value; render(); });
$('.search-btn').addEventListener('click', () => $('#voices').scrollIntoView());
$('.search-area input').addEventListener('keydown', e => { if (e.key === 'Enter') $('#voices').scrollIntoView(); });
$('.advanced-btn').addEventListener('click', () => { $('#adv').hidden = !$('#adv').hidden; });
$('#statusSel').innerHTML = '<option value="all">Any status</option>' +
  Object.entries(STATUS).map(([k, v]) => `<option value="${k}">${v.label}</option>`).join('');
$('#statusSel').addEventListener('change', e => { state.status = e.target.value; render(); });
$('#clearBtn').addEventListener('click', () => {
  state.cat = 'all'; state.status = 'all'; state.q = '';
  $('.search-area input').value = ''; $('#statusSel').value = 'all'; render();
});
// logo.png fallback (header markup stays untouched)
const logo = $('.logo');
const fallbackLogo = () => {
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#F2A900"/><path d="M32 10c9 11 9 22 0 32-9-10-9-21 0-32z" fill="#C8332B"/><path d="M8 34c13 0 20 6 24 16-13 0-22-5-24-16zM56 34c-13 0-20 6-24 16 13 0 22-5 24-16z" fill="#0F7B78"/></svg>';
  logo.src = 'data:image/svg+xml,' + encodeURIComponent(svg);
};
logo.addEventListener('error', fallbackLogo, { once: true });
if (logo.complete && logo.naturalWidth === 0) fallbackLogo();

/* ---------- contribution form ---------- */
$('#formCat').innerHTML = CATS.map(c => `<option value="${c.id}">${c.en}</option>`).join('');
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg; el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3500);
}
$('#addForm').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const record = { name: f.get('name'), category: f.get('category'), place: f.get('place'), summary: f.get('summary'), status: 'pending_review' };
  const file = f.get('media');
  // Send `record` (+ `file`) to your backend here, e.g. fetch('/api/contribute', { method: 'POST', body: f })
  console.log('New contribution', record, file && file.name);
  e.target.reset();
  toast('Thank you. Your contribution is waiting for community review.');
});

/* ---------- start ---------- */
applyLang(state.lang || 'en');
if (!state.lang) openLang();
