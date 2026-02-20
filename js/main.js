const header = document.querySelector('header');

let mouseX = 0.5;
let mouseY = 0.5;
let currentX = 0.5;
let currentY = 0.5;
let driftT = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
});

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function tick() {
    driftT += 0.003;

    const targetX = mouseX + Math.sin(driftT * 0.7) * 0.04;
    const targetY = mouseY + Math.cos(driftT * 0.5) * 0.04;

    currentX = lerp(currentX, targetX, 0.04);
    currentY = lerp(currentY, targetY, 0.04);

    const hue1 = 80 + currentX * 200;       // 80–280
    const hue2 = hue1 + 60;
    const sat1 = 20 + currentY * 30;        // 20–50%
    const sat2 = 30 + currentX * 20;        // 30–50%
    const light1 = 20 + currentY * 20;      // 20–40%
    const light2 = 35 + currentX * 20;      // 35–55%

    const c1 = `hsl(${hue1}, ${sat1}%, ${light1}%)`;
    const c2 = `hsl(${hue2}, ${sat2}%, ${light2}%)`;
    const angle = 120 + currentX * 80;

    header.style.background = `linear-gradient(${angle}deg, ${c1}, ${c2})`;

    requestAnimationFrame(tick);
}

tick();
