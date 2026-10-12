import { useTranslation } from "react-i18next";

import SKILLS, { CATEGORIES } from "../data/skills";
import SkillsSection from "./SkillsGlobe/SkillsSection";

export default function Skills() {
  const { t } = useTranslation();

  return (
    <section id="habilidades" className="section" aria-labelledby="skills-title">
      <div className="container">
        <header className="section-head">
          <h2 id="skills-title">{t("skills.title")}</h2>
          <p>{t("skills.intro")}</p>
        </header>
        <SkillsSection skills={SKILLS} categories={CATEGORIES} />
      </div>
    </section>
  );
}
