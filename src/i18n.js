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
          "Tenho 22 anos e sou formado em Administração pela PUC Minas. Foi na gestão que aprendi a enxergar processos, riscos e o impacto que cada decisão tem dentro de uma empresa.",
          "Hoje curso o 2º período de Engenharia de Software e junto as duas formações: entender como os sistemas funcionam por dentro para ajudar empresas a protegê-los, com processos claros e riscos sob controle.",
        ],
        logTitle: "Trajetória",
        log: [
          { status: "ok", label: "concluído", text: "Bacharelado em Administração, PUC Minas" },
          { status: "run", label: "em curso", text: "Engenharia de Software, PUC Minas (2º período)" },
          { status: "goal", label: "foco", text: "GRC em segurança da informação" },
        ],
        stackTitle: "Tecnologias que uso",
        photoAlt: "Foto de João Paulo Ferreira Rodrigues",
        cta: "Falar comigo",
        ctaProjects: "Ver projetos",
      },
      projects: {
        title: "Projetos",
        intro: "Do mais antigo ao mais recente, os trabalhos que desenvolvi na graduação.",
        repo: "Ver repositório no GitHub",
        tech: "Tecnologias",
        inProgress: "em andamento",
        shotAlt: "Captura de tela do projeto {{name}}",
        noShot: "Captura em breve",
      },
      experience: {
        title: "Experiências",
        intro: "Atuação profissional, projetos de extensão e atividades fora da sala de aula.",
        present: "atual",
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
          sent: "Mensagem enviada. Você vai receber uma confirmação no seu e-mail.",
          failed: "Não foi possível enviar agora. Tente de novo ou use um dos canais ao lado.",
          notConfigured: "O envio de e-mail ainda não está configurado. Use um dos canais ao lado.",
          errors: {
            nameRequired: "Informe seu nome.",
            nameShort: "O nome precisa ter pelo menos 2 letras.",
            emailRequired: "Informe seu e-mail.",
            emailInvalid: "Esse e-mail não parece válido. Confira se tem @ e domínio.",
            messageRequired: "Escreva sua mensagem.",
            messageShort: "A mensagem precisa ter pelo menos 10 caracteres.",
          },
        },
      },
      footer: {
        built: "Feito com React e Vite. Hospedado na Vercel.",
        source: "Código-fonte",
      },
      secret: {
        title: "Você achou a carta secreta",
        body: "Fora do código, ultimamente ando jogando Pokémon TCG. Se você também joga, me chama no contato para uma partida.",
        close: "Fechar",
        cardType: "Carta de suporte",
        abilities: [
          {
            name: "Análise de gaps",
            text: "Olhe as 3 primeiras cartas do baralho do oponente. Ele não percebeu a falha, você percebeu.",
          },
          {
            name: "Deploy na sexta",
            text: "Jogue uma moeda. Se der cara, funciona. Se der coroa, você passa o fim de semana corrigindo.",
          },
        ],
        footer: "Carta 01/01 · edição jprodrigues.me",
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
          "I'm 22 and hold a bachelor's degree in Business Administration from PUC Minas. Management taught me to see processes, risks and the impact every decision has inside a company.",
          "I'm now in my second semester of Software Engineering, bringing both backgrounds together: understanding how systems work from the inside to help companies protect them, with clear processes and risks under control.",
        ],
        logTitle: "Path",
        log: [
          { status: "ok", label: "done", text: "B.A. in Business Administration, PUC Minas" },
          { status: "run", label: "ongoing", text: "Software Engineering, PUC Minas (2nd semester)" },
          { status: "goal", label: "focus", text: "GRC in information security" },
        ],
        stackTitle: "Technologies I use",
        photoAlt: "Photo of João Paulo Ferreira Rodrigues",
        cta: "Get in touch",
        ctaProjects: "See projects",
      },
      projects: {
        title: "Projects",
        intro: "From oldest to newest, the work I've built during my degree.",
        repo: "View repository on GitHub",
        tech: "Technologies",
        inProgress: "in progress",
        shotAlt: "Screenshot of the {{name}} project",
        noShot: "Screenshot coming soon",
      },
      experience: {
        title: "Experience",
        intro: "Professional work, community outreach projects and activities beyond the classroom.",
        present: "present",
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
          sent: "Message sent. You'll get a confirmation in your inbox.",
          failed: "The message couldn't be sent right now. Try again or use one of the channels.",
          notConfigured: "Email sending isn't set up yet. Please use one of the channels.",
          errors: {
            nameRequired: "Enter your name.",
            nameShort: "Your name needs at least 2 letters.",
            emailRequired: "Enter your email.",
            emailInvalid: "That email doesn't look valid. Check the @ and the domain.",
            messageRequired: "Write your message.",
            messageShort: "Your message needs at least 10 characters.",
          },
        },
      },
      footer: {
        built: "Built with React and Vite. Hosted on Vercel.",
        source: "Source code",
      },
      secret: {
        title: "You found the secret card",
        body: "Away from code, I've been playing the Pokémon TCG lately. If you play too, reach out for a match.",
        close: "Close",
        cardType: "Supporter card",
        abilities: [
          {
            name: "Gap analysis",
            text: "Look at the top 3 cards of your opponent's deck. They missed the flaw, you didn't.",
          },
          {
            name: "Friday deploy",
            text: "Flip a coin. Heads, it works. Tails, you spend the weekend fixing it.",
          },
        ],
        footer: "Card 01/01 · jprodrigues.me edition",
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
