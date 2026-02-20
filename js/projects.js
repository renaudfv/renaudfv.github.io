fetch('projects.json')
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById('projects-grid');

    data.projects.forEach(project => {
      const card = document.createElement('a');
      card.className = 'project-card';
      card.href = project.link;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';

      const imgHTML = project.image.src
        ? `<div class="project-img" style="background-image: url('${project.image.src}')"></div>`
        : `<div class="project-img project-img--empty"></div>`;

      card.innerHTML = `
        ${imgHTML}
        <div class="project-meta">
          <span class="project-meta-label">Project</span>
          <span class="project-meta-value is-title">${project.title}</span>

          <span class="project-meta-label">Role</span>
          <span class="project-meta-value is-role">${project.role}</span>

          <span class="project-meta-label">Year</span>
          <span class="project-meta-value">${project.date}</span>

          <span class="project-meta-label">Source</span>
          <span class="project-meta-value is-source">${project.image.source}</span>
        </div>
      `;

      grid.appendChild(card);
    });
  });
