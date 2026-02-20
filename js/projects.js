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
        <div class="project-info">
          <span class="project-info-label">Project</span>
          <span class="project-info-value project-title">${project.title}</span>

          <span class="project-info-label">Role</span>
          <span class="project-info-value project-role">${project.role}</span>

          <span class="project-info-label">Year</span>
          <span class="project-info-value">${project.date}</span>

          <span class="project-info-label">Source</span>
          <span class="project-info-value project-source">${project.image.source}</span>
        </div>
      `;

      grid.appendChild(card);
    });
  });
