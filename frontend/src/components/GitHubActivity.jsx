import { useTranslation } from "react-i18next";
import { FaGithub } from "react-icons/fa6";

import GITHUB_CONFIG from "../config/githubConfig";
import { fetchProfile } from "../services/githubService";
import useGitHub from "./GitHub/useGitHub";
import GitHubStats from "./GitHub/GitHubStats";
import GitHubContributions from "./GitHub/GitHubContributions";
import GitHubLanguages from "./GitHub/GitHubLanguages";
import GitHubRepos from "./GitHub/GitHubRepos";
import "./GitHub/GitHub.css";
import "./GitHubActivity.css";

/**
 * Painel ao vivo do GitHub, montado com os componentes do projeto GitHubAPI
 * da disciplina DIAW. Os dados vêm da rota /api/github (api/_github.js).
 */
export default function GitHubActivity() {
  const { t } = useTranslation();
  const username = GITHUB_CONFIG.USERNAME;
  const profile = useGitHub(fetchProfile, username);
  const profileUrl = `https://github.com/${username}`;

  return (
    <div className="github-activity" aria-labelledby="github-title">
      <header className="github-activity-head">
        <h3 id="github-title">{t("github.title")}</h3>
        <p>{t("github.intro")}</p>
      </header>

      {profile.status === "error" ? (
        <p className="github-activity-error">
          {t("github.unavailable")}{" "}
          <a href={profileUrl} target="_blank" rel="noreferrer">
            {t("github.openProfile")}
          </a>
        </p>
      ) : (
        <div className="gh">
          <GitHubStats username={username} />
          <GitHubContributions username={username} />
          <div className="github-activity-grid">
            <GitHubLanguages username={username} />
            <a className="github-activity-profile" href={profileUrl} target="_blank" rel="noreferrer">
              <FaGithub aria-hidden="true" />
              <span>
                <strong>@{username}</strong>
                <small>{t("github.openProfile")}</small>
              </span>
            </a>
          </div>
          <GitHubRepos username={username} />
        </div>
      )}
    </div>
  );
}
