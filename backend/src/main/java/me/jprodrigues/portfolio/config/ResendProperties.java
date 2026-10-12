package me.jprodrigues.portfolio.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Credenciais da API do Resend (prefixo "resend").
 * A chave vem da variável de ambiente RESEND_API_KEY e nunca fica no código.
 */
@ConfigurationProperties(prefix = "resend")
public record ResendProperties(String apiKey, String baseUrl) {

    public boolean isConfigured() {
        return apiKey != null && !apiKey.isBlank();
    }
}
