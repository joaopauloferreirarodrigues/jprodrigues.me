package me.jprodrigues.portfolio.service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import me.jprodrigues.portfolio.config.ResendProperties;
import me.jprodrigues.portfolio.exception.EmailDeliveryException;

/**
 * Envia e-mails pela API HTTPS do Resend (https://resend.com).
 *
 * Por que não SMTP (Gmail) no Render? O plano gratuito do Render bloqueia as portas
 * SMTP (25, 465 e 587). Uma API por HTTPS usa a porta 443, que continua liberada.
 */
public class ResendEmailSender implements EmailSender {

    private static final int CONNECT_TIMEOUT_MS = 5_000;
    private static final int READ_TIMEOUT_MS = 10_000;

    private final RestClient restClient;
    private final String from;

    public ResendEmailSender(ResendProperties properties, String from, RestClient.Builder builder) {
        this.from = from;

        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setConnectTimeout(CONNECT_TIMEOUT_MS);
        requestFactory.setReadTimeout(READ_TIMEOUT_MS);

        this.restClient = builder
                .baseUrl(properties.baseUrl())
                .requestFactory(requestFactory)
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + properties.apiKey().trim())
                .build();
    }

    @Override
    public void send(OutgoingEmail email) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("from", from);
        body.put("to", List.of(email.to()));
        body.put("subject", email.subject());
        body.put("text", email.text());
        body.put("html", email.html());
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

    @Override
    public String providerName() {
        return "Resend (API HTTPS) como " + from;
    }

    /** O remetente de teste do Resend (@resend.dev) só entrega para o dono da conta. */
    @Override
    public boolean canSendToAnyone() {
        return !from.toLowerCase().contains("@resend.dev");
    }
}
