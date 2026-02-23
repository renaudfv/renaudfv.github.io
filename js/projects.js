fetch('projects.json')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('projects-list');

    data.projects.forEach(project => {
      const row = document.createElement('div');
      row.className = 'project-row';

      const detailHTML = `
        <div class="project-row-detail${project.detail ? '' : ' project-row-detail--empty'}">
          ${project.detail || '<span class="project-row-detail-placeholder">— description to be written —</span>'}
        </div>
      `;

      row.innerHTML = `
        <span class="project-row-label">Project</span>
        <div class="project-row-content">
          <div class="project-row-top">
            <div>
              <div class="project-row-title">${project.title}</div>
              <div class="project-row-role">${project.role}</div>
              <div class="project-row-meta">${project.date} — ${project.image.source}</div>
            </div>
            ${project.link ? `<a class="project-row-link" href="${project.link}" target="_blank" rel="noopener noreferrer">[View →]</a>` : ''}
          </div>
          ${detailHTML}
        </div>
      `;

      list.appendChild(row);
    });
  });
