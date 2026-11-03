import { animate } from '@motionone/dom';

export default function initMotions() {
    const canHover = window.matchMedia('(hover: hover) and (min-width: 960px) and (prefers-reduced-motion: no-preference)');

    const hoverEffects = {
        "#block1": { scale: 1.02, rotateZ: -0.5 },
        "#block2": { scale: 1.03, rotateZ: 2 },
        "#block3": { scale: 1.03, rotateY: 5 },
        "#block4": { scale: 1.02, y: -4 },
        "#block5": { scale: 1.04, rotateZ: -2 },
        "#block6": { scale: 1.1, rotateZ: -2, x: 4 },
    };

    for (const [selector, effect] of Object.entries(hoverEffects)) {
        const el = document.querySelector(selector);

        el.addEventListener("mouseenter", () => {
            if (!canHover.matches) return;
            animate(el, effect, {
                duration: 0.3,
                easing: "ease-out"
            });
        });

        el.addEventListener("mouseleave", () => {
            if (!canHover.matches) return;
            const reset = {};
            for (const prop in effect) {
                reset[prop] = prop === "scale" ? 1 : 0;
            }

            animate(el, reset, {
                duration: 0.3,
                easing: "ease-out"
            });
        });
    }
}
