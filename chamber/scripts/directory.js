// Dynamic footer dates
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent =
    `Last Modified: ${new Date(document.lastModified).toLocaleDateString()}`;

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// View toggle functionality
const gridBtn = document.getElementById('grid-view');
const listBtn = document.getElementById('list-view');
const container = document.getElementById('members-container');

gridBtn.addEventListener('click', () => {
    container.classList.remove('list-view');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
    container.classList.add('list-view');
    gridBtn.classList.remove('active');
    listBtn.classList.add('active');
});

// Fetch and display members
async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();

        displayMembers(members);
    } catch (error) {
        console.error('Error loading members:', error);
        container.innerHTML = '<p>Error loading directory. Please refresh.</p>';
    }
}

function displayMembers(members) {
    container.innerHTML = members.map(member => `
        <article class="member-card">
            <img src="${member.image}" alt="${member.name} logo" loading="lazy">
            <div class="member-info">
                <h3>${member.name}</h3>
                <span class="member-level member-${member.level}">${getLevelName(member.level)}</span>
                <p><strong>📍 ${member.address}</strong></p>
                <p>📞 ${member.phone}</p>
                <p>🌐 <a href="${member.website}" target="_blank">${member.website}</a></p>
                <p><em>${member.sector}</em></p>
            </div>
        </article>
    `).join('');
}

function getLevelName(level) {
    const levels = { 1: 'Member', 2: 'Silver', 3: 'Gold' };
    return levels[level] || 'Member';
}

// List view CSS (no images)
const listCSS = `
    .list-view .member-card {
        display: flex !important;
        flex-direction: column;
        gap: 0.5rem;
    }
    .list-view .member-image {
        display: none;
    }
    .list-view .member-card {
        border-left: 4px solid #0066cc;
        background: #f8f9fa;
        padding: 1rem;
    }
`;
const style = document.createElement('style');
style.textContent = listCSS;
document.head.appendChild(style);

// Load members on page load
document.addEventListener('DOMContentLoaded', loadMembers);
