package me.jprodrigues.portfolio.service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import me.jprodrigues.portfolio.config.ResendProperties;
import me.jprodrigues.portfolio.exception.EmailDeliveryException;
import me.jprodrigues.portfolio.exception.EmailNotConfiguredException;

/**
 * Envia e-mails pela API HTTPS do Resend (https://resend.com).
 *
 * Por que não SMTP (Gmail)? O plano gratuito do Render bloqueia as portas SMTP
 * (25, 465 e 587). Uma API por HTTPS usa a porta 443, que continua liberada.
 */
@Component
public class ResendEmailSender implements EmailSender {

    private static final int CONNECT_TIMEOUT_MS = 5_000;
    private static final int READ_TIMEOUT_MS = 10_000;

    private final ResendProperties properties;
    private final RestClient restClient;

    public ResendEmailSender(ResendProperties properties, RestClient.Builder builder) {
        this.properties = properties;

        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setConnectTimeout(CONNECT_TIMEOUT_MS);
        requestFactory.setReadTimeout(READ_TIMEOUT_MS);

        this.restClient = builder
                .baseUrl(properties.baseUrl())
                .requestFactory(requestFactory)
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + properties.apiKey())
                .build();
    }

    @Override
    public void send(OutgoingEmail email) {
        if (!properties.isConfigured()) {
            throw new EmailNotConfiguredException();
        }

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("from", email.from());
        body.put("to", List.of(email.to()));
        body.put("subject", email.subject());
        body.put("text", email.text());
        if (email.replyTo() != null) {
            body.put("reply_to", email.replyTo());
        }

        try {
            restClient.post()
                    .uri("/emails")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(body)
                    .retrieve()
                    .toBodilessEntity();
        } catch (RestClientException e) {
            throw new EmailDeliveryException("Falha ao enviar e-mail pelo Resend", e);
        }
    }
}
