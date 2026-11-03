import { categories, projects } from '../data/projects.js';

const icon = (name) => `<svg aria-hidden="true"><use href="#i-${name}"></use></svg>`;

const renderSlide = (project) => `
    <a class="slider__slide" href="${project.demo ?? project.repo}" target="_blank" rel="noopener">
        <span class="slider__name">${project.name}</span>
        <span class="slider__stack">${project.stack.slice(0, 3).join(' · ')}</span>
    </a>`;

const renderLink = (href, label, iconName) => href
    ? `<a class="project-link" href="${href}" target="_blank" rel="noopener">${icon(iconName)}${label}</a>`
    : '';

const renderCard = (project) => `
    <article class="project-card${project.featured ? ' project-card--featured' : ''}" data-category="${project.category}" data-reveal>
        <h2 class="project-name">${project.name}</h2>
        <p class="project-description">${project.description}</p>
        <ul class="tags">${project.stack.map((tech) => `<li>${tech}</li>`).join('')}</ul>
        <div class="project-links">
            ${renderLink(project.demo, 'Voir le site', 'chevron')}
            ${renderLink(project.repo, 'Code source', 'github')}
        </div>
    </article>`;

function initFilters(container, cards) {
    container.innerHTML = categories.map(({ id, label }) =>
        `<button class="filter" type="button" data-filter="${id}" aria-pressed="${id === 'all'}">${label}</button>`
    ).join('');

    container.addEventListener('click', (event) => {
        const button = event.target.closest('.filter');
        if (!button) return;

        container.querySelectorAll('.filter').forEach((filter) => {
            filter.setAttribute('aria-pressed', filter === button);
        });

        cards.forEach((card) => {
            const { filter } = button.dataset;
            card.hidden = filter !== 'all' && card.dataset.category !== filter;
        });
    });
}

export default function initProjects() {
    document.querySelector('.slider__container').innerHTML = projects
        .filter((project) => project.featured)
        .map(renderSlide)
        .join('');

    const grid = document.querySelector('.projects-grid');
    grid.innerHTML = projects.map(renderCard).join('');

    initFilters(document.querySelector('.filters'), grid.querySelectorAll('.project-card'));
}
