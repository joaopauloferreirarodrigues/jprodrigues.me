import { useRef } from "react";
import { useTranslation } from "react-i18next";

import { SECTIONS } from "../data/sections";
import Shield from "./Shield";
import "./Header.css";

const CLICKS_TO_UNLOCK = 5;
const CLICK_WINDOW_MS = 2500;

export default function Header({ active, onSecret }) {
  const { t, i18n } = useTranslation();
  const clicks = useRef([]);

  // Easter egg: 5 cliques no escudo em até 2,5 segundos abrem a carta secreta.
  function handleShieldClick() {
    const now = Date.now();
    clicks.current = [...clicks.current, now].filter(
      (time) => now - time < CLICK_WINDOW_MS
    );
    if (clicks.current.length >= CLICKS_TO_UNLOCK) {
      clicks.current = [];
      onSecret();
    }
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a
          href="#sobre"
          className="brand"
          aria-label={t("nav.home")}
          onClick={handleShieldClick}
        >
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
