import { useTranslation } from "react-i18next";
import { FiBookOpen, FiGitBranch, FiStar, FiUsers } from "react-icons/fi";
import { fetchProfile, fetchRepos } from "../../services/githubService";
import useGitHub, { formatNumber, visibleRepos } from "./useGitHub";
import "./GitHub.css";

/**
 * Indicadores: repositórios, estrelas recebidas, forks e seguidores.
 *
 * <GitHubStats username="joaopauloaramuni" />
 */
export default function GitHubStats({ username }) {
  const { t } = useTranslation();
  const profile = useGitHub(fetchProfile, username);
  const repos = useGitHub(fetchRepos, username);

  if (profile.status === "loading" || repos.status === "loading") {
    return (
      <ul className="gh-kpis">
        {[0, 1, 2, 3].map((i) => (
          <li key={i} className="gh-kpi gh-skeleton" />
        ))}
      </ul>
    );
  }
  if (profile.status === "error" || repos.status === "error") return null;

  const list = visibleRepos(repos.data);
  const stars = list.reduce((sum, repo) => sum + repo.stars, 0);
  const forks = list.reduce((sum, repo) => sum + repo.forks, 0);
  const mostStarred = [...list].sort((a, b) => b.stars - a.stars)[0];

  const items = [
    {
      icon: FiBookOpen,
      label: t("github.stats.repos"),
      value: formatNumber(profile.data.publicRepos),
      note: t("github.stats.public"),
    },
    {
      icon: FiStar,
      label: t("github.stats.stars"),
      value: formatNumber(stars),
      note: mostStarred && mostStarred.stars > 0 ? t("github.stats.mostStarred", { name: mostStarred.name }) : null,
    },
    { icon: FiGitBranch, label: t("github.stats.forks"), value: formatNumber(forks), note: t("github.stats.forksNote") },
    {
      icon: FiUsers,
      label: t("github.stats.followers"),
      value: formatNumber(profile.data.followers),
      note: t("github.stats.following", { value: formatNumber(profile.data.following) }),
    },
  ];

  return (
    <ul className="gh-kpis">
      {items.map(({ icon: Icon, label, value, note }) => (
        <li key={label} className="gh-kpi">
          <span className="gh-kpi-label">
            <Icon aria-hidden="true" /> {label}
          </span>
          <span className="gh-kpi-value">{value}</span>
          {note && (
            <span className="gh-kpi-note" title={note}>
              {note}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
