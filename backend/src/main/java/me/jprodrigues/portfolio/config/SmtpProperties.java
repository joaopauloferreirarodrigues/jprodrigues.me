package me.jprodrigues.portfolio.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Servidor SMTP (Gmail) usado para enviar e-mails (prefixo "smtp").
 * Usuário e senha vêm das variáveis GMAIL_USERNAME e GMAIL_APP_PASSWORD.
 */
@ConfigurationProperties(prefix = "smtp")
public record SmtpProperties(String host, int port, String username, String password) {

    public boolean isConfigured() {
        return username != null && !username.isBlank() && password != null && !password.isBlank();
    }
}
