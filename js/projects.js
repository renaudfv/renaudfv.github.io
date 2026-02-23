// ── Image preview tooltip ──────────────────────────────────────
const preview = document.createElement('div');
preview.id = 'img-preview';
preview.style.cssText = `
  position: fixed;
  pointer-events: none;
  z-index: 200;
  opacity: 0;
  transition: opacity 0.18s ease;
  width: 260px;
  aspect-ratio: 16/10;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
`;
const previewImg = document.createElement('img');
previewImg.style.cssText = `
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;
preview.appendChild(previewImg);
document.body.appendChild(preview);

let cursorX = 0, cursorY = 0;
document.addEventListener('mousemove', e => {
  cursorX = e.clientX;
  cursorY = e.clientY;
  positionPreview();
});

function positionPreview() {
  const pad = 18;
  const pw = 260, ph = 163;
  let x = cursorX + pad;
  let y = cursorY + pad;
  if (x + pw > window.innerWidth)  x = cursorX - pw - pad;
  if (y + ph > window.innerHeight) y = cursorY - ph - pad;
  preview.style.left = x + 'px';
  preview.style.top  = y + 'px';
}

// ── Render projects ────────────────────────────────────────────
fetch('projects.json')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('projects-list');

    data.projects.forEach(project => {
      const row = document.createElement('div');
      row.className = 'project-row';

      const hasImage = project.image && project.image.src;
      if (!hasImage) row.dataset.noImage = '1';

      const label = project.employer || 'Project';

      const detailBlock = project.detail
        ? `<div class="project-row-detail">${project.detail}</div>`
        : `<div class="project-row-detail project-row-detail--empty">— to be written —</div>`;

      const linkEl = project.link
        ? `<a class="project-row-link" href="${project.link}" target="_blank" rel="noopener noreferrer">View ↗</a>`
        : '';

      row.innerHTML = `
        <div class="project-row-label">${label}</div>
        <div class="project-row-content">
          <div class="project-row-top">
            <div class="project-row-titles">
              <div class="project-row-title">${project.title}</div>
              <div class="project-row-role">${project.role}</div>
              <div class="project-row-meta">${project.date}</div>
            </div>
            ${linkEl}
          </div>
          ${detailBlock}
        </div>
      `;

      // Image hover
      if (hasImage) {
        row.addEventListener('mouseenter', () => {
          previewImg.src = project.image.src;
          positionPreview();
          preview.style.opacity = '1';
          // Tell main.js: slow orbs
          window.__orbBoost = 1;
        });
        row.addEventListener('mouseleave', () => {
          preview.style.opacity = '0';
          window.__orbBoost = 1;
        });
      } else {
        // No image — boost orb speed on hover
        row.addEventListener('mouseenter', () => { window.__orbBoost = 4; });
        row.addEventListener('mouseleave', () => { window.__orbBoost = 1; });
      }

      list.appendChild(row);
    });
  });
