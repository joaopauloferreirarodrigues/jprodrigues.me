package me.jprodrigues.portfolio.config;

import java.time.Clock;
import java.time.Duration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import me.jprodrigues.portfolio.security.RateLimiter;

/**
 * Beans da aplicação e regras de CORS.
 */
@Configuration
public class AppConfig implements WebMvcConfigurer {

    private final ContactProperties contactProperties;

    public AppConfig(ContactProperties contactProperties) {
        this.contactProperties = contactProperties;
    }

    /** Relógio usado nas datas dos e-mails e nos limites de envio. */
    @Bean
    public Clock clock() {
        return Clock.systemUTC();
    }

    /** Limite por visitante (endereço IP). */
    @Bean
    public RateLimiter visitorRateLimiter(Clock clock) {
        return new RateLimiter(contactProperties.maxPerWindow(), contactProperties.window(), clock);
    }

    /** Limite geral por dia, para não estourar a cota gratuita do Resend. */
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
