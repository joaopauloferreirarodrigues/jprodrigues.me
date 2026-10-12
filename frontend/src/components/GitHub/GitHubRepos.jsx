import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiExternalLink, FiGitBranch, FiGlobe, FiStar } from "react-icons/fi";
import GITHUB_CONFIG from "../../config/githubConfig";
import { fetchRepos } from "../../services/githubService";
import { languageColor } from "./languageColors";
import useGitHub, { formatDate, formatNumber, visibleRepos } from "./useGitHub";
import "./GitHub.css";

const SORTS = {
  pushed: { label: "github.repos.sortPushed", compare: (a, b) => b.pushedAt.localeCompare(a.pushedAt) },
  stars: { label: "github.repos.sortStars", compare: (a, b) => b.stars - a.stars },
  name: { label: "github.repos.sortName", compare: (a, b) => a.name.localeCompare(b.name) },
};

/**
 * Lista de repositórios em cards, com ordenação, filtro por linguagem e "Ver mais".
 *
 * <GitHubRepos username="joaopauloaramuni" />
 */
export default function GitHubRepos({ username }) {
  const { t } = useTranslation();
  const { status, data } = useGitHub(fetchRepos, username);
  const [sort, setSort] = useState("pushed");
  const [language, setLanguage] = useState("");
  const [limit, setLimit] = useState(GITHUB_CONFIG.REPOS_PER_PAGE);

  const repos = useMemo(() => visibleRepos(data ?? []), [data]);
  const languages = useMemo(
    () => [...new Set(repos.map((r) => r.language).filter(Boolean))].sort(),
    [repos]
  );

  if (status === "loading") return <div className="gh-card gh-skeleton gh-skeleton-block" />;
  if (status === "error") return null;

  const filtered = repos
    .filter((repo) => !language || repo.language === language)
    .sort(SORTS[sort].compare);
  const shown = filtered.slice(0, limit);

  return (
    <section className="gh-repos">
      <div className="gh-repos-head">
        <h3>{t("github.repos.title")}</h3>

        <div className="gh-filters">
          <select value={language} onChange={(e) => setLanguage(e.target.value)} aria-label={t("github.repos.language")}>
            <option value="">{t("github.repos.allLanguages")}</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label={t("github.repos.sortBy")}>
            {Object.entries(SORTS).map(([value, { label }]) => (
              <option key={value} value={value}>
                {t(label)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {shown.length === 0 ? (
        <p className="gh-empty">{t("github.repos.empty")}</p>
      ) : (
        <ul className="gh-repo-grid">
          {shown.map((repo) => (
            <li key={repo.id} className="gh-repo">
              <div className="gh-repo-title">
                <a href={repo.htmlUrl} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
                {repo.homepage && (
                  <a
                    className="gh-repo-home"
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("github.repos.homepageOf", { name: repo.name })}
                    title={t("github.repos.homepage")}
                  >
                    <FiGlobe aria-hidden="true" />
                  </a>
                )}
              </div>

              <p className="gh-repo-desc">{repo.description ?? t("github.repos.noDescription")}</p>

              {repo.topics.length > 0 && (
                <ul className="gh-topics">
                  {repo.topics.slice(0, 3).map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              )}

              <div className="gh-repo-footer">
                {repo.language && (
                  <span>
                    <span className="gh-dot" style={{ background: languageColor(repo.language) }} />
                    {repo.language}
                  </span>
                )}
                <span title={t("github.stats.stars")}>
                  <FiStar aria-hidden="true" /> {formatNumber(repo.stars)}
                </span>
                <span title={t("github.stats.forks")}>
                  <FiGitBranch aria-hidden="true" /> {formatNumber(repo.forks)}
                </span>
                <span className="gh-repo-date">{formatDate(repo.pushedAt)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="gh-repos-actions">
        {limit < filtered.length && (
          <button type="button" className="gh-button" onClick={() => setLimit((n) => n + GITHUB_CONFIG.REPOS_PER_PAGE)}>
            {t("github.repos.more", { count: filtered.length - limit })}
          </button>
        )}
        <a
          className="gh-link"
          href={`https://github.com/${username}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("github.repos.all")} <FiExternalLink aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
