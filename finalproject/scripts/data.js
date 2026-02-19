// ES Module - Data fetching
const DATA_URL = './data/simulations.json';

export async function loadSimulations() {
    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) throw new Error('Network response failed');
        const simulations = await response.json();

        // Dynamic generation with array methods
        const simGrid = document.getElementById('simGrid');
        const html = simulations.slice(0, 15).map(sim => createSimCard(sim)).join('');
        simGrid.innerHTML = html;
    } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('simGrid').innerHTML =
            '<p>Error loading simulations. Please refresh.</p>';
    }
}

export async function loadStats() {
    try {
        const response = await fetch(DATA_URL);
        const data = await response.json();
        const stats = document.getElementById('stats');
        stats.innerHTML = `
            <div>${data.length}+ Simulations</div>
            <div>95% Avg Efficiency</div>
            <div>20+ Processes</div>
        `;
    } catch (error) {
        console.error('Stats error:', error);
    }
}

function createSimCard(sim) {
    // Template literals
    return `
        <article class="sim-card" data-id="${sim.id}">
            <h3>${sim.name}</h3>
            <p><strong>Type:</strong> ${sim.type}</p>
            <p><strong>Efficiency:</strong> ${sim.efficiency}%</p>
            <p><strong>Flow:</strong> ${sim.flowIn}kg/hr → ${sim.flowOut}kg/hr</p>
            <p><strong>Safety:</strong> ${sim.safety}</p>
            <button class="details-btn">View Details</button>
        </article>
    `;
}
