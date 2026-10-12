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
  {
    id: "montante",
    org: "Montante Engenharia e Serviços",
    url: null,
    role: {
      pt: "Analista financeiro",
      en: "Financial analyst",
    },
    start: { pt: "dez. 2022", en: "Dec 2022" },
    end: { pt: "2026", en: "2026" },
    current: false,
    description: {
      pt: "Empresa de engenharia especializada em recuperação de áreas degradadas. Cuidei do processamento e da conferência de pagamentos, salários e boletos, do controle diário do fluxo de caixa e de relatórios gerenciais em Excel, além de lançamentos e conciliações no ERP Omie.",
      en: "Engineering company specialized in recovering degraded land. I processed and verified payments, payroll and invoices, tracked daily cash flow and built management reports in Excel, plus entries and reconciliations in the Omie ERP.",
    },
    skills: {
      pt: ["Excel avançado", "ERP Omie", "Fluxo de caixa", "Conciliação bancária"],
      en: ["Advanced Excel", "Omie ERP", "Cash flow", "Bank reconciliation"],
    },
  },
];
