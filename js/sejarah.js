document.addEventListener('DOMContentLoaded', () => {
    const historyItems = document.querySelectorAll('.history-item');
    const submenuLinks = document.querySelectorAll('.submenu a');
    const burger = document.getElementById('burger-menu');
    const navLinks = document.querySelector('nav ul');

    // Tentukan ketinggian navbar saat ini
    const getNavHeight = () => window.innerWidth > 768 ? 66 : 56; // Sesuai CSS vars

    // 1. Logika Toggle Zigzag (Hanya Aktif di Desktop/Tablet)
    historyItems.forEach(item => {
        item.addEventListener('click', () => {
            // Hanya aktifkan toggle effect jika lebar layar lebih besar dari 768px (Desktop/Tablet)
            if (window.innerWidth > 768) {
                if (item.classList.contains('active')) {
                    item.classList.remove('active');
                } else {
                    historyItems.forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                }
            }
            // Di Mobile, elemen sudah diatur agar selalu terbuka penuh via CSS
        });
    });

    // 2. Scroll Smooth untuk Submenu
    submenuLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = getNavHeight();
                let offsetTop = targetElement.offsetTop - navHeight - 20; // Offset 20px tambahan untuk margin/visual
                
                // Khusus untuk #sejarah, atur offset lebih tepat ke bagian awal section
                if (targetId === '#sejarah') {
                    offsetTop = targetElement.offsetTop - navHeight;
                }
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Burger Menu Toggle
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });

    // Menutup menu mobile ketika salah satu link diklik
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        });
    });
});