// ES Module structure example for main project
console.log('Site Plan JS loaded - demonstrating DOM manipulation');

// Dynamic color swatches (shows array methods + template literals)
const colors = [
    { name: 'Primary Blue', hex: '#1e3a8a', use: 'Headings, nav, footer backgrounds' },
    { name: 'Accent Teal', hex: '#0d9488', use: 'Links, buttons, accents, borders' }
];

const swatchContainer = document.getElementById('colorSwatch');
colors.forEach(color => {
    const swatch = document.createElement('div');
    swatch.className = 'swatch';
    swatch.style.backgroundColor = color.hex;
    swatch.innerHTML = `${color.name}<br><small>${color.hex}</small><br><em>${color.use}</em>`;
    swatchContainer.appendChild(swatch);
});

// Smooth scroll for nav links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// Local storage demo - save/restore video link state
const videoLink = document.getElementById('videoLink');
const savedVideo = localStorage.getItem('demoVideo');
if (savedVideo) {
    videoLink.textContent = savedVideo;
    videoLink.href = savedVideo;
}

videoLink.addEventListener('click', () => {
    const newLink = prompt('Enter your video demo URL (e.g., YouTube/Loom):');
    if (newLink) {
        videoLink.href = newLink;
        videoLink.textContent = newLink;
        localStorage.setItem('demoVideo', newLink);
    }
});
