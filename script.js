'use strict';

/* ════════════════════════════════════════
   ML NEURAL NETWORK CANVAS ANIMATION
════════════════════════════════════════ */
const canvas = document.getElementById('mlCanvas');
const ctx = canvas.getContext('2d');

let W, H, nodes = [], animFrame;

function resizeCanvas() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', () => { resizeCanvas(); initNodes(); });

class Node {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.35;
    this.vy = (Math.random() - 0.5) * 0.35;
    this.r = Math.random() * 2 + 1;
    this.alpha = Math.random() * 0.5 + 0.2;
    this.pulse = Math.random() * Math.PI * 2;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.pulse += 0.02;
    if (this.x < 0 || this.x > W) this.vx *= -1;
    if (this.y < 0 || this.y > H) this.vy *= -1;
  }
  draw() {
    const pulse = Math.sin(this.pulse) * 0.3 + 0.7;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r * pulse, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(126,184,247,${this.alpha * pulse})`;
    ctx.fill();
  }
}

function initNodes() {
  const count = Math.min(Math.floor((W * H) / 18000), 70);
  nodes = Array.from({ length: count }, () => new Node());
}
initNodes();

const CONNECT_DIST = 150;
const ACCENT_COL = '126,184,247';
const WARM_COL = '240,194,122';

function drawConnections() {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < CONNECT_DIST) {
        const alpha = (1 - d / CONNECT_DIST) * 0.18;
        const col = (i + j) % 5 === 0 ? WARM_COL : ACCENT_COL;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(${col},${alpha})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    }
  }
}

function animateCanvas() {
  ctx.clearRect(0, 0, W, H);
  nodes.forEach(n => { n.update(); n.draw(); });
  drawConnections();
  animFrame = requestAnimationFrame(animateCanvas);
}
animateCanvas();


/* ════════════════════════════════════════
   SCROLL REVEAL
════════════════════════════════════════ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = Array.from(entry.target.parentElement.children).filter(c => c.classList.contains('reveal'));
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), idx * 90);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


/* ════════════════════════════════════════
   NAVBAR SCROLL STATE
════════════════════════════════════════ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });


/* ════════════════════════════════════════
   ACTIVE NAV LINK
════════════════════════════════════════ */
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

const secObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => {
        l.style.color = '';
        if (l.getAttribute('href') === '#' + e.target.id) l.style.color = 'var(--accent)';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => secObserver.observe(s));


/* ════════════════════════════════════════
   HAMBURGER MENU
════════════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

document.querySelectorAll('.ml').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});


/* ════════════════════════════════════════
   COUNTER ANIMATION
════════════════════════════════════════ */
function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const start = performance.now();
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    el.textContent = Math.floor(easeOut(progress) * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.hn-val[data-target]').forEach(el => counterObserver.observe(el));


/* ════════════════════════════════════════
   CONTACT FORM
════════════════════════════════════════ */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#6dda8e';
    btn.style.color = '#080910';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
      form.reset();
    }, 3500);
  });
}


/* ════════════════════════════════════════
   SKILL TAG RIPPLE
════════════════════════════════════════ */
document.querySelectorAll('.sk-tags span').forEach(tag => {
  tag.addEventListener('mouseenter', function() { this.style.transform = 'translateY(-2px) scale(1.04)'; });
  tag.addEventListener('mouseleave', function() { this.style.transform = ''; });
});


/* ════════════════════════════════════════
   SMOOTH REVEAL FOR TIMELINE CARDS
════════════════════════════════════════ */
const tlObserver = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 100);
      tlObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.tl-item.reveal').forEach(el => tlObserver.observe(el));


/* ════════════════════════════════════════
   CURSOR GLOW (DESKTOP)
════════════════════════════════════════ */
if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const glow = document.createElement('div');
  Object.assign(glow.style, {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: '1',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(126,184,247,0.05) 0%, transparent 70%)',
    transform: 'translate(-50%,-50%)',
    transition: 'left 0.2s ease, top 0.2s ease',
    left: '-200px', top: '-200px',
  });
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}
