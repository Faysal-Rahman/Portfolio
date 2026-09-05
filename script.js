// ─── Mobile Menu Toggle ─────────────────────────────────────
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});

// Close menu when a nav link is clicked
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

// ─── Scroll Reveal ──────────────────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── Active Nav Link on Scroll ───────────────────────────────
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
    if (activeLink) activeLink.classList.add('active');
  });
}, { rootMargin: '-35% 0px -55% 0px' });

document.querySelectorAll('main section[id]').forEach(s => sectionObserver.observe(s));

// ─── Smooth Scrolling for Anchor Links ──────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href');
    if (targetId === '#' || targetId === '') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      if (history.pushState) {
        history.pushState(null, '', targetId);
      }
    }
  });
});

// ─── CV Modal Viewer ────────────────────────────────────────
const openCvBtn = document.getElementById('openCvBtn');
const cvModal = document.getElementById('cvModal');
const closeCvBtn = document.getElementById('closeCvBtn');
const closeCvOverlay = document.getElementById('closeCvOverlay');

function openCv() {
  if (cvModal) {
    cvModal.classList.add('active');
    cvModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeCv() {
  if (cvModal) {
    cvModal.classList.remove('active');
    cvModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

if (openCvBtn) {
  openCvBtn.addEventListener('click', openCv);
  openCvBtn.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openCv();
    }
  });
}

if (closeCvBtn) closeCvBtn.addEventListener('click', closeCv);
if (closeCvOverlay) closeCvOverlay.addEventListener('click', closeCv);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && cvModal && cvModal.classList.contains('active')) {
    closeCv();
  }
});
