import { useTranslation } from "react-i18next";

import { SECTIONS } from "../data/sections";
import Shield from "./Shield";
import "./Header.css";

export default function Header({ active }) {
  const { t, i18n } = useTranslation();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#sobre" className="brand" aria-label={t("nav.home")}>
          <Shield className="brand-shield" />
          <span className="brand-name mono">jprodrigues</span>
        </a>

        <nav aria-label={t("nav.menu")} className="nav">
          <ul>
            {SECTIONS.map(({ id, labelKey }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "location" : undefined}
                >
                  {t(labelKey)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lang" role="group" aria-label={t("nav.language")}>
          {["pt", "en"].map((lng) => (
            <button
              key={lng}
              type="button"
              className="lang-btn mono"
              aria-pressed={i18n.language === lng}
              onClick={() => i18n.changeLanguage(lng)}
            >
              {lng.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
