// Chaves do EmailJS lidas das variáveis de ambiente (arquivo .env.local ou painel da Vercel).
// Todas são públicas por natureza: o EmailJS foi feito para rodar no navegador.
const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID_FOR_ME: import.meta.env.VITE_EMAILJS_TEMPLATE_ID_FOR_ME,
  TEMPLATE_ID_FOR_SENDER: import.meta.env.VITE_EMAILJS_TEMPLATE_ID_FOR_SENDER,
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

export const isEmailConfigured = Boolean(
  EMAILJS_CONFIG.SERVICE_ID &&
    EMAILJS_CONFIG.TEMPLATE_ID_FOR_ME &&
    EMAILJS_CONFIG.PUBLIC_KEY
);

export default EMAILJS_CONFIG;
