import { useTranslation } from "react-i18next";

// Retorna uma função que escolhe o texto no idioma atual
// a partir de um objeto { pt: "...", en: "..." }.
export function useLocalized() {
  const { i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "pt";
  return (field) => {
    if (field == null) return "";
    if (typeof field === "string") return field;
    return field[lang] ?? field.pt;
  };
}
