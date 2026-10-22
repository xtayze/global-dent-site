const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('open', !isOpen);
    menuButton.setAttribute('aria-label', isOpen ? 'Открыть меню' : 'Закрыть меню');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Открыть меню');
    });
  });
}

document.querySelector('#year').textContent = new Date().getFullYear();

// External links open in a new tab; this also keeps keyboard focus behavior predictable.
document.querySelectorAll('a[target="_blank"]').forEach((link) => {
  link.setAttribute('rel', 'noopener noreferrer');
});


// Reveal content gently as it enters the viewport.
const revealTargets = document.querySelectorAll(
  '.section-heading, .service-card, .about-visual, .about-copy, .price-banner > *, .contact-item, .map-card'
);

revealTargets.forEach((element) => element.classList.add('reveal'));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -35px 0px'
  });

  revealTargets.forEach((element) => revealObserver.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add('is-visible'));
}
