import initProjects from './scripts/projects.js';
import initCarousel from './scripts/carousel.js';
import initMusicBlock from './scripts/music.js';
import initNav from './scripts/nav.js';
import initContact from './scripts/contact.js';
import initRouter from './scripts/router.js';
import revealView from './scripts/animation.js';
import initMotions from './scripts/motion.js';
import initCommitHash from './scripts/github.js';

initProjects();
initCarousel();
initMusicBlock();
initNav();
initContact();
initMotions();
initRouter(revealView);
initCommitHash();

const BIRTH_DATE = Date.UTC(2002, 3, 21);

document.querySelector('.age').textContent = `${new Date(Date.now() - BIRTH_DATE).getUTCFullYear() - 1970} ans`;
document.querySelector('.year').textContent = new Date().getFullYear();
