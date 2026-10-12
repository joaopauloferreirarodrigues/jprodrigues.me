package me.jprodrigues.portfolio.exception;

/** O provedor de e-mail recusou ou não respondeu ao envio. */
public class EmailDeliveryException extends RuntimeException {

    public EmailDeliveryException(String message, Throwable cause) {
        super(message, cause);
    }
}
