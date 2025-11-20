// ============================================
// KONFIGURASI DAN ELEMEN DOM
// ============================================
const siteContainer = document.getElementById("siteContainer");
const factsGrid = document.getElementById("factsGrid");

// Elemen Modal
const modal = document.getElementById("kronikModal");
const closeBtn = document.querySelector(".modal-close");
const modalTitle = document.getElementById("modalTitle");
const modalKronik = document.getElementById("modalKronik");

// Elemen Navigasi Mobile
const navLinks = document.querySelector('.nav-links');
const burger = document.querySelector('.burger');
const closeMobileBtn = document.querySelector('.close-btn-mobile'); 

// ============================================
// FUNGSI PEMUATAN KONTEN DARI JSON
// ============================================

/**
 * Mengambil data dari situs.json dan memuat konten utama serta fakta.
 */
async function loadContent() {
    try {
        const response = await fetch('data/situs.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        createChronicleEntries(data.situs_utama);
        createFactCards(data.fakta_arkeologi);
        
        // Setelah konten dibuat, tambahkan event listener ke tombol yang baru dibuat
        setupModalListeners();

    } catch (error) {
        console.error("Gagal memuat data dari situs.json:", error);
        siteContainer.innerHTML = "<p>Maaf, konten situs tidak dapat dimuat saat ini.</p>";
    }
}

/**
 * Membuat elemen Chronicle/Situs berdasarkan data JSON.
 * @param {Array} sites - Array objek situs.
 */
function createChronicleEntries(sites) {
    let html = '';
    sites.forEach((site, index) => {
        // Menentukan urutan elemen (ganjil/genap untuk timeline CSS)
        const reverseClass = index % 2 !== 0 ? ' flex-direction: row-reverse;' : '';
        
        html += `
            <div class="chronicle-entry" style="${reverseClass}">
                <div class="image-block">
                    <img src="${site.gambar_src}" alt="${site.gambar_alt}">
                </div>
                <div class="text-block">
                    <h3>${site.judul}</h3>
                    <p>${site.deskripsi_singkat}</p>
                    <button 
                        class="site-link"
                        data-title="${site.kronik_title}"
                        data-kronik="${site.kronik_detail}"
                    >
                        <i class="fas fa-book"></i> Baca Kronik
                    </button>
                </div>
            </div>
        `;
    });
    siteContainer.innerHTML = html;
}

/**
 * Membuat elemen Fact Cards berdasarkan data JSON.
 * @param {Array} facts - Array objek fakta.
 */
function createFactCards(facts) {
    let html = '';
    facts.forEach(fact => {
        html += `
            <div class="fact-card">
                <i class="${fact.ikon_class}"></i>
                <h4>${fact.judul}</h4>
                <p>${fact.deskripsi}</p>
            </div>
        `;
    });
    factsGrid.innerHTML = html;
}


// ============================================
// FUNGSIONALITAS MODAL & NAVIGASI
// ============================================

/**
 * Menyiapkan Event Listener untuk tombol 'Baca Kronik' (Modal)
 */
function setupModalListeners() {
    const kronikButtons = document.querySelectorAll(".site-link");

    kronikButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); 
            
            const title = this.getAttribute('data-title');
            const kronik = this.getAttribute('data-kronik');
            
            modalTitle.textContent = title;
            modalKronik.textContent = kronik;
            
            modal.style.display = "block";
        });
    });

    // Tutup modal saat tombol silang (x) diklik
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // Tutup modal saat user mengklik di luar area modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}


/**
 * Toggle navigasi mobile.
 */
const toggleNav = () => {
    navLinks.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
    if (navLinks.classList.contains('nav-active')) {
        closeMobileBtn.style.display = 'block';
    } else {
        closeMobileBtn.style.display = 'none';
    }
};

// ============================================
// MAIN EXECUTION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Muat konten utama dari JSON
    loadContent();

    // 2. Setup event listeners untuk navigasi
    if (burger && navLinks) {
        burger.addEventListener('click', toggleNav);
        closeMobileBtn.addEventListener('click', toggleNav); 

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('nav-active')) {
                    setTimeout(toggleNav, 100); 
                }
            });
        });
    }
});