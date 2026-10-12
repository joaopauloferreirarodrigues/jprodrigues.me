package me.jprodrigues.portfolio.service;

/**
 * Envia e-mails. A interface separa a regra de negócio (ContactService)
 * do provedor de e-mail, que pode ser trocado sem mexer no resto.
 */
public interface EmailSender {

    void send(OutgoingEmail email);

    /** Nome do provedor, para aparecer no log quando a aplicação sobe. */
    String providerName();

    /**
     * true se este provedor consegue mandar e-mail para qualquer endereço.
     * O Resend sem domínio verificado só entrega para o dono da conta,
     * então a confirmação para o visitante fica desligada nesse caso.
     */
    boolean canSendToAnyone();
}
