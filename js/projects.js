fetch('projects.json')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('projects-list');

    data.projects.forEach(project => {
      const row = document.createElement('div');
      row.className = 'project-row';

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

      list.appendChild(row);
    });
  });
