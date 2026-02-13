//  FOOTER UPDATE FUNCTION 
function updateFooter() {
    // Update current year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();  // Shows 2026
    }

    const lastModSpan = document.getElementById('last-modified');
    if (lastModSpan) {
        lastModSpan.textContent = `Last Modified: ${new Date(document.lastModified).toLocaleDateString()}`;
        
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    updateFooter();

    const lastVisitKey = 'lcci-discover-last-visit';
    const visitMessage = document.getElementById('visit-message');

    if (visitMessage) {
        const lastVisit = localStorage.getItem(lastVisitKey);
        const now = Date.now();
        let message = '';

        if (!lastVisit) {
            message = 'Welcome! Let us know if you have any questions.';
            visitMessage.className = 'visit-message welcome show';
        } else {
            const daysDiff = Math.floor((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
            if (daysDiff === 0) {
                message = 'Back so soon! Awesome!';
                visitMessage.className = 'visit-message recent show';
            } else {
                message = `You last visited ${daysDiff} ${daysDiff === 1 ? 'day' : 'days'} ago.`;
                visitMessage.className = 'visit-message days show';
            }
        }
        visitMessage.textContent = message;
        localStorage.setItem(lastVisitKey, now.toString());
    }

    // Load discover grid 
    const grid = document.getElementById('discover-grid');
    if (grid) {
        try {
            const { discoverItems } = await import('../data/discover.mjs');
            grid.innerHTML = discoverItems.map((item, index) => `
                <article class="discover-card card-${index + 1}">
                    <img src="images/${item.image}" 
                         alt="${item.name}" 
                         class="card-image" 
                         loading="lazy" 
                         width="300" 
                         height="200">
                    <div class="card-content">
                        <h2 class="card-title">${item.name}</h2>
                        <address class="card-address">${item.address}</address>
                        <p class="card-description">${item.description}</p>
                        <button class="learn-more-btn">Learn More</button>
                    </div>
                </article>
            `).join('');
        } catch (error) {
            console.log('Using fallback cards (no data file needed)');
            // FALLBACK: 8 cards
            const fallbackItems = [
                { name: "Lekki Conservation Centre", address: "Lekki-Epe Expressway", desc: "Canopy walkway", img: "🏛️" },
                { name: "Nike Art Gallery", address: "Lekki Phase 1", desc: "Largest art collection", img: "🎨" },
                { name: "Freedom Park", address: "Lagos Island", desc: "Cultural hub", img: "🎭" },
                { name: "Tara Breadery", address: "Victoria Island", desc: "Artisanal bakery", img: "🍞" },
                { name: "Eko Atlantic", address: "Victoria Island", desc: "Futuristic city", img: "🏙️" },
                { name: "Terra Kulture", address: "Victoria Island", desc: "Cultural center", img: "🎪" },
                { name: "Motor Boat Club", address: "Ikoyi", desc: "Waterfront networking", img: "⛵" },
                { name: "Jezco Beach", address: "Elegushi", desc: "Private beach resort", img: "🏖️" }
            ];

            grid.innerHTML = fallbackItems.map((item, index) => `
                <article class="discover-card card-${index + 1}">
                    <div style="height:200px;background:linear-gradient(45deg,#f0f0f0,#e0e0e0);display:flex;align-items:center;justify-content:center;font-size:3rem;color:#666;">
                        ${item.img}
                    </div>
                    <div class="card-content">
                        <h2 class="card-title">${item.name}</h2>
                        <address class="card-address">${item.address}</address>
                        <p class="card-description">${item.desc}</p>
                        <button class="learn-more-btn" onclick="alert('Learn more about ${item.name}!')">Learn More</button>
                    </div>
                </article>
            `).join('');
        }
    }
});
