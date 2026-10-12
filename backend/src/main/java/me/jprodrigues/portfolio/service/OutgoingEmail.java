package me.jprodrigues.portfolio.service;

/**
 * Um e-mail pronto para envio, em texto simples.
 *
 * @param replyTo endereço usado quando o destinatário clica em "Responder" (pode ser null)
 */
public record OutgoingEmail(String from, String to, String replyTo, String subject, String text) {
}
