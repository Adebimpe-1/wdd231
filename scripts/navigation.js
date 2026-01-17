const menuBtn = document.getElementById('menuBtn');
const primaryNav = document.getElementById('primaryNav');

menuBtn.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 767) {
        primaryNav.classList.remove('open');
    }
});
