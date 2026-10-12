// Experiências: empresa/instituição, cargo ou atividade, período e descrição.
// Ordem: da mais recente para a mais antiga.
export const experiences = [
  {
    id: "shield-security",
    org: "Shield Security",
    url: null, // TODO: site da empresa (opcional)
    role: {
      pt: "Assistente de GRC",
      en: "GRC Assistant",
    },
    start: { pt: "2026", en: "2026" }, // TODO: mês e ano de início
    current: true,
    description: {
      pt: "Apoio em projetos de governança, riscos e compliance em segurança da informação: mapeamento de processos em BPMN e SIPOC, gestão de riscos de terceiros (TPRM) para fornecedores de tecnologia e análise de gaps nos controles de segurança de clientes, com a classificação dos riscos encontrados.",
      en: "Support on governance, risk and compliance projects in information security: process mapping with BPMN and SIPOC, third-party risk management (TPRM) for technology suppliers and gap analysis of clients' security controls, including rating the risks found.",
    },
    skills: {
      pt: ["Mapeamento de processos (BPMN)", "SIPOC", "Riscos de terceiros (TPRM)", "Análise de gaps"],
      en: ["Process mapping (BPMN)", "SIPOC", "Third-party risk (TPRM)", "Gap analysis"],
    },
  },
];
