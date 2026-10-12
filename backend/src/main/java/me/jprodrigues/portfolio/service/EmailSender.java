package me.jprodrigues.portfolio.service;

/**
 * Envia e-mails. A interface separa a regra de negócio (ContactService)
 * do provedor de e-mail, que pode ser trocado sem mexer no resto.
 */
public interface EmailSender {

    void send(OutgoingEmail email);
}
