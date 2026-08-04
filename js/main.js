function showPage(id) {
  document.querySelectorAll('.page-section').forEach(function(s){ s.classList.remove('active'); });
  document.getElementById('page-' + id).classList.add('active');
  window.scrollTo(0, 0);
  if (id === 'home') {
    history.replaceState(null, '', location.pathname + location.search);
  } else {
    history.replaceState(null, '', '#' + id);
  }
}

// Open correct page based on URL hash on load
(function(){
  var hash = location.hash.replace('#','');
  if (hash === 'impressum' || hash === 'datenschutz') { showPage(hash); }
})();

function setLang(lang) {
  var root = document.getElementById('html-root');
  root.className = 'lang-' + lang;
  root.setAttribute('lang', lang);
  document.getElementById('btn-de').classList.toggle('active', lang === 'de');
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');
  document.getElementById('btn-de').setAttribute('aria-pressed', lang === 'de');
  document.getElementById('btn-en').setAttribute('aria-pressed', lang === 'en');
  document.title = lang === 'de'
    ? 'BigData4Biz — Unternehmenswissen sofort nutzbar machen.'
    : 'BigData4Biz — Make enterprise knowledge instantly accessible.';
  try { localStorage.setItem('bd4b-language', lang); } catch (e) {}
}

// Scroll animations
var obs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.07, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.uc,.pcard,.addon-card,.p-card,.fw-step').forEach(function(el) { obs.observe(el); });

// Staggered delays
document.querySelectorAll('.pcard').forEach(function(el,i){ el.style.transitionDelay=(i*.12)+'s'; });
document.querySelectorAll('.p-card').forEach(function(el,i){ el.style.transitionDelay=(i*.1)+'s'; });
document.querySelectorAll('.fw-step').forEach(function(el,i){ el.style.transitionDelay=(i*.1)+'s'; });
document.querySelectorAll('.addon-card').forEach(function(el,i){ el.style.transitionDelay=(i*.15)+'s'; });

// KPI hover
document.querySelectorAll('.kpi-chip').forEach(function(c){
  c.addEventListener('mouseenter',function(){ c.style.borderColor='var(--green-dim)'; });
  c.addEventListener('mouseleave',function(){ c.style.borderColor='var(--border)'; });
});

// Auto-detect browser language
(function(){
  var saved = null;
  try { saved = localStorage.getItem('bd4b-language'); } catch (e) {}
  var lang = saved || ((navigator.language || 'de').startsWith('en') ? 'en' : 'de');
  setLang(lang);
})();
