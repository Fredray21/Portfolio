export default function initNav() {
    const burger = document.querySelector('#burger');
    const nav = document.querySelector('#nav');

    const setOpen = (open) => {
        nav.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', open);
    };

    burger.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
    nav.addEventListener('click', (event) => {
        if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('#nav, #burger')) setOpen(false);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && nav.classList.contains('open')) {
            setOpen(false);
            burger.focus();
        }
    });
}
