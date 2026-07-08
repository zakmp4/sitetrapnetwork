// ---------- Toast ----------
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

// ---------- Copy server IP ----------
function copyServerIP() {
  const ip = 'trapnetwork.net';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(ip).then(() => showToast('Server IP copied: ' + ip));
  } else {
    const el = document.createElement('textarea');
    el.value = ip;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showToast('Server IP copied: ' + ip);
  }
}

// ---------- Discord link ----------
function openDiscord() {
  window.open('https://discord.trapnetwork.net', '_blank', 'noopener');
}

// ---------- Mobile nav ----------
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const left = document.querySelector('.nav-group.left');
  const right = document.querySelector('.nav-group.right');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    left && left.classList.toggle('open');
    right && right.classList.toggle('open');
  });
}

// ---------- Cookie banner ----------
function initCookieBanner() {
  const banner = document.querySelector('.cookie-banner');
  if (!banner) return;
  if (window.__trapCookieDismissed) {
    banner.classList.add('hidden');
    return;
  }
  const accept = banner.querySelector('.accept');
  const learn = banner.querySelector('.learn-more');
  accept && accept.addEventListener('click', () => {
    banner.classList.add('hidden');
    window.__trapCookieDismissed = true;
  });
  learn && learn.addEventListener('click', () => {
    showToast('Trap Network only uses cookies to keep you logged in and remember preferences.');
  });
}

// ---------- Fake live counters (purely cosmetic) ----------
function initLiveCounters() {
  const playerEl = document.querySelector('[data-live="players"]');
  const discordEl = document.querySelector('[data-live="discord"]');
  const onlineTotalEl = document.querySelector('[data-live="online-total"]');

  function jitter(el, base, spread) {
    if (!el) return;
    const val = base + Math.floor(Math.random() * spread) - Math.floor(spread / 2);
    el.textContent = Math.max(0, val);
  }

  if (playerEl) {
    const base = parseInt(playerEl.dataset.base || '148', 10);
    setInterval(() => jitter(playerEl, base, 6), 8000);
  }
  if (discordEl) {
    const base = parseInt(discordEl.dataset.base || '4105', 10);
    setInterval(() => jitter(discordEl, base, 4), 9000);
  }
  if (onlineTotalEl) {
    const base = parseInt(onlineTotalEl.dataset.base || '37', 10);
    setInterval(() => jitter(onlineTotalEl, base, 5), 8500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initCookieBanner();
  initLiveCounters();

  const playBtn = document.querySelector('[data-action="copy-ip"]');
  playBtn && playBtn.addEventListener('click', copyServerIP);

  const discordBtn = document.querySelector('[data-action="open-discord"]');
  discordBtn && discordBtn.addEventListener('click', openDiscord);
});
