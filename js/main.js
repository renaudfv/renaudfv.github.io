const header = document.querySelector('.bg');

let mouseX = 0.5;
let mouseY = 0.5;

// Each "orb" has its own current position, target, drift phase, and color
const orbs = [
    { cx: 0.3, cy: 0.3, tx: 0.3, ty: 0.3, phase: 0,    speed: 0.0007, radius: '60%',  parallax: 0.12, h: 200, s: 40, l: 18 },
    { cx: 0.7, cy: 0.5, tx: 0.7, ty: 0.5, phase: 2.1,  speed: 0.0011, radius: '50%',  parallax: 0.08, h: 260, s: 30, l: 22 },
    { cx: 0.5, cy: 0.8, tx: 0.5, ty: 0.8, phase: 4.3,  speed: 0.0009, radius: '55%',  parallax: 0.15, h: 180, s: 25, l: 14 },
    { cx: 0.2, cy: 0.7, tx: 0.2, ty: 0.7, phase: 1.1,  speed: 0.0013, radius: '40%',  parallax: 0.06, h: 300, s: 20, l: 20 },
    { cx: 0.8, cy: 0.2, tx: 0.8, ty: 0.2, phase: 3.5,  speed: 0.0008, radius: '45%',  parallax: 0.10, h: 220, s: 35, l: 12 },
];

let t = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
});

function lerp(a, b, f) { return a + (b - a) * f; }

function tick() {
    t += 1;

    orbs.forEach((orb, i) => {
        // Autonomous drift — each orb wanders on its own Lissajous path
        const driftX = Math.sin(t * orb.speed * 1.3 + orb.phase) * 0.18;
        const driftY = Math.cos(t * orb.speed + orb.phase * 1.7) * 0.14;

        // Mouse parallax — closer orbs react more
        orb.tx = 0.5 + driftX + (mouseX - 0.5) * orb.parallax;
        orb.ty = 0.5 + driftY + (mouseY - 0.5) * orb.parallax;

        orb.cx = lerp(orb.cx, orb.tx, 0.025);
        orb.cy = lerp(orb.cy, orb.ty, 0.025);

        // Hue slowly drifts over time
        orb.h += 0.04;
    });

    // Base dark background shifts subtly with mouse
    const bgH = 210 + mouseX * 30;
    const bgL = 4 + mouseY * 4;

    // Build layered radial gradients
    const gradients = orbs.map(orb => {
        const x = (orb.cx * 100).toFixed(1);
        const y = (orb.cy * 100).toFixed(1);
        const h = orb.h % 360;
        return `radial-gradient(ellipse ${orb.radius} at ${x}% ${y}%, hsl(${h}, ${orb.s}%, ${orb.l}%) 0%, transparent 70%)`;
    });

    // Add a base linear gradient for depth
    const angle = 140 + mouseX * 40;
    gradients.push(`linear-gradient(${angle}deg, hsl(${bgH}, 25%, ${bgL}%) 0%, hsl(${bgH + 40}, 20%, ${bgL + 6}%) 100%)`);

    header.style.background = gradients.join(', ');

    requestAnimationFrame(tick);
}

tick();
