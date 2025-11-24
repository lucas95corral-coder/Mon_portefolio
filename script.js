// Éléments DOM
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');
const menuLinks = document.querySelectorAll('.menu-link');
const sections = document.querySelectorAll('.section');
const faqQuestions = document.querySelectorAll('.faq-question');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// -------------------------
// Menu burger
// -------------------------
if (menuToggle && sidebar && overlay) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    });
}

function closeMenu() {
    if (sidebar && overlay) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    }
}

if (closeBtn) closeBtn.addEventListener('click', closeMenu);
if (overlay) overlay.addEventListener('click', closeMenu);

// -------------------------
// Navigation entre sections
// -------------------------
if (menuLinks && sections) {
    menuLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();

            // Retirer active de tous les liens
            menuLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Section cible
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            // Masquer toutes les sections
            sections.forEach(section => section.classList.remove('active-section'));

            // Afficher la section cible
            if (targetSection) {
                targetSection.classList.add('active-section');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            closeMenu(); // mobile
        });
    });
}

// -------------------------
// FAQ interactive
// -------------------------
if (faqQuestions) {
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            if (answer) answer.classList.toggle('show');

            const icon = question.querySelector('i');
            if (icon) icon.classList.toggle('fa-rotate-180');
        });
    });
}

// -------------------------
// Recherche interne
// -------------------------
const searchableContent = [
    { title: "Qui je suis", section: "qui-je-suis", content: "Présentation personnelle, valeurs, passions, motivations." },
    { title: "Formation & Projet", section: "formation-projet", content: "Bac général 2024, ILEPS 2024, expériences pédagogiques." },
    { title: "Vie de danseur", section: "vie-danseur", content: "Danse depuis l'enfance, hip-hop, jazz, contemporain, performances." },
    { title: "Action citoyenne", section: "action-citoyenne", content: "Bénévolat, scoutisme, ILEPS Awards, Campus Day, Special Olympics." }
];

if (searchInput && searchResults) {
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        searchResults.innerHTML = '';

        if (query === '') {
            searchResults.style.display = 'none';
            return;
        }

        const results = searchableContent.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.content.toLowerCase().includes(query)
        );

        if (results.length === 0) {
            searchResults.innerHTML = '<p>Aucun résultat trouvé</p>';
        } else {
            results.forEach(item => {
                const div = document.createElement('div');
                div.classList.add('search-result-item');

                // Correction syntaxe obligatoire
                div.innerHTML = `<h4>${item.title}</h4><p>${item.content}</p>`;

                div.addEventListener('click', () => {
                    sections.forEach(s => s.classList.remove('active-section'));

                    const target = document.getElementById(item.section);
                    if (target) target.classList.add('active-section');

                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    searchResults.style.display = 'none';
                });

                searchResults.appendChild(div);
            });
        }

        searchResults.style.display = 'block';
    });
}
