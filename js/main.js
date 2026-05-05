/**
 * Malik Cool Master - main.js
 * Handles Modal, Mobile Menu, and WhatsApp Inquiry Forms
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- MOBILE MENU ---
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobLinks = document.querySelectorAll('.mob-link');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
  }

  mobLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // --- SLIDESHOW ---
  const track = document.querySelector('.slideshow-track');
  const slides = document.querySelectorAll('.hero-img');
  let currentSlide = 0;

  if (track && slides.length > 0) {
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }, 4000);
  }

  // --- INQUIRY FORMS & MODAL ---
  const modalOverlay = document.getElementById('modalOverlay');
  const closeModal = document.getElementById('closeModal');
  const modalForm = document.getElementById('modalForm');
  const modalServiceInput = document.getElementById('modalServiceInput');
  const modalTitle = document.getElementById('modalTitle');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  // Open Modal
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const service = btn.getAttribute('data-service');
      modalServiceInput.value = service;
      modalTitle.textContent = `Booking: ${service}`;
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scroll
    });
  });

  // Close Modal
  const hideModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeModal) {
    closeModal.addEventListener('click', hideModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) hideModal();
    });
  }

  // --- WHATSAPP REDIRECTION LOGIC ---
  const WHATSAPP_NUMBER = "917669141312";

  const handleFormSubmit = (e, formType) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const location = formData.get('location');
    const service = formData.get('service');
    const message = formData.get('message') || "";

    let whatsappMsg = `Hi Malik Cool Master, I need to book a service.
    
*Name:* ${name}
*Location:* ${location}
*Service:* ${service}`;

    if (message) {
      whatsappMsg += `\n*Details:* ${message}`;
    }

    const encodedMsg = encodeURIComponent(whatsappMsg);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;

    window.open(waUrl, '_blank');
    
    // Close modal if it was a modal submission
    if (formType === 'modal') hideModal();
    e.target.reset();
  };

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => handleFormSubmit(e, 'modal'));
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => handleFormSubmit(e, 'contact'));
  }

  // --- FAQ ACCORDION ---
  const faqQuestions = document.querySelectorAll('.faq-q');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const expanded = question.getAttribute('aria-expanded') === 'true' || false;
      const answer = question.nextElementSibling;

      // Close other open FAQ items (optional, but cleaner)
      faqQuestions.forEach(otherQ => {
        if (otherQ !== question) {
          otherQ.setAttribute('aria-expanded', 'false');
          otherQ.nextElementSibling.style.maxHeight = null;
        }
      });

      // Toggle current item
      question.setAttribute('aria-expanded', !expanded);
      
      if (!expanded) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = null;
      }
    });
  });

  // --- REVIEWS TICKER DUPLICATION (for seamless loop) ---
  const reviewsTrack = document.querySelector('.reviews-track');
  if (reviewsTrack) {
    const originalContent = reviewsTrack.innerHTML;
    reviewsTrack.innerHTML = originalContent + originalContent;
  }
});
