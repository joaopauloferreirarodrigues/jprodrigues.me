package me.jprodrigues.portfolio.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;

import me.jprodrigues.portfolio.config.ContactProperties;
import me.jprodrigues.portfolio.dto.ContactRequest;

class ContactServiceTest {

    /** Em vez de enviar, guarda os e-mails numa lista para o teste conferir. */
    private static class FakeEmailSender implements EmailSender {
        final List<OutgoingEmail> sent = new ArrayList<>();

        @Override
        public void send(OutgoingEmail email) {
            sent.add(email);
        }
    }

    private final Clock clock = Clock.fixed(Instant.parse("2026-10-12T15:30:00Z"), ZoneOffset.UTC);

    private ContactProperties properties(boolean sendConfirmation) {
        return new ContactProperties(
                "eu@exemplo.com",
                "Portfolio <onboarding@resend.dev>",
                sendConfirmation,
                List.of("http://localhost:5173"),
                5,
                Duration.ofMinutes(10),
                80);
    }

    private ContactRequest request(String lang) {
        return new ContactRequest("Maria\nSilva", "maria@exemplo.com", "Olá, gostei do seu portfólio!", null, lang);
    }

    @Test
    void enviaNotificacaoComRespostaParaQuemEscreveu() {
        FakeEmailSender sender = new FakeEmailSender();
        new ContactService(sender, properties(false), clock).send(request("pt"));

        assertThat(sender.sent).hasSize(1);
        OutgoingEmail email = sender.sent.get(0);
        assertThat(email.to()).isEqualTo("eu@exemplo.com");
        assertThat(email.replyTo()).isEqualTo("maria@exemplo.com");
        // a quebra de linha no nome não pode chegar ao assunto
        assertThat(email.subject()).isEqualTo("Nova mensagem do portfólio: Maria Silva");
        // horário de Brasília (UTC-3)
        assertThat(email.text()).contains("12/10/2026 às 12:30").contains("Olá, gostei do seu portfólio!");
    }

    @Test
    void enviaConfirmacaoNoIdiomaDoSiteQuandoHabilitado() {
        FakeEmailSender sender = new FakeEmailSender();
        new ContactService(sender, properties(true), clock).send(request("en"));

        assertThat(sender.sent).hasSize(2);
        OutgoingEmail confirmation = sender.sent.get(1);
        assertThat(confirmation.to()).isEqualTo("maria@exemplo.com");
        assertThat(confirmation.subject()).isEqualTo("I got your message");
    }
}
