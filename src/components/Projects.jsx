import { useTranslation } from "react-i18next";
import { FaGithub } from "react-icons/fa6";

import { projects } from "../data/projects";
import { useLocalized } from "../hooks/useLocalized";
import "./Projects.css";

export default function Projects() {
  const { t } = useTranslation();
  const l = useLocalized();

  return (
    <section id="projetos" className="section" aria-labelledby="projects-title">
      <div className="container">
        <header className="section-head">
          <h2 id="projects-title">{t("projects.title")}</h2>
          <p>{t("projects.intro")}</p>
        </header>

        {/* Linha do tempo: a lista já vem em ordem cronológica (mais antigo primeiro) */}
        <ol className="timeline">
          {projects.map((project) => (
            <li key={project.id} className="timeline-item">
              <div className="timeline-when mono">
                <span className="timeline-dot" aria-hidden="true" />
                <time>{project.period}</time>
                {project.inProgress && (
                  <span className="timeline-status">
                    {t("projects.inProgress")}
                  </span>
                )}
              </div>

              <article className="project">
                <div className="project-media">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={t("projects.shotAlt", { name: project.name })}
                      loading="lazy"
                      width="640"
                      height="400"
                    />
                  ) : (
                    <div className="project-noshot mono">
                      {t("projects.noShot")}
                    </div>
                  )}
                </div>

                <div className="project-body">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-course">{l(project.course)}</p>
                  <p className="project-desc">{l(project.description)}</p>

                  <h4 className="visually-hidden">{t("projects.tech")}</h4>
                  <ul className="tag-list">
                    {project.tech.map((tech) => (
                      <li key={tech} className="tag">
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <a
                    className="project-repo"
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGithub aria-hidden="true" />
                    {t("projects.repo")}
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
