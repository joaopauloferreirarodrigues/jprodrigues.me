import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiGlobe, FiGrid } from "react-icons/fi";
import SkillsGlobe from "./SkillsGlobe";
import "./SkillsSection.css";

/**
 * Seção completa de habilidades: filtro por categoria + alternância
 * entre o globo 3D e uma lista em grade (mais acessível e boa para celular).
 * Componente do projeto SkillsGlobe (React) da disciplina DIAW, com textos em pt/en.
 *
 * <SkillsSection skills={SKILLS} categories={CATEGORIES} />
 */
export default function SkillsSection({ skills, categories }) {
  const { t } = useTranslation();
  const [category, setCategory] = useState("all");
  const [view, setView] = useState("globo");

  const filtered = category === "all" ? skills : skills.filter((s) => s.category === category);
  const count = (cat) => (cat === "all" ? skills.length : skills.filter((s) => s.category === cat).length);
  const label = (cat) => (cat === "all" ? t("skills.all") : t(`skills.categories.${cat}`, cat));

  return (
    <div className="skills-section">
      <div className="skills-toolbar">
        <div className="skills-chips" role="group" aria-label={t("skills.category")}>
          {["all", ...categories].map((cat) => (
            <button
              key={cat}
              type="button"
              className={cat === category ? "active" : ""}
              aria-pressed={cat === category}
              onClick={() => setCategory(cat)}
            >
              {label(cat)} <span>{count(cat)}</span>
            </button>
          ))}
        </div>

        <div className="skills-view" role="group" aria-label={t("skills.view")}>
          <button
            type="button"
            className={view === "globo" ? "active" : ""}
            aria-pressed={view === "globo"}
            onClick={() => setView("globo")}
          >
            <FiGlobe aria-hidden="true" /> {t("skills.globe")}
          </button>
          <button
            type="button"
            className={view === "lista" ? "active" : ""}
            aria-pressed={view === "lista"}
            onClick={() => setView("lista")}
          >
            <FiGrid aria-hidden="true" /> {t("skills.list")}
          </button>
        </div>
      </div>

      {view === "globo" ? (
        <>
          {/* key: ao trocar de categoria o globo recomeça com os novos pontos */}
          <SkillsGlobe key={category} skills={filtered} color="#5cc8d7" label={t("skills.label")} />
          <p className="skills-hint">{t("skills.hint")}</p>
        </>
      ) : (
        <ul className="skills-grid">
          {filtered.map((skill) => {
            const Icon = skill.icon;
            return (
              <li key={skill.name}>
                <a href={skill.link} target="_blank" rel="noopener noreferrer" style={{ "--skill": skill.color }}>
                  <Icon aria-hidden="true" />
                  <span>{skill.name}</span>
                  <small>{label(skill.category)}</small>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
