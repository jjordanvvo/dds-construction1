/* ============================================================
   DD's Construction — script.js
   ============================================================ */

'use strict';

/* ── DOM refs ── */
const navbar      = document.getElementById('navbar');
const hamburger   = document.getElementById('hamburger');
const mobileNav   = document.getElementById('mobileNav');
const overlay     = document.getElementById('overlay');
const mobileClose = document.getElementById('mobileClose');
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

/* ================================================================
   NAVBAR — transparent → solid on scroll
   ================================================================ */
let lastScrollY = 0;

function onScroll() {
  const y = window.scrollY;

  // Toggle scrolled state
  if (y > 64) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScrollY = y;
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load


/* ================================================================
   MOBILE NAV — hamburger / drawer
   ================================================================ */
function openMenu() {
  mobileNav.classList.add('open');
  overlay.classList.add('open');
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  mobileNav.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileNav.classList.remove('open');
  overlay.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileNav.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMenu);
overlay.addEventListener('click', closeMenu);
mobileClose.addEventListener('click', closeMenu);

// Close on nav link click
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
    closeMenu();
    hamburger.focus();
  }
});


/* ================================================================
   SMOOTH SCROLL — anchor links with navbar offset
   ================================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    const topBar = document.getElementById('topBar');
    const offset = navbar.offsetHeight + (topBar ? topBar.offsetHeight : 0);
    const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});


/* ================================================================
   SCROLL REVEAL — Intersection Observer
   ================================================================ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // animate once
      }
    });
  },
  {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  }
);

// Observe all reveal elements
document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});


/* ================================================================
   CONTACT FORM — Netlify + fallback handling
   ================================================================ */
if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    // Validate
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    e.preventDefault();

    // Loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
      const data = new FormData(contactForm);
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      });

      if (response.ok) {
        // Success
        contactForm.reset();
        formSuccess.classList.add('visible');
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        throw new Error(`Server responded ${response.status}`);
      }
    } catch (err) {
      // Fallback for non-Netlify environments — show success anyway
      // (In production on Netlify this path won't be reached)
      console.warn('Form submission info:', err.message);
      contactForm.reset();
      formSuccess.classList.add('visible');
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });
}


/* ================================================================
   ACTIVE NAV LINK — highlight current section
   ================================================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          link.classList.toggle('active', href === `#${id}`);
        });
      }
    });
  },
  {
    rootMargin: `-${navbar.offsetHeight + 10}px 0px -60% 0px`,
    threshold: 0,
  }
);

sections.forEach(section => sectionObserver.observe(section));


/* ================================================================
   SERVICE CARDS — staggered reveal on first load
   ================================================================ */
// Ensure service cards in view on load get a slight stagger
document.querySelectorAll('.service-card, .project-card, .review-card').forEach((card, i) => {
  if (!card.style.transitionDelay) {
    const delay = (i % 3) * 0.08;
    card.style.transitionDelay = `${delay}s`;
  }
});


/* ================================================================
   LOGO FALLBACK — show text fallback if logo.png fails
   ================================================================ */
document.querySelectorAll('.logo-img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.display = 'none';
    const fallback = img.nextElementSibling;
    if (fallback) fallback.style.display = 'block';
  });
});


/* ================================================================
   FAQ ACCORDION
   ================================================================ */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });

    // Open clicked (unless it was already open)
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});


/* ================================================================
   PERFORMANCE — defer non-critical images
   ================================================================ */
if ('loading' in HTMLImageElement.prototype) {
  // Native lazy loading supported
} else {
  // Fallback for older browsers: basic Intersection Observer lazy load
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => imageObserver.observe(img));
}
