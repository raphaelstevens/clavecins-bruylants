const scrollTopBtn = document.getElementById('scrollTopBtn');

// Afficher/masquer le bouton en fonction du scroll
function updateScrollButtonVisibility() {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

// Initialiser l'état du bouton
updateScrollButtonVisibility();

// Écouter le scroll
window.addEventListener('scroll', updateScrollButtonVisibility);

// Fonction pour trouver la section précédente
function findPreviousSection() {
    const sections = Array.from(document.querySelectorAll('section'));
    const currentScroll = window.scrollY + 100; // Un peu de marge pour la détection

    // Trouver la section actuelle
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        
        if (currentScroll > sectionTop) {
            // Si on trouve la section actuelle, retourner la section précédente
            if (i > 0) {
                return sections[i - 1];
            } else {
                // Si c'est la première section, retourner tout en haut
                return null;
            }
        }
    }
    return null;
}

// Remonter à la section précédente au clic
scrollTopBtn.addEventListener('click', () => {
    const previousSection = findPreviousSection();
    
    if (previousSection) {
        previousSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        // Si pas de section précédente, remonter tout en haut
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});


// Animation des sections au scroll
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 75);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '400px'
    });

    const cards = document.querySelectorAll('.harpsichord-card');
    
    cards.forEach((card) => {
        card.classList.add('initially-hidden');
        observer.observe(card);
    });
});

// Menu
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Toggle menu
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close menu when clicking overlay
    navOverlay.addEventListener('click', () => {
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });

    // Handle link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            const section = document.querySelector(`[id="${sectionId}"]`);
            
            if (section) {
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
                
                section.scrollIntoView({ 
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hide menu on resize if open
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
});