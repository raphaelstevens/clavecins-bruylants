
const scrollTopBtn = document.getElementById('scrollTopBtn');

// Afficher/masquer le bouton en fonction du scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.opacity = '1';
    } else {
        scrollTopBtn.style.opacity = '0';
    }
});

// Remonter en haut au clic
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect
scrollTopBtn.addEventListener('mouseover', () => {
    scrollTopBtn.style.backgroundColor = 'var(--color-wood)';
});

scrollTopBtn.addEventListener('mouseout', () => {
    scrollTopBtn.style.backgroundColor = 'var(--color-burgundy)';
});


// Animation des sections au scroll
document.addEventListener('DOMContentLoaded', () => {
    // Log au début
    console.log('Script démarré');
    
    const observer = new IntersectionObserver((entries, observer) => {
        console.log('Nombre d\'entrées observées:', entries.length);
        
        entries.forEach((entry, index) => {
            console.log('Section observée:', entry.target.id);
            console.log('Est visible:', entry.isIntersecting);
            console.log('Ratio de visibilité:', entry.intersectionRatio);
            
            if (entry.isIntersecting) {
                console.log('Animation déclenchée pour:', entry.target.id);
                
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    console.log('Classe visible ajoutée à:', entry.target.id);
                }, index * 75);
                
                observer.unobserve(entry.target);
                console.log('Observation arrêtée pour:', entry.target.id);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '400px'
    });

    // Log des sections trouvées
    const cards = document.querySelectorAll('.harpsichord-card');
    console.log('Nombre de cartes trouvées:', cards.length);
    
    cards.forEach((card, index) => {
        console.log('Carte trouvée:', card.id);
        console.log('Classes initiales:', card.className);
        
        card.classList.add('initially-hidden');
        console.log('Classe initially-hidden ajoutée à:', card.id);
        
        observer.observe(card);
        console.log('Observation démarrée pour:', card.id);
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

