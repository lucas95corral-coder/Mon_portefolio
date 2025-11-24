// Gestion du menu hamburger
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('overlay');

menuToggle.addEventListener('click', () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});

// Gestion de la navigation entre sections
const menuLinks = document.querySelectorAll('.menu-link');
const sections = document.querySelectorAll('.section');

menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        showSection(targetId);

        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
});

// Fonction pour afficher la section correspondante
function showSection(id) {
    sections.forEach(section => section.classList.remove('active-section'));
    const target = document.getElementById(id);
    if (target) target.classList.add('active-section');

    // Mettre à jour le menu actif
    menuLinks.forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`.menu-link[href="#${id}"]`);
    if (activeLink) activeLink.classList.add('active');
}

// ---------- AJOUT pour les boutons de la page d'accueil ----------
const btnDecouvrir = document.querySelector('.hero-buttons a[href="#formation-pro"]');
const btnContact = document.querySelector('.hero-buttons a[href="#faq"]');

if (btnDecouvrir) {
    btnDecouvrir.addEventListener('click', function(e) {
        e.preventDefault();
        showSection('formation-pro');
    });
}

if (btnContact) {
    btnContact.addEventListener('click', function(e) {
        e.preventDefault();
        showSection('faq');
    });
}

// ---------- FAQ : ouverture / fermeture des réponses ----------
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        answer.classList.toggle('show');
        question.querySelector('i').classList.toggle('fa-chevron-down');
        question.querySelector('i').classList.toggle('fa-chevron-up');
    });
});
