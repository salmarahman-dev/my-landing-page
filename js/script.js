

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- FEATURE 1: MOBILE NAVIGATION ---------- */
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');

    const closeMobileNav = () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    };

    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close the drawer when a link is tapped (better mobile UX)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMobileNav();
    });


    /* ---------- FEATURE 2: DARK / LIGHT MODE ---------- */
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Remember the choice across reloads
    const savedTheme = localStorage.getItem('bakery-theme');
    if (savedTheme === 'dark') body.classList.add('dark-mode');
    themeToggle.setAttribute('aria-label', savedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('bakery-theme', isDark ? 'dark' : 'light');
        themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    });

    /* ---------- FEATURE 3: SHOW MORE MENU ITEMS ---------- */
    const seeMoreButton = document.getElementById('seeMore');
    const extraProducts = document.querySelectorAll('.extra-product');
    seeMoreButton.addEventListener('click', () => {
        const expanded = seeMoreButton.getAttribute('aria-expanded') === 'true';
        extraProducts.forEach(card => { card.hidden = expanded; });
        seeMoreButton.setAttribute('aria-expanded', String(!expanded));
        seeMoreButton.textContent = expanded ? 'See more' : 'Show fewer';
    });


    /* ---------- FEATURE 4: ORDER MODAL ---------- */
    const modal        = document.getElementById('modal');
    const modalText    = document.getElementById('modalText');
    const modalConfirm = document.getElementById('modalConfirm');
    const closeModal   = document.getElementById('closeModal');
    const orderButtons = document.getElementById('menuGrid');

    const openModal = (itemName) => {
        modalText.textContent = `${itemName} has been added to your order.`;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // lock background scroll
        closeModal.focus();                       // move focus into the dialog
    };

    const hideModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    orderButtons.addEventListener('click', (event) => {
        const button = event.target.closest('.order-btn');
        if (button) openModal(button.dataset.item);
    });

    closeModal.addEventListener('click', hideModal);
    modalConfirm.addEventListener('click', hideModal);

    // Click on the dark backdrop closes it too
    modal.addEventListener('click', (e) => {
        if (e.target === modal) hideModal();
    });

    // Escape closes the modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) hideModal();
    });


    /* ---------- FEATURE 5: CONTACT FORM VALIDATION ---------- */
    const form     = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');
    const nameEl   = document.getElementById('name');
    const emailEl  = document.getElementById('email');
    const msgEl    = document.getElementById('message');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const showFeedback = (message, type) => {
        feedback.textContent = message;
        feedback.className = `feedback ${type}`;
    };

    const clearFieldError = (el) => el.classList.remove('error');

    [nameEl, emailEl, msgEl].forEach(el => {
        el.addEventListener('input', () => clearFieldError(el));
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();               // stop page reload
        let valid = true;
        let firstInvalid = null;

        [nameEl, emailEl, msgEl].forEach(el => clearFieldError(el));

        if (nameEl.value.trim().length < 2) {
            nameEl.classList.add('error');
            valid = false;
            firstInvalid = firstInvalid || nameEl;
        }
        if (!emailRegex.test(emailEl.value.trim())) {
            emailEl.classList.add('error');
            valid = false;
            firstInvalid = firstInvalid || emailEl;
        }
        if (msgEl.value.trim().length < 10) {
            msgEl.classList.add('error');
            valid = false;
            firstInvalid = firstInvalid || msgEl;
        }

        if (!valid) {
            showFeedback('Please check the highlighted fields.', 'error');
            firstInvalid?.focus();
            return;
        }

        // Simulated success (no backend in this assignment)
        showFeedback(`Thank you, ${nameEl.value.trim().split(' ')[0]}! We'll reply within 24 hours.`, 'success');
        form.reset();
    });
});







