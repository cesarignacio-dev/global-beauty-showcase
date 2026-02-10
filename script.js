document.addEventListener('DOMContentLoaded', function () {
  
  // MOBILE NAVIGATION
  const navToggle = document.querySelector('.header__toggle');
  const navMenu = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav__link');
  let menuOpen = false;

  function toggleMenu() {
    menuOpen = !menuOpen;
    if (navToggle) navToggle.setAttribute('aria-expanded', menuOpen);
    if (navMenu) navMenu.classList.toggle('nav--visible', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (menuOpen) toggleMenu();
      });
    });
  }

  // MODALS
  const modalTriggers = document.querySelectorAll('.modal-trigger');
  const modalCloseBtns = document.querySelectorAll('.modal-close');
  const modals = document.querySelectorAll('.modal-overlay');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const modalId = trigger.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      
      if (modal) {
        modal.classList.add('is-visible');
        document.body.classList.add('modal-open');
      }
    });
  });

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('is-visible');
    document.body.classList.remove('modal-open');
  }

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal(btn.closest('.modal-overlay'));
    });
  });

  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  // SCROLL ANIMATIONS
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
});
