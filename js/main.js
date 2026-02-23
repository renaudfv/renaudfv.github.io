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

// Orbs — saturated colors, moderate lightness, drawn on light base
// so they read as soft color washes rather than glows
const orbs = [
  { x: 0.25, y: 0.25, phase: 0,   spd: 0.00035, rx: 0.28, ry: 0.22, h: 195, s: 70, l: 65, a: 0.30 },
  { x: 0.75, y: 0.45, phase: 2.0, spd: 0.00048, rx: 0.22, ry: 0.26, h: 340, s: 60, l: 70, a: 0.25 },
  { x: 0.50, y: 0.80, phase: 4.1, spd: 0.00040, rx: 0.30, ry: 0.20, h: 50,  s: 75, l: 68, a: 0.28 },
  { x: 0.15, y: 0.60, phase: 1.3, spd: 0.00055, rx: 0.20, ry: 0.24, h: 270, s: 55, l: 72, a: 0.22 },
  { x: 0.85, y: 0.20, phase: 3.3, spd: 0.00042, rx: 0.24, ry: 0.22, h: 160, s: 65, l: 66, a: 0.26 },
];

function draw() {
  t++;

  mouseX = lerp(mouseX, targetMouseX, 0.04);
  mouseY = lerp(mouseY, targetMouseY, 0.04);

  // Warm off-white base
  ctx.fillStyle = '#f5f3ef';
  ctx.fillRect(0, 0, W, H);

  // Additive-ish blending: multiply mode makes colors deepen on overlap
  ctx.globalCompositeOperation = 'multiply';

  orbs.forEach(orb => {
    const dx = Math.sin(t * orb.spd * 1.4 + orb.phase) * orb.rx;
    const dy = Math.cos(t * orb.spd + orb.phase * 1.6) * orb.ry;

    const px = (mouseX - 0.5) * 0.10;
    const py = (mouseY - 0.5) * 0.08;

    const cx = (0.5 + dx + px) * W;
    const cy = (0.5 + dy + py) * H;

    const rx = W * 0.48;
    const ry = H * 0.44;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(1, ry / rx);

    orb.h = (orb.h + 0.020) % 360;

    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
    g.addColorStop(0,   `hsla(${orb.h}, ${orb.s}%, ${orb.l}%, ${orb.a})`);
    g.addColorStop(0.5, `hsla(${orb.h}, ${orb.s}%, ${orb.l + 10}%, ${orb.a * 0.4})`);
    g.addColorStop(1,   `hsla(${orb.h}, ${orb.s}%, 97%, 0)`);

    ctx.fillStyle = g;
    ctx.fillRect(-rx, -rx * (rx / ry), rx * 2, rx * 2 * (rx / ry));
    ctx.restore();
  });

  ctx.globalCompositeOperation = 'source-over';

  requestAnimationFrame(draw);
}

draw();
