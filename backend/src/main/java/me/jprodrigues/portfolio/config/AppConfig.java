package me.jprodrigues.portfolio.config;

import java.time.Clock;
import java.time.Duration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import me.jprodrigues.portfolio.security.RateLimiter;
import me.jprodrigues.portfolio.service.EmailSender;
import me.jprodrigues.portfolio.service.ResendEmailSender;
import me.jprodrigues.portfolio.service.SmtpEmailSender;
import me.jprodrigues.portfolio.service.UnconfiguredEmailSender;

/**
 * Beans da aplicação e regras de CORS.
 */
@Configuration
public class AppConfig implements WebMvcConfigurer {

    private static final Logger log = LoggerFactory.getLogger(AppConfig.class);

    private final ContactProperties contactProperties;

    public AppConfig(ContactProperties contactProperties) {
        this.contactProperties = contactProperties;
    }

    /** Relógio usado nas datas dos e-mails e nos limites de envio. */
    @Bean
    public Clock clock() {
        return Clock.systemUTC();
    }

    /**
     * Escolhe o provedor de e-mail pelas chaves configuradas:
     * 1. RESEND_API_KEY preenchida → Resend (funciona no Render)
     * 2. GMAIL_USERNAME + GMAIL_APP_PASSWORD → Gmail por SMTP (funciona no computador)
     * 3. nenhuma → a API sobe, mas responde 503 no envio
     */
    @Bean
    public EmailSender emailSender(ResendProperties resend, SmtpProperties smtp, RestClient.Builder restClientBuilder) {
        EmailSender sender;
        if (resend.isConfigured()) {
            sender = new ResendEmailSender(resend, contactProperties.from(), restClientBuilder);
        } else if (smtp.isConfigured()) {
            sender = new SmtpEmailSender(smtp);
        } else {
            sender = new UnconfiguredEmailSender();
        }
        log.info("Envio de e-mail: {}", sender.providerName());
        return sender;
    }

    /** Limite por visitante (endereço IP). */
    @Bean
    public RateLimiter visitorRateLimiter(Clock clock) {
        return new RateLimiter(contactProperties.maxPerWindow(), contactProperties.window(), clock);
    }

    /** Limite geral por dia, para não estourar a cota gratuita do provedor de e-mail. */
    @Bean
    public RateLimiter dailyRateLimiter(Clock clock) {
        return new RateLimiter(contactProperties.dailyLimit(), Duration.ofDays(1), clock);
    }

    /** Só o próprio site (e o localhost, em desenvolvimento) pode chamar a API pelo navegador. */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(contactProperties.allowedOrigins().toArray(String[]::new))
                .allowedMethods("GET", "POST")
                .allowedHeaders("Content-Type")
                .maxAge(3600);
    }
}
