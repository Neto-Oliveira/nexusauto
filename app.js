/* ============ NexusAuto — Protótipo ============ */

let role = 'aluno';
let lastScreen = 's-home';

/* ---------- Navegação entre telas ---------- */
function go(id) {
  document.querySelector('.screen.active')?.classList.remove('active');
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0 });
  if (id !== 's-profile') lastScreen = id;
  history.replaceState(null, '', '#' + id);
}

/* Deep link: abre direto na tela do hash (ex.: index.html#s-dash) */
if (location.hash && document.getElementById(location.hash.slice(1))) {
  go(location.hash.slice(1));
}

document.addEventListener('click', (e) => {
  const goEl = e.target.closest('[data-go]');
  if (goEl) { go(goEl.dataset.go); return; }

  const soon = e.target.closest('[data-soon]');
  if (soon) { toast('Fora do escopo do protótipo'); return; }

  const fill = e.target.closest('[data-fill]');
  if (fill) { toast(`Protótipo: “${fill.dataset.fill}” não editável`); }
});

/* ---------- Tela 1 · Criar conta ---------- */
document.querySelectorAll('#roleSegment .segment__btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelector('#roleSegment .active')?.classList.remove('active');
    btn.classList.add('active');
    role = btn.dataset.role;
  });
});

document.getElementById('formSignup').addEventListener('submit', (e) => {
  e.preventDefault();
  if (!document.getElementById('lgpd').checked) {
    toast('Aceite os termos (LGPD) para continuar');
    return;
  }
  go(role === 'instrutor' ? 's-dash' : 's-home');
});

document.getElementById('btnEntrar').addEventListener('click', () => {
  go(role === 'instrutor' ? 's-dash' : 's-home');
});

/* ---------- Chips: seleção única ---------- */
document.querySelectorAll('[data-single]').forEach((group) => {
  group.addEventListener('click', (e) => {
    const item = e.target.closest('.chip, .circle');
    if (!item || !group.contains(item)) return;
    group.querySelectorAll('.active').forEach((c) => c.classList.remove('active'));
    item.classList.add('active');
  });
});

/* ---------- Chips: seleção múltipla ---------- */
document.querySelectorAll('[data-multi]').forEach((group) => {
  group.addEventListener('click', (e) => {
    const item = e.target.closest('.chip, .day');
    if (!item || !group.contains(item)) return;
    item.classList.toggle('active');
  });
});

/* ---------- Tela 4 · Perfil ---------- */
document.getElementById('btnBack').addEventListener('click', () => go(lastScreen));

document.getElementById('btnWhats').addEventListener('click', () => {
  const msg = encodeURIComponent('Olá Carlos! Vi seu perfil no NexusAuto e quero agendar uma aula.');
  window.open(`https://wa.me/5583999999999?text=${msg}`, '_blank');
});

/* ---------- Tela 5 · Painel ---------- */
document.getElementById('uploadBtn').addEventListener('click', () => {
  toast('Protótipo: upload desabilitado');
});

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}
