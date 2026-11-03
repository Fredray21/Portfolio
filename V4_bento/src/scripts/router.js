const DEFAULT_VIEW = 'accueil';

export default function initRouter(onChange) {
    const views = new Map(
        [...document.querySelectorAll('.view')].map((view) => [view.dataset.view, view])
    );
    const links = document.querySelectorAll('#nav a');
    let current = null;

    function show(name) {
        if (name === current) return;
        const isFirstRender = current === null;
        current = name;

        views.forEach((view, key) => {
            view.hidden = key !== name;
        });

        links.forEach((link) => {
            if (link.hash === `#${name}`) link.setAttribute('aria-current', 'page');
            else link.removeAttribute('aria-current');
        });

        const view = views.get(name);
        document.title = view.dataset.title;

        if (!isFirstRender) {
            window.scrollTo(0, 0);
            view.querySelector('h1').focus({ preventScroll: true });
        }

        onChange(view);
        window.dispatchEvent(new CustomEvent('viewchange', { detail: { name } }));
    }

    function route() {
        const name = location.hash.slice(1);
        if (views.has(name)) show(name);
        else if (current === null) show(DEFAULT_VIEW);
    }

    window.addEventListener('hashchange', route);
    route();
}
