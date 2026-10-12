package me.jprodrigues.portfolio.config;

import java.time.Duration;
import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Configurações do formulário de contato, lidas do application.properties
 * (prefixo "contact"). Cada valor pode ser trocado por variável de ambiente.
 */
@ConfigurationProperties(prefix = "contact")
public record ContactProperties(
        String receiver,
        String from,
        boolean sendConfirmation,
        List<String> allowedOrigins,
        int maxPerWindow,
        Duration window,
        int dailyLimit) {
}
