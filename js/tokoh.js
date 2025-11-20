// ===================================================
// JAVASCRIPT: DATA DAN FUNGSI RENDER/TOGGLE
// Menggunakan fetch() untuk mengambil data dari tokoh.json
// ===================================================

// 1. Inisialisasi dan Render Konten
document.addEventListener('DOMContentLoaded', () => {
    fetch('data/tokoh.json')
        .then(response => response.json())
        .then(data => {
            renderContent(data);
            setupToggleButtons();
            setupMobileMenu();
        })
        .catch(error => console.error('Error fetching JSON:', error));
});

// 2. Fungsi untuk Render Konten Berdasarkan Tipe
function renderContent(DATA_JSON) {
    const nyataContainer = document.getElementById('nyata-container');
    const legendaContainer = document.getElementById('legenda-container');
    const temuanContainer = document.getElementById('temuan-container');
    const kronikContainer = document.getElementById('kronik-container');

    DATA_JSON.forEach(item => {
        if (item.type === 'nyata') {
            nyataContainer.innerHTML += createTokohNyataCard(item);
        } else if (item.type === 'legenda') {
            legendaContainer.innerHTML += createLegendaItem(item);
        } else if (item.type === 'temuan') {
            temuanContainer.innerHTML += createTemuanCard(item);
        } else if (item.type === 'kronik') {
            kronikContainer.innerHTML += createKronikCard(item);
        }
    });
}

// 3. Template Card/Item

// A. Tokoh Nyata
function createTokohNyataCard(data) {
    return `
        <div class="tokoh-card" id="card-${data.id}">
            <img src="${data.photo || 'default-avatar.jpg'}" alt="Foto ${data.name}" class="tokoh-photo" onerror="this.onerror=null; this.src='https://via.placeholder.com/80/D2B48C/333333?text=MJA'">
            <div class="info">
                <h3>${data.name}</h3>
                <h4>${data.alias}</h4>
                <span class="era">${data.era}</span>
            </div>
            <p class="quote">“${data.quote}”</p>
            <p>${data.description}</p>
            <button class="detail-btn" data-target="full-story-nyata-${data.id}">
                Baca Selengkapnya <i class="fas fa-caret-down"></i>
            </button>
            <div class="full-story-nyata" id="full-story-nyata-${data.id}">
                <p>${data.fullStory}</p>
                <p class="card-footnote">(${data.footnote})</p>
            </div>
        </div>
    `;
}

// B. Legenda
function createLegendaItem(data) {
    return `
        <div class="legenda-item" id="legenda-${data.id}">
            <div class="legenda-illustration" style="background-image: url('${data.illustration || 'default-illustration.jpg'}');" title="${data.name}"></div>
            <div class="legenda-content">
                <span class="legenda-type">Legenda Lokal</span>
                <h3>${data.name}</h3>
                <p><strong>${data.alias}</strong></p>
                <p>${data.description}</p>
                <button class="story-btn" data-target="hidden-story-${data.id}">
                    Telusuri Mitos <i class="fas fa-caret-down"></i>
                </button>
                <div class="hidden-story-detail" id="hidden-story-${data.id}">
                    <p>${data.fullStory}</p>
                    <p class="card-footnote">(${data.footnote})</p>
                </div>
            </div>
        </div>
    `;
}

// C. Catatan Emas (Temuan)
function createTemuanCard(data) {
    return `
        <div class="temuan-card">
            <h4>${data.name}</h4>
            <p>${data.deskripsi}</p>
            <span class="tahun"><i class="fas fa-hourglass-half"></i> ${data.tahun}</span>
        </div>
    `;
}

// D. Kronik Ringkas
function createKronikCard(data) {
    return `
        <div class="kronik-card">
            <h4><i class="fas fa-scroll"></i> ${data.name}</h4>
            <p>${data.deskripsi}</p>
            <span>Sumber: ${data.sumber}</span>
        </div>
    `;
}

// 4. Fungsi Setup Toggle
function setupToggleButtons() {
    const toggleButtons = document.querySelectorAll('.detail-btn, .story-btn');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Toggle kelas 'visible' pada konten
                targetElement.classList.toggle('visible');
                // Toggle kelas 'active' pada tombol untuk rotasi ikon
                this.classList.toggle('active');

                // Ubah teks tombol
                if (targetElement.classList.contains('visible')) {
                    this.innerHTML = 'Sembunyikan Cerita <i class="fas fa-caret-up"></i>';
                    // Atur max-height secara dinamis untuk transisi yang lebih baik (opsional)
                    targetElement.style.maxHeight = targetElement.scrollHeight + "px";
                } else {
                    this.innerHTML = (this.classList.contains('detail-btn') ? 'Baca Selengkapnya' : 'Telusuri Mitos') + ' <i class="fas fa-caret-down"></i>';
                    targetElement.style.maxHeight = "0";
                }
            }
        });
    });
}

// 5. Fungsi Setup Menu Mobile
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('main-nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const isExpanded = navMenu.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
        menuToggle.innerHTML = isExpanded ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Tutup menu saat link diklik (di mobile)
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
}