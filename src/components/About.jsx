import { useTranslation } from "react-i18next";

import { profile } from "../data/profile";
import "./About.css";

export default function About() {
  const { t } = useTranslation();
  const bio = t("about.bio", { returnObjects: true });
  const log = t("about.log", { returnObjects: true });

  return (
    <section id="sobre" className="about" aria-labelledby="about-title">
      <div className="container about-grid">
        <div className="about-text">
          <p className="about-greeting">{t("about.greeting")}</p>
          <h1 id="about-title" className="about-name">
            <span>João Paulo</span> <span>Ferreira Rodrigues</span>
          </h1>
          <p className="about-lead">{t("about.lead")}</p>

          <div className="about-bio">
            {bio.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <div className="about-actions">
            <a className="button button-primary" href="#contato">
              {t("about.cta")}
            </a>
            <a className="button button-ghost" href="#projetos">
              {t("about.ctaProjects")}
            </a>
          </div>
        </div>

        <aside className="about-side">
          <figure className="photo-frame">
            {profile.photo ? (
              <img
                src={profile.photo}
                alt={t("about.photoAlt")}
                width="320"
                height="380"
              />
            ) : (
              <div className="photo-placeholder mono" aria-hidden="true">
                JP
              </div>
            )}
          </figure>

          <div className="log" aria-labelledby="log-title">
            <h2 id="log-title" className="log-title mono">
              {t("about.logTitle")}
            </h2>
            <ol className="log-list">
              {log.map((entry) => (
                <li key={entry.text} className={`log-row log-${entry.status}`}>
                  <span className="log-status mono">[{entry.label}]</span>
                  <span className="log-text">{entry.text}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="stack">
            <h2 className="stack-title">{t("about.stackTitle")}</h2>
            <ul className="tag-list">
              {profile.stack.map((tech) => (
                <li key={tech} className="tag">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
