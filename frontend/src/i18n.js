import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Textos fixos da interface em português e inglês.
// O conteúdo (projetos, experiências) fica em src/data, com os dois idiomas lado a lado.
const resources = {
  pt: {
    translation: {
      nav: {
        about: "Sobre mim",
        skills: "Habilidades",
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
          "Tenho 22 anos, sou formado em Administração pela PUC Minas e trabalho como assistente de GRC na Shield Security. No dia a dia apoio projetos de governança, riscos e compliance: mapeio processos, avalio riscos de fornecedores e aponto onde os controles de segurança ainda têm falhas.",
          "Hoje curso o 2º período de Engenharia de Software para entender por dentro os sistemas que ajudo a proteger, unindo a visão de negócio da Administração com a parte técnica.",
        ],
        logTitle: "Trajetória",
        log: [
          { status: "ok", label: "concluído", text: "Bacharelado em Administração, PUC Minas" },
          { status: "run", label: "atual", text: "Assistente de GRC, Shield Security" },
          { status: "run", label: "em curso", text: "Engenharia de Software, PUC Minas (2º período)" },
          { status: "goal", label: "foco", text: "GRC em segurança da informação" },
        ],
        stackTitle: "Tecnologias que uso",
        otherTitle: "Outras competências",
        other: ["Inglês avançado", "Excel avançado", "Mapeamento de processos"],
        photoAlt: "Foto de João Paulo Ferreira Rodrigues",
        cta: "Falar comigo",
        ctaProjects: "Ver projetos",
      },
      skills: {
        title: "Habilidades",
        intro: "As tecnologias e ferramentas que uso nos projetos da faculdade e no trabalho. Arraste o globo para girar.",
        all: "Todas",
        categories: { "Front-end": "Front-end", "Back-end": "Back-end", Ferramentas: "Ferramentas", GRC: "GRC" },
        globe: "Globo",
        list: "Lista",
        hint: "Arraste para girar · clique num ícone para abrir a documentação",
        category: "Categoria",
        view: "Visualização",
        label: "Habilidades",
      },
      github: {
        title: "Atividade no GitHub",
        intro: "Dados ao vivo da API do GitHub: repositórios, contribuições e linguagens.",
        unavailable: "Não foi possível carregar os dados do GitHub agora.",
        openProfile: "Ver perfil no GitHub",
        stats: {
          repos: "Repositórios",
          public: "públicos",
          stars: "Estrelas",
          mostStarred: "mais estrelado: {{name}}",
          forks: "Forks",
          forksNote: "dos meus repositórios",
          followers: "Seguidores",
          following: "seguindo {{value}}",
        },
        contrib: {
          total_one: "{{value}} contribuição",
          total_other: "{{value}} contribuições",
          lastYear: "no último ano",
          weekdays: ["", "seg", "", "qua", "", "sex", ""],
          day_one: "{{count}} contribuição em {{date}}",
          day_other: "{{count}} contribuições em {{date}}",
          current_one: "dia seguido agora",
          current_other: "dias seguidos agora",
          longest_one: "dia na maior sequência",
          longest_other: "dias na maior sequência",
          best: "no melhor dia ({{date}})",
          less: "menos",
          more: "mais",
        },
        languages: {
          title: "Linguagens",
          note_one: "linguagem principal de {{count}} repositório",
          note_other: "linguagem principal de {{count}} repositórios",
          others: "Outras ({{count}})",
          empty: "Nenhum repositório com linguagem definida.",
        },
        repos: {
          title: "Repositórios",
          sortPushed: "Atualizados",
          sortStars: "Mais estrelas",
          sortName: "Nome (A–Z)",
          language: "Linguagem",
          allLanguages: "Todas as linguagens",
          sortBy: "Ordenar por",
          empty: "Nenhum repositório encontrado.",
          homepage: "Site do projeto",
          homepageOf: "Site do projeto {{name}}",
          noDescription: "Sem descrição.",
          more: "Ver mais ({{count}})",
          all: "Todos no GitHub",
        },
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
        skills: "Skills",
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
          "I'm 22, hold a bachelor's degree in Business Administration from PUC Minas and work as a GRC assistant at Shield Security. My day-to-day supports governance, risk and compliance projects: I map processes, assess supplier risk and point out where security controls still have gaps.",
          "I'm now in my second semester of Software Engineering to understand from the inside the systems I help protect, bringing together the business view from Administration and the technical side.",
        ],
        logTitle: "Path",
        log: [
          { status: "ok", label: "done", text: "B.A. in Business Administration, PUC Minas" },
          { status: "run", label: "current", text: "GRC assistant, Shield Security" },
          { status: "run", label: "ongoing", text: "Software Engineering, PUC Minas (2nd semester)" },
          { status: "goal", label: "focus", text: "GRC in information security" },
        ],
        stackTitle: "Technologies I use",
        otherTitle: "Other skills",
        other: ["Advanced English", "Advanced Excel", "Process mapping"],
        photoAlt: "Photo of João Paulo Ferreira Rodrigues",
        cta: "Get in touch",
        ctaProjects: "See projects",
      },
      skills: {
        title: "Skills",
        intro: "The technologies and tools I use in my coursework and at work. Drag the globe to spin it.",
        all: "All",
        categories: { "Front-end": "Front-end", "Back-end": "Back-end", Ferramentas: "Tools", GRC: "GRC" },
        globe: "Globe",
        list: "List",
        hint: "Drag to spin · click an icon to open its documentation",
        category: "Category",
        view: "View",
        label: "Skills",
      },
      github: {
        title: "GitHub activity",
        intro: "Live data from the GitHub API: repositories, contributions and languages.",
        unavailable: "GitHub data couldn't be loaded right now.",
        openProfile: "View profile on GitHub",
        stats: {
          repos: "Repositories",
          public: "public",
          stars: "Stars",
          mostStarred: "most starred: {{name}}",
          forks: "Forks",
          forksNote: "of my repositories",
          followers: "Followers",
          following: "following {{value}}",
        },
        contrib: {
          total_one: "{{value}} contribution",
          total_other: "{{value}} contributions",
          lastYear: "in the last year",
          weekdays: ["", "Mon", "", "Wed", "", "Fri", ""],
          day_one: "{{count}} contribution on {{date}}",
          day_other: "{{count}} contributions on {{date}}",
          current_one: "day in a row now",
          current_other: "days in a row now",
          longest_one: "day in the longest streak",
          longest_other: "days in the longest streak",
          best: "on the best day ({{date}})",
          less: "less",
          more: "more",
        },
        languages: {
          title: "Languages",
          note_one: "main language of {{count}} repository",
          note_other: "main language of {{count}} repositories",
          others: "Others ({{count}})",
          empty: "No repository with a language set.",
        },
        repos: {
          title: "Repositories",
          sortPushed: "Recently updated",
          sortStars: "Most stars",
          sortName: "Name (A–Z)",
          language: "Language",
          allLanguages: "All languages",
          sortBy: "Sort by",
          empty: "No repositories found.",
          homepage: "Project website",
          homepageOf: "{{name}} project website",
          noDescription: "No description.",
          more: "Show more ({{count}})",
          all: "All on GitHub",
        },
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
