export function saveCalculation(formData) {
    try {
        const calculations = getCalculations();
        calculations.unshift({
            id: Date.now(),
            timestamp: new Date().toLocaleString('en-NG'),
            ...formData
        });

        localStorage.setItem('chemSimCalculations',
            JSON.stringify(calculations.slice(0, 10)));
    } catch (error) {
        console.error('Storage save error:', error);
    }
}

export function getCalculations() {
    try {
        const stored = localStorage.getItem('chemSimCalculations');
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Storage read error:', error);
        return [];
    }
}

export function clearCalculations() {
    localStorage.removeItem('chemSimCalculations');
}

// Populate results page from storage
export function displayStoredResults(containerId) {
    const container = document.getElementById(containerId);
    const calculations = getCalculations();

    if (calculations.length === 0) {
        container.innerHTML = '<p class="no-results">No calculations saved yet. <a href="index.html#calculator">Try the calculator!</a></p>';
        return;
    }

    calculations.forEach(calc => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `
            <div>
                <strong>${calc.process}</strong><br>
                <small>${calc.timestamp}</small>
            </div>
            <div>${calc.efficiency.toFixed(1)}% Efficiency</div>
        `;
        container.appendChild(resultItem);
    });
}
