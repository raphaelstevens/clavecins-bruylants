
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




    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.harpsichord-card').forEach(card => {
        observer.observe(card);
    });



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

