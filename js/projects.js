fetch('projects.json')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('projects-list');

    data.projects.forEach(project => {
      const row = document.createElement('a');
      row.className = 'project-row';
      row.href = project.link;
      row.target = '_blank';
      row.rel = 'noopener noreferrer';

      row.innerHTML = `
        <span class="project-row-label">Project</span>
        <div class="project-row-content">
          <div class="project-row-title">${project.title}</div>
          <div class="project-row-role">${project.role}</div>
          <div class="project-row-meta">${project.date} — ${project.image.source}</div>
          <span class="project-row-link">[View →]</span>
        </div>
      `;

      list.appendChild(row);
    });
  });
