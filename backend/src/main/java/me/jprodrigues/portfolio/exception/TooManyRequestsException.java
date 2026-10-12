package me.jprodrigues.portfolio.exception;

/** O visitante (ou o site como um todo) passou do limite de mensagens. */
public class TooManyRequestsException extends RuntimeException {

    public TooManyRequestsException() {
        super("Limite de mensagens atingido");
    }
}
