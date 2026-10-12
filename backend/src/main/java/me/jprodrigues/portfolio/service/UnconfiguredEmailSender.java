package me.jprodrigues.portfolio.service;

import me.jprodrigues.portfolio.exception.EmailNotConfiguredException;

/**
 * Usado quando nenhuma chave foi configurada (nem Resend, nem Gmail).
 * A API sobe normalmente e responde 503 no envio, e o site avisa o visitante.
 */
public class UnconfiguredEmailSender implements EmailSender {

    @Override
    public void send(OutgoingEmail email) {
        throw new EmailNotConfiguredException();
    }

    @Override
    public String providerName() {
        return "nenhum (configure RESEND_API_KEY ou GMAIL_USERNAME + GMAIL_APP_PASSWORD)";
    }

    @Override
    public boolean canSendToAnyone() {
        return false;
    }
}
