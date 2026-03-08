/* ============================================
   JAGANNATH IYER — Portfolio JS
   Features: Scroll reveal, nav sticky,
   hamburger, terminal typewriter, form UX
   ============================================ */

'use strict';

/* ---- SCROLL REVEAL ---- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger cards within the same parent
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let delay = 0;
        siblings.forEach((sib, idx) => {
          if (sib === entry.target) delay = idx * 80;
        });
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ---- NAVBAR SCROLL STATE ---- */
const navbar = document.getElementById('navbar');
const onScroll = () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();


/* ---- HAMBURGER MENU ---- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});


/* ---- TERMINAL TYPEWRITER ---- */
const terminalBody = document.querySelector('.terminal-body');

const lines = [
  { text: '$ python train.py --model xgboost', type: 'cmd', delay: 600 },
  { text: '> Loading dataset... ▋', type: 'output', delay: 1400 },
  { text: '> Accuracy: 85.4%', type: 'output accent', delay: 2000 },
  { text: '> ROC-AUC: 0.921', type: 'output accent', delay: 2500 },
  { text: '$ flask run --port 5000', type: 'cmd', delay: 3400 },
  { text: '> API deployed at localhost:5000', type: 'output accent', delay: 4200 },
  { text: '$ █', type: 'cmd cursor', delay: 5000 },
];

function buildTerminal() {
  if (!terminalBody) return;
  terminalBody.innerHTML = '';

  lines.forEach(({ text, type, delay }) => {
    setTimeout(() => {
      const div = document.createElement('div');
      div.className = 't-line ' + type;

      if (type.includes('cmd') && !type.includes('cursor')) {
        const prompt = document.createElement('span');
        prompt.className = 't-prompt';
        prompt.textContent = '$ ';
        div.appendChild(prompt);
        const txt = document.createTextNode(text.slice(2));
        div.appendChild(txt);
      } else if (type.includes('cursor')) {
        const prompt = document.createElement('span');
        prompt.className = 't-prompt';
        prompt.textContent = '$ ';
        div.appendChild(prompt);
        const cursor = document.createElement('span');
        cursor.className = 'cursor-blink';
        cursor.textContent = '█';
        div.appendChild(cursor);
      } else if (type.includes('accent')) {
        // parse accent coloring
        const content = text.slice(2); // remove "> "
        const prefix = document.createTextNode('> ');
        div.appendChild(prefix);
        // find the last : and color after it
        const colonIdx = content.lastIndexOf(':');
        if (colonIdx !== -1) {
          div.appendChild(document.createTextNode(content.slice(0, colonIdx + 1) + ' '));
          const accent = document.createElement('span');
          accent.className = 'accent-text';
          accent.textContent = content.slice(colonIdx + 1).trim();
          div.appendChild(accent);
        } else {
          const accent = document.createElement('span');
          accent.className = 'accent-text';
          accent.textContent = content;
          div.appendChild(accent);
        }
      } else {
        div.textContent = text;
      }

      terminalBody.appendChild(div);
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }, delay);
  });
}

// Restart terminal animation every ~8s for demo effect
buildTerminal();
setInterval(() => {
  buildTerminal();
}, 8500);


/* ---- SMOOTH NAV ACTIVE HIGHLIGHT ---- */
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinkEls.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--accent)';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));


/* ---- CONTACT FORM ---- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#27c93f';
    btn.style.color = '#fff';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}


/* ---- SKILL TAG HOVER RIPPLE ---- */
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', function () {
    this.style.transform = 'scale(1.05)';
  });
  tag.addEventListener('mouseleave', function () {
    this.style.transform = '';
  });
});


/* ---- CURSOR GLOW (Desktop only) ---- */
if (window.innerWidth > 768) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    pointer-events: none;
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(232,168,56,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    z-index: 0;
    transition: left 0.15s ease, top 0.15s ease;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}
