import { useTranslation } from "react-i18next";
import GITHUB_CONFIG from "../../config/githubConfig";
import { fetchRepos } from "../../services/githubService";
import { languageColor } from "./languageColors";
import useGitHub, { locale, visibleRepos } from "./useGitHub";
import "./GitHub.css";

const percent = (value) =>
  new Intl.NumberFormat(locale(), { style: "percent", maximumFractionDigits: 1 }).format(value);

/**
 * Linguagens mais usadas, contando a linguagem principal de cada repositório.
 * (A REST API devolve uma linguagem por repositório, sem chamadas extras.)
 *
 * <GitHubLanguages username="joaopauloaramuni" />
 */
export default function GitHubLanguages({ username }) {
  const { t } = useTranslation();
  const { status, data } = useGitHub(fetchRepos, username);

  if (status === "loading") return <div className="gh-card gh-skeleton gh-skeleton-block" />;
  if (status === "error") return null;

  // { Java: 9, Python: 3, ... }
  const counts = {};
  for (const repo of visibleRepos(data)) {
    if (repo.language) counts[repo.language] = (counts[repo.language] ?? 0) + 1;
  }
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const languages = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count, share: count / total, color: languageColor(name) }));

  const top = languages.slice(0, GITHUB_CONFIG.MAX_LANGUAGES);
  const rest = languages.slice(GITHUB_CONFIG.MAX_LANGUAGES);
  if (rest.length) {
    const count = rest.reduce((sum, l) => sum + l.count, 0);
    top.push({ name: t("github.languages.others", { count: rest.length }), count, share: count / total, color: "#64748b" });
  }

  return (
    <section className="gh-card">
      <div className="gh-card-head">
        <h3>{t("github.languages.title")}</h3>
        <span className="gh-card-note">{t("github.languages.note", { count: total })}</span>
      </div>

      {total === 0 ? (
        <p className="gh-empty">{t("github.languages.empty")}</p>
      ) : (
        <>
          <div className="gh-stack" aria-hidden="true">
            {top.map((lang) => (
              <span
                key={lang.name}
                style={{ flexGrow: lang.count, background: lang.color }}
                title={`${lang.name}: ${lang.count}`}
              />
            ))}
          </div>

          <ul className="gh-legend">
            {top.map((lang) => (
              <li key={lang.name}>
                <span className="gh-dot" style={{ background: lang.color }} aria-hidden="true" />
                <span className="gh-legend-name">{lang.name}</span>
                <span className="gh-legend-value">
                  {lang.count} · {percent(lang.share)}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
