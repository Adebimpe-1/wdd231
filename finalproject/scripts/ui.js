export function initNav() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !expanded);
        nav.classList.toggle('open');
    });
}

export function initStorage() {
    // LocalStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.dataset.theme = savedTheme;

    document.addEventListener('keydown', (e) => {
        if (e.key === 't') {
            const current = localStorage.getItem('theme');
            const next = current === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', next);
            document.body.dataset.theme = next;
        }
    });
}

export function setupSearchFilter() {
    const search = document.getElementById('search');
    const filter = document.getElementById('filter');

    function filterSims() {
        const cards = document.querySelectorAll('.sim-card');
        const term = search.value.toLowerCase();
        const type = filter.value;

        cards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const simType = card.dataset.type || '';

            const matchesSearch = name.includes(term);
            const matchesType = !type || simType === type;

            card.style.display = matchesSearch && matchesType ? 'block' : 'none';
        });
    }

    search.addEventListener('input', filterSims);
    filter.addEventListener('change', filterSims);
}
