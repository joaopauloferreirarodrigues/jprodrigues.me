// Comunicação com o back-end Spring Boot (hospedado no Render).
// A URL vem da variável de ambiente VITE_API_URL (arquivo .env.local ou painel da Vercel).
const API_URL = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");

export const isApiConfigured = API_URL.length > 0;

const REQUEST_TIMEOUT_MS = 70_000; // o plano gratuito do Render pode levar ~1 min para acordar

// O Render desliga o servidor gratuito após 15 min sem uso.
// Chamar /api/health quando o site abre faz ele "acordar" antes do visitante enviar a mensagem.
export function wakeUpApi() {
  if (!isApiConfigured) return;
  fetch(`${API_URL}/api/health`).catch(() => {
    // sem problema: é só um aviso para o servidor acordar
  });
}

// Envia a mensagem. Retorna "sent" | "too_many" | "invalid" | "not_configured" | "failed".
export async function sendContactMessage(data) {
  if (!isApiConfigured) return "not_configured";

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: controller.signal,
    });
    if (response.ok) return "sent";
    if (response.status === 429) return "too_many";
    if (response.status === 400) return "invalid";
    if (response.status === 503) return "not_configured";
    return "failed";
  } catch {
    return "failed";
  } finally {
    clearTimeout(timer);
  }
}
