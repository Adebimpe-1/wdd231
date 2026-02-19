document.addEventListener('DOMContentLoaded', function () {

    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.primary-nav .nav');
    const navLinks = document.querySelectorAll('.nav a');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function () {
            nav.classList.toggle('active');
            const expanded = nav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', expanded);
            menuToggle.textContent = expanded ? '✕' : '☰';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.textContent = '☰';
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                nav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.textContent = '☰';
            }
        });
    }

    // FOOTER
    const currentYear = document.getElementById('currentyear');
    const lastMod = document.getElementById('lastmod');

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    if (lastMod) {
        lastMod.textContent = document.lastModified;
    }

    // SMOOTH SCROLLING
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    console.log('✅ ChemSim Hub JS loaded - Menu toggle active!');
});
