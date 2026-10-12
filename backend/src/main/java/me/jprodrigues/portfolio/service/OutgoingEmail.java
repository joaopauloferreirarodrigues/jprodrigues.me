package me.jprodrigues.portfolio.service;

/**
 * Um e-mail pronto para envio, com versão em texto simples e em HTML.
 * O remetente (from) é definido por quem envia (Gmail ou Resend).
 *
 * @param replyTo endereço usado quando o destinatário clica em "Responder" (pode ser null)
 */
public record OutgoingEmail(String to, String replyTo, String subject, String text, String html) {
}
