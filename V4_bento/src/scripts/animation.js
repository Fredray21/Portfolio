import { animate } from "@motionone/dom";

const MAX_STAGGERED_ITEMS = 8;

const keyframes = {
    down: { opacity: [0, 1], y: [-40, 0] },
    up: { opacity: [0, 1], y: [40, 0] },
    left: { opacity: [0, 1], x: [-150, 20, 0] },
    right: { opacity: [0, 1], x: [120, 0] },
};

export default function revealView(view) {
    if (!document.documentElement.classList.contains('anim')) return;

    const isCompact = window.matchMedia('(max-width: 639.98px)').matches;

    view.querySelectorAll('[data-reveal]').forEach((element, index) => {
        const name = isCompact ? 'up' : element.dataset.reveal;

        animate(element, keyframes[name] ?? keyframes.up, {
            duration: 0.45,
            delay: Math.min(index, MAX_STAGGERED_ITEMS) * 0.07,
            easing: 'ease-out',
            fill: 'both',
        });
    });
}
