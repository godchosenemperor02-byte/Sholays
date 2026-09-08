const navbar = document.getElementById('navbar');
const onScroll = () => {
  navbar.classList.toggle('is-scrolled', window.scrollY > 8);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile menu toggle
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

hamburgerBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  document.body.classList.toggle('nav-open', menuOpen);
  hamburgerBtn.setAttribute('aria-expanded', String(menuOpen));
  hamburgerBtn.setAttribute('aria-label', menuOpen ? 'Close menu' : 'Open menu');
  document.body.style.overflow = menuOpen ? 'hidden' : '';
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    document.body.classList.remove('nav-open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Entrance animation sequence (respects prefers-reduced-motion via CSS)
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const animEls = document.querySelectorAll('[data-anim]');
animEls.forEach((el, i) => {
  if (prefersReduced) {
    el.style.opacity = '1';
    el.style.transform = 'none';
    return;
  }
  el.style.transition = `opacity 650ms cubic-bezier(0.22,1,0.36,1) ${i * 90}ms, transform 650ms cubic-bezier(0.22,1,0.36,1) ${i * 90}ms`;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });
});

// ---------- Project inquiry form → WhatsApp ----------
(function () {
  const WHATSAPP_NUMBER = '2348087722602';
  const form = document.getElementById('inquiry-form');
  if (!form) return;

  const requiredFields = ['name', 'business', 'service', 'details'];

  form.addEventListener('submit', event => {
    event.preventDefault();
    clearErrors();

    const data = Object.fromEntries(new FormData(form));
    const errors = validate(data);

    if (errors.length > 0) {
      showErrors(errors);
      return;
    }

    const message = buildMessage(data);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  });

  function validate(data) {
    const errors = [];
    requiredFields.forEach(field => {
      if (!data[field] || !data[field].trim()) {
        errors.push(field);
      }
    });
    return errors;
  }

  function showErrors(errors) {
    errors.forEach(field => {
      const input = form.querySelector(`[name="${field}"]`);
      const wrapper = input && input.closest('.pi-field');
      const errorEl = form.querySelector(`[data-error-for="${field}"]`);
      if (wrapper) wrapper.classList.add('has-error');
      if (errorEl) errorEl.textContent = 'Please fill in this field';
    });
    const firstField = form.querySelector('.has-error input, .has-error select, .has-error textarea');
    if (firstField) firstField.focus();
  }

  function clearErrors() {
    form.querySelectorAll('.pi-field.has-error').forEach(el => el.classList.remove('has-error'));
    form.querySelectorAll('.pi-error').forEach(el => (el.textContent = ''));
  }

  function buildMessage(data) {
    return `Hello Sholaysplace Brand 👋

I'd like to make an inquiry about a project.

Name: ${data.name}
Business: ${data.business}
Service: ${data.service}
Quantity: ${data.quantity ? data.quantity : 'Not specified'}
Timeline: ${data.timeline ? data.timeline : 'Flexible'}

Project details:
${data.details}

I'd like to get more information and a quote. Thank you!`;
  }
})();
// ---------- Back to top ----------
(function () {
  const backToTop = document.querySelector('[data-back-to-top]');
  if (!backToTop) return;

  backToTop.addEventListener('click', event => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();