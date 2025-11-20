/* ============================================
          JAVASCRIPT (index.js) - Murni Tanpa Framework
          ============================================
        */
document.addEventListener('DOMContentLoaded', () => {

  // 1. Sticky Navbar & Scroll Styling
  const navbar = document.getElementById('navbar');
  const scrollHandler = () => {
      if (window.scrollY > 50) {
          navbar.style.backgroundColor = 'rgba(253, 253, 223, 1)'; 
          navbar.style.padding = '0.75rem 5%';
      } else {
          navbar.style.backgroundColor = 'rgba(253, 253, 223, 0.95)'; 
          navbar.style.padding = '1rem 5%';
      }
  };
  window.addEventListener('scroll', scrollHandler);

  // 2. Scroll Animation (Intersection Observer)
  const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 
  };

  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('active');
              if (!entry.target.closest('.hero')) { 
                  observer.unobserve(entry.target); 
              }
          }
      });
  }, observerOptions);

  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .fade-in-up').forEach(el => {
      observer.observe(el);
  });
  
  // Animasi untuk elemen di Hero harus langsung aktif di awal load
  document.querySelectorAll('.fade-in-up').forEach(el => {
      if (el.closest('.hero')) {
          el.classList.add('active');
      }
  });

  // 3. Mobile Menu Toggle (Burger)
  const navLinks = document.querySelector('.nav-links');
  const burger = document.querySelector('.burger');
  
  burger.addEventListener('click', () => {
      navLinks.classList.toggle('nav-active');
      burger.classList.toggle('toggle');
  });
  
  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
          if (navLinks.classList.contains('nav-active')) {
              navLinks.classList.remove('nav-active');
              burger.classList.remove('toggle');
          }
      });
  });


  // 4. History Scroll Functionality
  const historyContainer = document.querySelector('.history-container');
  document.querySelectorAll('.scroll-btn').forEach(button => {
      button.addEventListener('click', () => {
          const scrollAmount = parseInt(button.dataset.scroll);
          historyContainer.scrollBy({
              left: scrollAmount,
              behavior: 'smooth'
          });
      });
  });
});