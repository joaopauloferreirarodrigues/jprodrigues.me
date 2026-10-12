import { useTranslation } from "react-i18next";

import { profile } from "../data/profile";
import "./Footer.css";

const YEAR = new Date().getFullYear();

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>
          © {YEAR} {profile.name}
        </p>
        <p className="footer-meta">
          {t("footer.built")}{" "}
          <a href={profile.repo} target="_blank" rel="noreferrer">
            {t("footer.source")}
          </a>
        </p>
      </div>
    </footer>
  );
}
