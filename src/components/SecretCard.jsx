import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import Shield from "./Shield";
import "./SecretCard.css";

// Easter egg: carta colecionável original, aberta com 5 cliques no logo
// ou com o código Konami (↑ ↑ ↓ ↓ ← → ← → B A).
export default function SecretCard({ onClose }) {
  const { t } = useTranslation();
  const dialogRef = useRef(null);
  const abilities = t("secret.abilities", { returnObjects: true });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="secret"
      aria-labelledby="secret-title"
      onClose={onClose}
      onClick={(event) => {
        // clique fora da carta fecha
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className="secret-inner">
        <h2 id="secret-title" className="secret-title">
          {t("secret.title")}
        </h2>

        <div className="tcg-card">
          <div className="tcg-top">
            <span className="tcg-name">João Paulo</span>
            <span className="tcg-type mono">{t("secret.cardType")}</span>
          </div>

          <div className="tcg-art" aria-hidden="true">
            <Shield className="tcg-shield" />
          </div>

          <ul className="tcg-abilities">
            {abilities.map((ability) => (
              <li key={ability.name}>
                <h3 className="tcg-ability-name">{ability.name}</h3>
                <p>{ability.text}</p>
              </li>
            ))}
          </ul>

          <p className="tcg-footer mono">{t("secret.footer")}</p>
        </div>

        <p className="secret-body">{t("secret.body")}</p>

        <button
          type="button"
          className="button button-ghost"
          onClick={onClose}
          autoFocus
        >
          {t("secret.close")}
        </button>
      </div>
    </dialog>
  );
}
