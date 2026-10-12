import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Textos fixos da interface em português e inglês.
// O conteúdo (projetos, experiências) fica em src/data, com os dois idiomas lado a lado.
const resources = {
  pt: {
    translation: {
      nav: {
        about: "Sobre mim",
        projects: "Projetos",
        experience: "Experiências",
        contact: "Contato",
        menu: "Navegação principal",
        language: "Idioma",
        skip: "Pular para o conteúdo",
        home: "Início",
      },
      about: {
        greeting: "Olá, eu sou",
        lead: "Estudante de Engenharia de Software na PUC Minas, com foco em governança, riscos e compliance (GRC) em segurança da informação.",
        bio: [
          "Tenho 22 anos, sou formado em Administração pela PUC Minas e trabalho como analista financeiro desde 2022. No dia a dia cuido de pagamentos, fluxo de caixa e conferências, uma rotina em que controle, prazo e conformidade fazem toda a diferença.",
          "Hoje curso o 2º período de Engenharia de Software e quero levar essa visão de controles para a tecnologia: entender como os sistemas funcionam por dentro para ajudar empresas a protegê-los, com processos claros e riscos sob controle.",
        ],
        logTitle: "Trajetória",
        log: [
          { status: "ok", label: "concluído", text: "Bacharelado em Administração, PUC Minas" },
          { status: "run", label: "atual", text: "Analista financeiro, Montante Engenharia (desde 2022)" },
          { status: "run", label: "em curso", text: "Engenharia de Software, PUC Minas (2º período)" },
          { status: "goal", label: "foco", text: "GRC em segurança da informação" },
        ],
        stackTitle: "Tecnologias que uso",
        otherTitle: "Outras competências",
        other: ["Inglês avançado", "Excel avançado", "ERP Omie"],
        photoAlt: "Foto de João Paulo Ferreira Rodrigues",
        cta: "Falar comigo",
        ctaProjects: "Ver projetos",
      },
      projects: {
        title: "Projetos",
        intro: "Do mais antigo ao mais recente, os trabalhos que desenvolvi na graduação.",
        repo: "Ver repositório no GitHub",
        tech: "Tecnologias",
        shotAlt: "Projeto {{name}} em funcionamento",
        noShot: "Captura em breve",
      },
      experience: {
        title: "Experiências",
        intro: "Minha atuação profissional até aqui.",
        present: "atual",
        skills: "Competências",
      },
      contact: {
        title: "Contato",
        intro: "Quer conversar sobre um projeto, uma vaga ou segurança da informação? Escolha o canal que preferir ou mande uma mensagem por aqui.",
        channels: "Canais",
        form: {
          name: "Nome",
          email: "E-mail",
          message: "Mensagem",
          send: "Enviar mensagem",
          sending: "Enviando...",
          waking: "Enviando... o servidor gratuito estava em repouso e pode levar até um minuto para responder.",
          sent: "Mensagem enviada. Obrigado pelo contato, respondo em breve.",
          failed: "Não foi possível enviar agora. Tente de novo em alguns minutos ou escreva direto para o meu e-mail.",
          tooMany: "Muitas mensagens em pouco tempo. Aguarde alguns minutos e tente de novo.",
          notConfigured: "O envio pelo formulário ainda não está configurado. Escreva direto para o meu e-mail.",
          errors: {
            nameRequired: "Informe seu nome.",
            nameShort: "O nome precisa ter pelo menos 2 letras.",
            emailRequired: "Informe seu e-mail.",
            emailInvalid: "Esse e-mail não parece válido. Confira se tem @ e domínio.",
            messageRequired: "Escreva sua mensagem.",
            messageShort: "A mensagem precisa ter pelo menos 10 caracteres.",
            messageLong: "A mensagem pode ter no máximo 2000 caracteres.",
          },
        },
      },
      footer: {
        built: "Feito com React e Spring Boot. Hospedado na Vercel e no Render.",
        source: "Código-fonte",
      },
    },
  },
  en: {
    translation: {
      nav: {
        about: "About me",
        projects: "Projects",
        experience: "Experience",
        contact: "Contact",
        menu: "Main navigation",
        language: "Language",
        skip: "Skip to content",
        home: "Home",
      },
      about: {
        greeting: "Hi, I'm",
        lead: "Software Engineering student at PUC Minas, focused on governance, risk and compliance (GRC) in information security.",
        bio: [
          "I'm 22, hold a bachelor's degree in Business Administration from PUC Minas and have worked as a financial analyst since 2022. My day-to-day covers payments, cash flow and reconciliations, a routine where control, deadlines and compliance make all the difference.",
          "I'm now in my second semester of Software Engineering and want to bring that control mindset into technology: understanding how systems work from the inside to help companies protect them, with clear processes and risks under control.",
        ],
        logTitle: "Path",
        log: [
          { status: "ok", label: "done", text: "B.A. in Business Administration, PUC Minas" },
          { status: "run", label: "current", text: "Financial analyst, Montante Engenharia (since 2022)" },
          { status: "run", label: "ongoing", text: "Software Engineering, PUC Minas (2nd semester)" },
          { status: "goal", label: "focus", text: "GRC in information security" },
        ],
        stackTitle: "Technologies I use",
        otherTitle: "Other skills",
        other: ["Advanced English", "Advanced Excel", "Omie ERP"],
        photoAlt: "Photo of João Paulo Ferreira Rodrigues",
        cta: "Get in touch",
        ctaProjects: "See projects",
      },
      projects: {
        title: "Projects",
        intro: "From oldest to newest, the work I've built during my degree.",
        repo: "View repository on GitHub",
        tech: "Technologies",
        shotAlt: "The {{name}} project running",
        noShot: "Screenshot coming soon",
      },
      experience: {
        title: "Experience",
        intro: "My professional work so far.",
        present: "present",
        skills: "Skills",
      },
      contact: {
        title: "Contact",
        intro: "Want to talk about a project, a job opening or information security? Pick a channel or send me a message here.",
        channels: "Channels",
        form: {
          name: "Name",
          email: "Email",
          message: "Message",
          send: "Send message",
          sending: "Sending...",
          waking: "Sending... the free server was asleep and may take up to a minute to respond.",
          sent: "Message sent. Thanks for reaching out, I'll reply soon.",
          failed: "The message couldn't be sent right now. Try again in a few minutes or email me directly.",
          tooMany: "Too many messages in a short time. Wait a few minutes and try again.",
          notConfigured: "The contact form isn't set up yet. Please email me directly.",
          errors: {
            nameRequired: "Enter your name.",
            nameShort: "Your name needs at least 2 letters.",
            emailRequired: "Enter your email.",
            emailInvalid: "That email doesn't look valid. Check the @ and the domain.",
            messageRequired: "Write your message.",
            messageShort: "Your message needs at least 10 characters.",
            messageLong: "Your message can have at most 2000 characters.",
          },
        },
      },
      footer: {
        built: "Built with React and Spring Boot. Hosted on Vercel and Render.",
        source: "Source code",
      },
    },
  },
};

function savedLanguage() {
  try {
    const saved = localStorage.getItem("jp-lang");
    if (saved === "pt" || saved === "en") return saved;
  } catch {
    // navegação privada pode bloquear o localStorage
  }
  return navigator.language?.toLowerCase().startsWith("pt") ? "pt" : "en";
}

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage(),
  fallbackLng: "pt",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng === "pt" ? "pt-BR" : "en";
  try {
    localStorage.setItem("jp-lang", lng);
  } catch {
    // ignora
  }
});
document.documentElement.lang = i18n.language === "pt" ? "pt-BR" : "en";

export default i18n;
