const header = document.querySelector('header');

let mouseX = 0.5;
let mouseY = 0.5;
let currentX = 0.5;
let currentY = 0.5;

// Slow drift when no mouse movement
let driftT = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
});

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function hsl(h, s, l) {
    return `hsl(${h}, ${s}%, ${l}%)`;
}

function tick() {
    driftT += 0.003;

    // Drift slowly when mouse isn't moving
    const targetX = mouseX + Math.sin(driftT * 0.7) * 0.05;
    const targetY = mouseY + Math.cos(driftT * 0.5) * 0.05;

    currentX = lerp(currentX, targetX, 0.04);
    currentY = lerp(currentY, targetY, 0.04);

    // Map position to hue/lightness ranges
    const hue1 = 180 + currentX * 120;        // 180–300 (teal → purple)
    const hue2 = hue1 + 40 + currentY * 60;   // offset hue
    const light1 = 10 + currentY * 15;         // 10–25%
    const light2 = 25 + currentX * 20;         // 25–45%

    const color1 = hsl(hue1, 30, light1);
    const color2 = hsl(hue2, 40, light2);
    const color3 = hsl(hue1 - 30, 20, 8);

    const angle = 120 + currentX * 60;

    header.style.background = `linear-gradient(${angle}deg, ${color3} 0%, ${color1} 45%, ${color2} 100%)`;

    requestAnimationFrame(tick);
}

tick();
