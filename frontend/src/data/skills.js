// Habilidades exibidas no globo 3D (componente SkillsGlobe da disciplina DIAW).
//   name     → nome que aparece no globo e na lista
//   icon     → componente do react-icons
//   color    → cor do ícone (clareada quando a marca é escura, para aparecer no fundo do site)
//   category → precisa ser uma das CATEGORIES abaixo
//   link     → documentação oficial, aberta ao clicar
import { FaJava } from "react-icons/fa";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import {
  SiApachemaven,
  SiBootstrap,
  SiCss,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiPython,
  SiReact,
  SiRender,
  SiSpringboot,
  SiVercel,
  SiVite,
} from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";

export const CATEGORIES = ["Front-end", "Back-end", "Ferramentas"];

const SKILLS = [
  // Front-end
  { name: "HTML", icon: SiHtml5, color: "#E34F26", category: "Front-end", link: "https://developer.mozilla.org/pt-BR/docs/Web/HTML" },
  { name: "CSS", icon: SiCss, color: "#8a63d2", category: "Front-end", link: "https://developer.mozilla.org/pt-BR/docs/Web/CSS" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", category: "Front-end", link: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript" },
  { name: "Bootstrap", icon: SiBootstrap, color: "#a07fe0", category: "Front-end", link: "https://getbootstrap.com/" },
  { name: "React", icon: SiReact, color: "#61DAFB", category: "Front-end", link: "https://react.dev/" },
  { name: "Vite", icon: SiVite, color: "#9499ff", category: "Front-end", link: "https://vite.dev/" },

  // Back-end
  { name: "Java", icon: FaJava, color: "#F89820", category: "Back-end", link: "https://dev.java/learn/" },
  { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F", category: "Back-end", link: "https://spring.io/projects/spring-boot" },
  { name: "Maven", icon: SiApachemaven, color: "#e05a7a", category: "Back-end", link: "https://maven.apache.org/guides/" },
  { name: "Python", icon: SiPython, color: "#5a9fd4", category: "Back-end", link: "https://docs.python.org/pt-br/3/" },

  // Ferramentas
  { name: "Git", icon: SiGit, color: "#F05032", category: "Ferramentas", link: "https://git-scm.com/book/pt-br/v2" },
  { name: "GitHub", icon: SiGithub, color: "#e4eaf2", category: "Ferramentas", link: "https://github.com/joaopauloferreirarodrigues" },
  { name: "VS Code", icon: TbBrandVscode, color: "#3ba7f0", category: "Ferramentas", link: "https://code.visualstudio.com/docs" },
  { name: "Excel", icon: PiMicrosoftExcelLogo, color: "#33c481", category: "Ferramentas", link: "https://support.microsoft.com/pt-br/excel" },
  { name: "Vercel", icon: SiVercel, color: "#e4eaf2", category: "Ferramentas", link: "https://vercel.com/docs" },
  { name: "Render", icon: SiRender, color: "#c9d3e0", category: "Ferramentas", link: "https://render.com/docs" },
];

export default SKILLS;
