// Experiências: empresa/instituição, cargo ou atividade, período e descrição.
// Ordem: da mais recente para a mais antiga.
export const experiences = [
  {
    id: "fvr",
    org: "FVR Consult",
    url: "https://fvrconsult.com.br",
    role: {
      pt: "Consultoria em GRC", // TODO: cargo
      en: "GRC consulting", // TODO
    },
    start: { pt: "2026", en: "2026" }, // TODO: início
    current: true,
    description: {
      pt: "Mapeamento de processos de gestão de riscos de terceiros (TPRM) para fornecedores de tecnologia: fluxos em BPMN, matriz SIPOC e documentação de gaps de controle, como a falta de monitoramento ativo de fornecedores.",
      en: "Process mapping for third-party risk management (TPRM) of technology suppliers: BPMN flows, SIPOC matrices and documentation of control gaps, such as missing active supplier monitoring.",
    },
  },
  {
    id: "funec",
    org: "PUC Minas + FUNEC",
    url: null,
    role: {
      pt: "Ação extensionista",
      en: "Community outreach project",
    },
    start: { pt: "2026/2", en: "2026/2" },
    current: true,
    description: {
      pt: "Projeto em grupo da disciplina Metodologias de Extensão Universitária junto à Fundação de Ensino de Contagem: diagnóstico do público-alvo, proposta de ação e visitas à escola.",
      en: "Team project for the University Extension Methodologies course with the Contagem Education Foundation: target audience diagnosis, action proposal and school visits.",
    },
  },
];
