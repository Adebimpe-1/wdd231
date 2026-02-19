// MODAL FUNCTIONALITY
export function initModals() {
    const modals = document.querySelectorAll('.modal');
    const openTriggers = document.querySelectorAll('[data-modal]');
    const closeTriggers = document.querySelectorAll('.close-modal');

    // Open modals
    openTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeTriggers.forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const modal = closeBtn.closest('.modal');
            closeModal(modal);
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    closeModal(modal);
                }
            });
        }
    });
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}
