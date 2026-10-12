// Linha do tempo de projetos, do mais antigo para o mais recente.
// Cada projeto tem textos em pt e en, tecnologias, link do GitHub e imagem/GIF.
// image: caminho dentro de public/ (ex.: "/projetos/chargermap.gif") ou null.
export const projects = [
  {
    id: "getting-freak",
    name: "Getting Freak",
    period: "2026/1",
    context: {
      pt: "Trabalho prático de desenvolvimento web",
      en: "Web development coursework",
    },
    description: {
      pt: "Plataforma de treinos de academia com carrossel de destaques, página de detalhes de cada treino, dados servidos por uma API REST com JSON Server, página de estatísticas com gráficos, login e lista de favoritos por usuário.",
      en: "A gym workout platform with a featured carousel, a detail page for each workout, data served by a REST API built with JSON Server, a statistics page with charts, login and per-user favorites.",
    },
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap", "JSON Server", "Chart.js"],
    repo: null, // TODO: link do repositório (GitHub Classroom)
    image: null, // TODO: print ou GIF
  },
  {
    id: "defend-the-castle",
    name: "Defend the Castle",
    period: "2026/1",
    context: {
      pt: "Projeto final em grupo, 4 integrantes",
      en: "Team final project, 4 members",
    },
    description: {
      pt: "Jogo em que um arqueiro defende o castelo contra 10 ondas de inimigos (esqueletos, morcegos e orcs, cada um com velocidade e vida próprias), com ranking de pontuação salvo em arquivo. Trabalhei em sprites, mecânica dos inimigos, leitura e escrita de arquivos, testes automatizados e documentação.",
      en: "A game where an archer defends the castle against 10 waves of enemies (skeletons, bats and orcs, each with its own speed and health), with a score ranking saved to a file. I worked on sprites, enemy mechanics, file I/O, automated tests and documentation.",
    },
    tech: ["Python", "Pygame", "pytest"],
    repo: "https://github.com/joaopauloferreirarodrigues/DefendTheCastle",
    image: "/projetos/defend-the-castle.gif",
  },
  {
    id: "chargermaps",
    name: "ChargerMaps",
    period: "2026/1",
    context: {
      pt: "Trabalho Interdisciplinar I, equipe de 6 integrantes",
      en: "Interdisciplinary Project I, team of 6",
    },
    description: {
      pt: "Aplicação para motoristas de carros elétricos encontrarem pontos de recarga em um mapa interativo, planejarem viagens, simularem o tempo de recarga e guardarem favoritos e histórico. Fiquei com o módulo de favoritos (salvar, buscar, filtrar e ver detalhes dos pontos por usuário), corrigi bugs de tipos de dados e cuidei do fluxo de branches no Git.",
      en: "An app for electric vehicle drivers to find charging stations on an interactive map, plan trips, simulate charging time and keep favorites and history. I built the favorites module (save, search, filter and view station details per user), fixed data type bugs and handled the Git branch workflow.",
    },
    tech: ["HTML", "CSS", "JavaScript", "JSON Server", "Leaflet"],
    repo: "https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2026-1-ti1-0427200-ideal-2",
    image: null, // TODO: print ou GIF
  },
];
