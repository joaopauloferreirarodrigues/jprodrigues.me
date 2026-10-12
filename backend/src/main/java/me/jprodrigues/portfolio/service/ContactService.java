package me.jprodrigues.portfolio.service;

import java.time.Clock;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import me.jprodrigues.portfolio.config.ContactProperties;
import me.jprodrigues.portfolio.dto.ContactRequest;
import me.jprodrigues.portfolio.exception.EmailDeliveryException;

/**
 * Regra de negócio do formulário de contato: monta os e-mails e manda enviar.
 */
@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);
    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter
            .ofPattern("dd/MM/yyyy 'às' HH:mm")
            .withZone(ZoneId.of("America/Sao_Paulo"));

    private final EmailSender emailSender;
    private final ContactProperties properties;
    private final Clock clock;

    public ContactService(EmailSender emailSender, ContactProperties properties, Clock clock) {
        this.emailSender = emailSender;
        this.properties = properties;
        this.clock = clock;
    }

    public void send(ContactRequest request) {
        String name = singleLine(request.name());
        String email = request.email().trim();
        String message = request.message().trim();
        String sentAt = DATE_FORMAT.format(clock.instant());

        // 1) Notificação para mim. "Responder" vai direto para quem escreveu.
        emailSender.send(new OutgoingEmail(
                properties.from(),
                properties.receiver(),
                email,
                "Nova mensagem do portfólio: " + name,
                """
                Nova mensagem pelo formulário de jprodrigues.me

                Nome: %s
                E-mail: %s
                Enviada em: %s

                %s
                """.formatted(name, email, sentAt, message)));

        // 2) Confirmação para quem escreveu (opcional: exige domínio verificado no Resend).
        //    Se falhar, a mensagem principal já foi entregue, então só registra no log.
        if (properties.sendConfirmation()) {
            try {
                emailSender.send(confirmationFor(request, name, email, message));
            } catch (EmailDeliveryException e) {
                log.warn("Mensagem entregue, mas a confirmação para o remetente falhou", e);
            }
        }
    }

    private OutgoingEmail confirmationFor(ContactRequest request, String name, String email, String message) {
        if (request.isEnglish()) {
            return new OutgoingEmail(properties.from(), email, properties.receiver(),
                    "I got your message",
                    """
                    Hi %s,

                    Thanks for reaching out through jprodrigues.me. I got your message and will reply soon.

                    Your message:
                    %s

                    João Paulo Ferreira Rodrigues
                    """.formatted(name, message));
        }
        return new OutgoingEmail(properties.from(), email, properties.receiver(),
                "Recebi sua mensagem",
                """
                Olá, %s!

                Obrigado pelo contato pelo jprodrigues.me. Recebi sua mensagem e respondo em breve.

                Sua mensagem:
                %s

                João Paulo Ferreira Rodrigues
                """.formatted(name, message));
    }

    /** Remove quebras de linha para o nome não "quebrar" o assunto do e-mail. */
    private static String singleLine(String value) {
        return value.replaceAll("[\\r\\n]+", " ").trim();
    }
}
