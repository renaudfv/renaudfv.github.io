const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');

let W, H;
let mouseX = 0.5, mouseY = 0.5;
let targetMouseX = 0.5, targetMouseY = 0.5;
let t = 0;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

document.addEventListener('mousemove', e => {
  targetMouseX = e.clientX / window.innerWidth;
  targetMouseY = e.clientY / window.innerHeight;
});

function lerp(a, b, f) { return a + (b - a) * f; }

// Orbs — higher lightness so they're actually visible on dark bg
const orbs = [
  { x: 0.25, y: 0.25, phase: 0,   spd: 0.00035, rx: 0.22, ry: 0.18, h: 195, s: 55, l: 32, a: 0.55 },
  { x: 0.75, y: 0.45, phase: 2.0, spd: 0.00048, rx: 0.18, ry: 0.22, h: 245, s: 45, l: 28, a: 0.50 },
  { x: 0.50, y: 0.80, phase: 4.1, spd: 0.00040, rx: 0.25, ry: 0.16, h: 175, s: 40, l: 24, a: 0.45 },
  { x: 0.15, y: 0.65, phase: 1.3, spd: 0.00055, rx: 0.16, ry: 0.20, h: 290, s: 35, l: 30, a: 0.40 },
  { x: 0.85, y: 0.20, phase: 3.3, spd: 0.00042, rx: 0.20, ry: 0.18, h: 220, s: 50, l: 26, a: 0.48 },
];

function draw() {
  t++;

  // Smooth mouse
  mouseX = lerp(mouseX, targetMouseX, 0.04);
  mouseY = lerp(mouseY, targetMouseY, 0.04);

  // Dark base
  ctx.fillStyle = '#080a0c';
  ctx.fillRect(0, 0, W, H);

  // Draw each orb as a radial gradient
  orbs.forEach(orb => {
    // Slow autonomous drift
    const dx = Math.sin(t * orb.spd * 1.4 + orb.phase) * orb.rx;
    const dy = Math.cos(t * orb.spd + orb.phase * 1.6) * orb.ry;

    // Mouse parallax (subtle)
    const px = (mouseX - 0.5) * 0.10;
    const py = (mouseY - 0.5) * 0.08;

    const cx = (0.5 + dx + px) * W;
    const cy = (0.5 + dy + py) * H;

    // Elliptical gradient via scale transform
    const rx = W * 0.42;
    const ry = H * 0.38;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(1, ry / rx);

    // Slowly rotate hue
    orb.h = (orb.h + 0.025) % 360;

    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
    g.addColorStop(0,   `hsla(${orb.h}, ${orb.s}%, ${orb.l}%, ${orb.a})`);
    g.addColorStop(0.5, `hsla(${orb.h}, ${orb.s}%, ${orb.l * 0.6}%, ${orb.a * 0.4})`);
    g.addColorStop(1,   `hsla(${orb.h}, ${orb.s}%, 0%, 0)`);

    ctx.fillStyle = g;
    ctx.fillRect(-rx, -rx * (rx / ry), rx * 2, rx * 2 * (rx / ry));
    ctx.restore();
  });

  // Very subtle noise grain via tiny semi-transparent pixels
  // (skip for perf on slow devices — just use the smooth orbs)

  requestAnimationFrame(draw);
}

draw();
