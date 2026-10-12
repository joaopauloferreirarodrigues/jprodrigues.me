package me.jprodrigues.portfolio.exception;

/** Nenhum provedor de e-mail foi configurado, então não há como enviar. */
public class EmailNotConfiguredException extends RuntimeException {

    public EmailNotConfiguredException() {
        super("Envio de e-mail não configurado: defina RESEND_API_KEY ou GMAIL_USERNAME + GMAIL_APP_PASSWORD");
    }
}
