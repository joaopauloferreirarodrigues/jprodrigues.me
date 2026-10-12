import { useTranslation } from "react-i18next";

import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Experiences from "./components/Experiences";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useActiveSection } from "./hooks/useActiveSection";
import { SECTION_IDS } from "./data/sections";

export default function App() {
  const { t } = useTranslation();
  const active = useActiveSection(SECTION_IDS);

  return (
    <>
      <a className="skip-link" href="#conteudo">
        {t("nav.skip")}
      </a>
      <Header active={active} />
      <main id="conteudo">
        <About />
        <Projects />
        <Experiences />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
