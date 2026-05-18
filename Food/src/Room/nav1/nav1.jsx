import React from "react";

const Nav1 = ({ projects }) => {
  return (
    <div>
      <h2>Проекты</h2>
      {projects.map((project, idx) => (
        <div key={idx} className="project-card">
          <h3>{project.name}</h3>
          <p>Даты: {project.start} — {project.end}</p>
          <p>Сумма: {project.total} сом</p>
          <p>Прибыль компании: {project.profit} сом</p>
        </div>
      ))}
    </div>
  );
};

export default Nav1;