// Linha do tempo de projetos, do mais antigo para o mais recente.
// Cada projeto tem textos em pt e en, tecnologias, link do GitHub e imagem/GIF.
// image: caminho dentro de public/ (ex.: "/projetos/chargermap.gif") ou null.
export const projects = [
  {
    id: "chargermap",
    name: "ChargerMap",
    period: "2026/1",
    inProgress: false,
    course: {
      pt: "Trabalho Interdisciplinar I",
      en: "Interdisciplinary Project I",
    },
    description: {
      pt: "Buscador de pontos de recarga para carros elétricos. Fiquei com o módulo de favoritos, corrigi bugs de tipos de dados e cuidei do fluxo de branches no Git, além da documentação do projeto.",
      en: "A finder for electric vehicle charging stations. I owned the favorites module, fixed data type bugs and handled the Git branch workflow, plus the project documentation.",
    },
    tech: ["HTML", "CSS", "JavaScript", "JSON Server"],
    repo: "https://github.com/joaopauloferreirarodrigues", // TODO: link do repositório
    image: null, // TODO
  },
  {
    id: "defend-the-castle",
    name: "Defend the Castle",
    period: "2026/1",
    inProgress: false,
    course: {
      pt: "Algoritmos e Estruturas de Dados",
      en: "Algorithms and Data Structures",
    },
    description: {
      pt: "Jogo de tower defense feito em grupo. Trabalhei em todas as partes do código ao longo das entregas semanais: sprites, mecânica dos inimigos, leitura e escrita de arquivos, testes e documentação.",
      en: "A tower defense game built as a team. I worked across the whole codebase over weekly deliveries: sprites, enemy mechanics, file I/O, tests and documentation.",
    },
    tech: ["Python", "Pygame"],
    repo: "https://github.com/joaopauloferreirarodrigues", // TODO
    image: null, // TODO
  },
  {
    id: "sistema-hospitalar",
    name: "Sistema Hospitalar",
    period: "2026/2",
    inProgress: true,
    course: {
      pt: "Programação Modular",
      en: "Modular Programming",
    },
    description: {
      pt: "Sistema de gestão hospitalar desenvolvido em grupo. Sou responsável pela página de Internações.",
      en: "A hospital management system built as a team. I'm responsible for the inpatient admissions page.",
    },
    tech: ["HTML", "CSS", "Java"],
    repo: "https://github.com/joaopauloferreirarodrigues", // TODO
    image: null, // TODO
  },
];
