/* ============================================
  JAVASCRIPT MURNI (Vanilla JS) - Animasi Scroll & Navigasi
    ============================================
*/
document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Navbar & Scroll Styling
    const navbar = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    const burger = document.querySelector('.burger');
    
    // Toggle Nav Mobile
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        
        // >>> PERBAIKAN: Toggle kelas 'toggle' untuk animasi burger ke 'X' <<<
        burger.classList.toggle('toggle'); 
    });

    const handleScroll = () => {
        // Navbar Styling
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'var(--color-light-cream)'; 
            navbar.style.padding = '0.75rem 5%';
        } else {
            navbar.style.backgroundColor = 'rgba(253, 253, 223, 0.95)';
            navbar.style.padding = '1rem 5%';
        }
        
        // Animasi Scroll Reveal (Metode Tradisional)
        const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
        const windowHeight = window.innerHeight;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            // Terapkan kelas 'active' saat elemen masuk ke dalam viewport (sekitar 85% dari tinggi viewport)
            if (elementTop < windowHeight * 0.85) {
                element.classList.add('active');
            } else {
                // Opsional: hapus kelas active jika keluar dari viewport (untuk animasi berulang)
                // element.classList.remove('active');
            }
        });
    };
    
    // Panggil saat load pertama kali dan saat scroll
    handleScroll();
    window.addEventListener('scroll', handleScroll);
});