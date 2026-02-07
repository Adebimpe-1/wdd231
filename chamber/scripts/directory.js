//FOOTER 
function updateFooter() {
    const yearSpan = document.getElementById('year');
    const lastModSpan = document.getElementById('last-modified');

    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (lastModSpan) lastModSpan.textContent = `Last Modified: ${new Date(document.lastModified).toLocaleDateString()}`;
}

// MOBILE MENU
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

// DIRECTORY TOGGLE- GRID/LIST VIEW
function initViewToggle() {
    const gridBtn = document.getElementById('grid-view');
    const listBtn = document.getElementById('list-view');
    const container = document.getElementById('members-container');

    if (gridBtn && listBtn && container) {
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
    }
}

// DIRECTORY MEMBERS
async function loadDirectoryMembers() {
    const container = document.getElementById('members-container');
    if (!container) return;

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
    const container = document.getElementById('members-container');
    if (!container) return;

    container.innerHTML = members.map(member => `
        <article class="member-card">
            <img src="${member.image}" alt="${member.name} logo" loading="lazy" class="member-image">
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

// Weather API
async function loadWeather() {
    const weatherSection = document.querySelector('.weather-section');
    if (!weatherSection) return;

    try {
        // Lagos coordinates
        const apiKey = 'e8f1b0a7a4c8b3d2f7e9a1c5b6d8e0f2'; // Demo key
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=6.5244&lon=3.3792&appid=${apiKey}&units=metric&cnt=4`;

        const response = await fetch(url);
        const data = await response.json();

        // Current weather
        const current = data.list[0];
        document.querySelector('.weather-temp').textContent = `${Math.round(current.main.temp)}°C`;
        document.querySelector('.weather-description').textContent = current.weather[0].description;
        document.querySelector('.weather-icon').textContent = getWeatherIcon(current.weather[0].main);

        // Forecast
        const forecastGrid = document.querySelector('.forecast-grid');
        forecastGrid.innerHTML = '';
        for (let i = 1; i < 4; i++) {
            const day = data.list[i];
            const date = new Date(day.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

            forecastGrid.innerHTML += `
                <div class="forecast-day">
                    <div>${dayName}</div>
                    <div>${Math.round(day.main.temp)}°C</div>
                    <div>${day.weather[0].main}</div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Weather error:', error);
    }
}

function getWeatherIcon(condition) {
    const icons = {
        'Clear': '☀️', 'Clouds': '☁️', 'Rain': '🌧️',
        'Drizzle': '🌦️', 'Thunderstorm': '⛈️', 'Snow': '❄️', 'Mist': '🌫️'
    };
    return icons[condition] || '🌤️';
}

//Spotlights (randomize gold/silver members)
async function loadSpotlights() {
    const spotlightsGrid = document.getElementById('spotlights-grid');
    if (!spotlightsGrid) return;

    try {
        const response = await fetch('data/members.json');
        const members = await response.json();

        // Filter gold/silver (level 2 & 3)
        const spotlightMembers = members.filter(m => m.level >= 2);
        const numSpotlights = Math.floor(Math.random() * 2) + 2; // 2 or 3
        const selected = spotlightMembers.sort(() => 0.5 - Math.random()).slice(0, numSpotlights);

        spotlightsGrid.innerHTML = selected.map(member => `
            <article class="spotlight-card">
                <div style="height: 150px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; font-size: 3rem; margin-bottom: 1rem;">
                    ${member.name.charAt(0)}
                </div>
                <h3>${member.name}</h3>
                <span class="spotlight-level level-${member.level === 3 ? 'gold' : 'silver'}">
                    ${member.level === 3 ? 'Gold' : 'Silver'} Member
                </span>
                <div style="margin-top: 1rem; color: #666; font-size: 0.9rem;">
                    <div>📞 ${member.phone}</div>
                    <div>📍 ${member.address}</div>
                    <div>🌐 <a href="${member.website}" target="_blank">${member.website}</a></div>
                </div>
            </article>
        `).join('');
    } catch (error) {
        console.error('Spotlights error:', error);
    }
}

// MASTER INITIALIZER
function initPage() {
    updateFooter();
    initMobileMenu();
    initViewToggle();

    // Page-specific features
    if (document.querySelector('.hero')) {
        loadWeather();
        loadSpotlights();
    }

    if (document.getElementById('members-container')) {
        loadDirectoryMembers();
    }
}

// LIST VIEW CSS (injected once)
if (!document.querySelector('#list-view-style')) {
    const style = document.createElement('style');
    style.id = 'list-view-style';
    style.textContent = `
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
    document.head.appendChild(style);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initPage);

// Display form data from URL parameters
function displayFormData() {
    const params = new URLSearchParams(window.location.search);
    const dataDiv = document.getElementById('form-data');

    const requiredFields = {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        phone: 'Phone',
        businessName: 'Business Name',
        timestamp: 'Application Date'
    };

    let html = '<h3 style="margin-bottom: 1.5rem; color: #0066cc;">Application Summary</h3><ul style="text-align: left; max-width: 400px; margin: 0 auto;">';

    Object.keys(requiredFields).forEach(key => {
        const value = params.get(key);
        if (value) {
            html += `<li style="margin-bottom: 0.75rem; padding: 0.5rem; background: white; border-radius: 6px; border-left: 3px solid #0066cc;"><strong>${requiredFields[key]}:</strong> ${decodeURIComponent(value)}</li>`;
        }
    });

    html += '</ul>';
    dataDiv.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', displayFormData);