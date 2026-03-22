// ── CURSOR ──
const cur  = document.getElementById('cur');
const ring = document.getElementById('ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.transform   = 'translate(-50%,-50%) scale(1.8)';
    ring.style.borderColor = 'var(--rose-l)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.transform   = 'translate(-50%,-50%) scale(1)';
    ring.style.borderColor = 'var(--lilac)';
  });
});

// ── PETALS ──
const symbols   = ['🌸', '🌹', '🥀', '🦋', '✦', '🌙'];
const container = document.getElementById('petals');

for (let i = 0; i < 20; i++) {
  const el = document.createElement('div');
  el.className   = 'petal';
  el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  el.style.cssText = `
    left: ${Math.random() * 100}vw;
    top: -30px;
    font-size: ${0.55 + Math.random() * 0.8}rem;
    animation-duration: ${9 + Math.random() * 14}s;
    animation-delay: ${Math.random() * 16}s;
  `;
  container.appendChild(el);
}

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('on');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
