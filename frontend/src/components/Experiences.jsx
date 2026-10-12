import { useTranslation } from "react-i18next";

import { experiences } from "../data/experiences";
import { useLocalized } from "../hooks/useLocalized";
import "./Experiences.css";

export default function Experiences() {
  const { t } = useTranslation();
  const l = useLocalized();

  return (
    <section
      id="experiencias"
      className="section"
      aria-labelledby="experience-title"
    >
      <div className="container">
        <header className="section-head">
          <h2 id="experience-title">{t("experience.title")}</h2>
          <p>{t("experience.intro")}</p>
        </header>

        <ul className="xp-list">
          {experiences.map((xp) => (
            <li key={xp.id} className="xp">
              <p className="xp-period mono">
                {l(xp.start)}
                {" – "}
                {xp.current ? t("experience.present") : l(xp.end)}
              </p>
              <div className="xp-body">
                <h3 className="xp-role">{l(xp.role)}</h3>
                <p className="xp-org">
                  {xp.url ? (
                    <a href={xp.url} target="_blank" rel="noreferrer">
                      {xp.org}
                    </a>
                  ) : (
                    xp.org
                  )}
                </p>
                <p className="xp-desc">{l(xp.description)}</p>
                {xp.skills && (
                  <ul className="tag-list xp-skills">
                    {l(xp.skills).map((skill) => (
                      <li key={skill} className="tag">
                        {skill}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
