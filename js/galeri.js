// --- Fungsi Utilitas untuk membuat elemen Galeri dari JSON ---
function createGalleryItem(item) {
    // Membangun string kelas dari array 'span'
    const spanClasses = item.span ? item.span.join(' ') : '';

    return `
        <div class="photo-item ${spanClasses}">
            <img src="${item.image}" alt="${item.alt}" class="lazy-load">
            <div class="caption-overlay">
                <h4>${item.title}</h4>
                <p>${item.caption}</p>
            </div>
        </div>
    `;
}

// --- Fungsi untuk memuat dan merender konten Galeri ---
function renderGalleryContent() {
    const galleryContainer = document.getElementById('photo-grid-container');

    // Mengambil data dari file JSON
    fetch('data/galeri.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (galleryContainer) {
                let htmlContent = '';
                data.forEach(item => {
                    htmlContent += createGalleryItem(item);
                });
                galleryContainer.innerHTML = htmlContent;
            }
        })
        .catch(error => {
            console.error("Error fetching or rendering gallery data:", error);
            if (galleryContainer) {
                galleryContainer.innerHTML = '<p style="color: red; padding: 20px;">Gagal memuat galeri. Silakan cek file galeri.json.</p>';
            }
        });
}

// --- Logika Menu Toggle (Diambil dari bagian <script> di HTML) ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Panggil fungsi rendering galeri
    renderGalleryContent();

    const navLinks = document.getElementById('nav-links');
    const menuToggle = document.getElementById('menu-toggle'); 

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            const icon = this.querySelector('i');
            
            if (navLinks.classList.contains('active')) {
                // Menu terbuka, ubah ke ikon silang (X)
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                // Menu tertutup, ubah kembali ke ikon garis tiga
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Menutup menu saat link diklik (di mobile)
        document.querySelectorAll('#nav-links a').forEach(item => {
            item.addEventListener('click', () => {
                // Periksa apakah menu terbuka dan berada di tampilan mobile (<= 900px)
                if (window.innerWidth <= 900 && navLinks.classList.contains('active')) {
                    // Panggil klik toggle untuk menutup dan mengubah ikon
                    menuToggle.click(); 
                }
            });
        });
    }
});