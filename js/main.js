/* =============================================
   MALIK COOL MASTER — main.js
   ============================================= */

// ---------- HAMBURGER MENU ----------
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

// Close mobile menu when any link is tapped
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
  });
});


// ---------- FAQ ACCORDION ----------
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    const answer = btn.nextElementSibling;

    // Close all others
    document.querySelectorAll('.faq-q').forEach(other => {
      other.setAttribute('aria-expanded', 'false');
      other.nextElementSibling.style.maxHeight = null;
    });

    // Toggle clicked
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});


// ---------- NAVBAR SCROLL SHADOW ----------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.25)';
  } else {
    navbar.style.boxShadow = 'none';
  }
}, { passive: true });
// ---------- HERO SLIDESHOW ----------
function initHeroSlideshow() {
  const track = document.querySelector('.slideshow-track');
  const slides = document.querySelectorAll('.hero-slideshow .hero-img');
  if (!track || slides.length <= 1) return;
  
  let currentSlide = 0;
  const slideInterval = 4000;

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  setInterval(nextSlide, slideInterval);
}


// ---------- INITIALIZE ----------
document.addEventListener('DOMContentLoaded', () => {
  initHeroSlideshow();
});
