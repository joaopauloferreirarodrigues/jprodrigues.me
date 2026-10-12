package me.jprodrigues.portfolio.exception;

/** A variável RESEND_API_KEY não foi definida, então não há como enviar e-mail. */
public class EmailNotConfiguredException extends RuntimeException {

    public EmailNotConfiguredException() {
        super("RESEND_API_KEY não configurada");
    }
}
