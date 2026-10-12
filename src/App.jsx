import { useState } from "react";
import { useTranslation } from "react-i18next";

import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Experiences from "./components/Experiences";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SecretCard from "./components/SecretCard";
import { useKonamiCode } from "./hooks/useKonamiCode";
import { useActiveSection } from "./hooks/useActiveSection";
import { SECTION_IDS } from "./data/sections";

// Dica para quem abre o console do navegador :)
console.info(
  "%c🔍 Curioso? Clique 5 vezes no escudo do logo (ou use o código Konami).",
  "color:#5cc8d7;font-family:monospace"
);

export default function App() {
  const { t } = useTranslation();
  const [secretOpen, setSecretOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useKonamiCode(() => setSecretOpen(true));

  return (
    <>
      <a className="skip-link" href="#conteudo">
        {t("nav.skip")}
      </a>
      <Header active={active} onSecret={() => setSecretOpen(true)} />
      <main id="conteudo">
        <About />
        <Projects />
        <Experiences />
        <Contact />
      </main>
      <Footer />
      {secretOpen && <SecretCard onClose={() => setSecretOpen(false)} />}
    </>
  );
}
