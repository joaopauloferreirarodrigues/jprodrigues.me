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
        private final boolean canSendToAnyone;

        FakeEmailSender(boolean canSendToAnyone) {
            this.canSendToAnyone = canSendToAnyone;
        }

        @Override
        public void send(OutgoingEmail email) {
            sent.add(email);
        }

        @Override
        public String providerName() {
            return "fake";
        }

        @Override
        public boolean canSendToAnyone() {
            return canSendToAnyone;
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

    private ContactRequest request(String message, String lang) {
        return new ContactRequest("Maria\nSilva", "maria@exemplo.com", message, null, lang);
    }

    @Test
    void enviaNotificacaoComRespostaParaQuemEscreveu() {
        FakeEmailSender sender = new FakeEmailSender(true);
        new ContactService(sender, properties(false), clock).send(request("Olá, gostei do seu portfólio!", "pt"));

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
    void enviaConfirmacaoNoIdiomaDoSiteQuandoOProvedorPermite() {
        FakeEmailSender sender = new FakeEmailSender(true);
        new ContactService(sender, properties(true), clock).send(request("Hello, nice portfolio!", "en"));

        assertThat(sender.sent).hasSize(2);
        OutgoingEmail confirmation = sender.sent.get(1);
        assertThat(confirmation.to()).isEqualTo("maria@exemplo.com");
        assertThat(confirmation.subject()).isEqualTo("I got your message");
    }

    @Test
    void naoEnviaConfirmacaoQuandoOProvedorSoEntregaParaODono() {
        FakeEmailSender sender = new FakeEmailSender(false);
        new ContactService(sender, properties(true), clock).send(request("Olá, gostei do seu portfólio!", "pt"));

        assertThat(sender.sent).hasSize(1);
    }

    @Test
    void escapaHtmlDigitadoNoFormulario() {
        FakeEmailSender sender = new FakeEmailSender(true);
        new ContactService(sender, properties(false), clock)
                .send(request("<script>alert('x')</script> <a href=\"http://golpe\">clique</a>", "pt"));

        String html = sender.sent.get(0).html();
        assertThat(html).contains("&lt;script&gt;").contains("&lt;a href=&quot;http://golpe&quot;&gt;");
        assertThat(html.contains("<script>")).isFalse();
    }
}
