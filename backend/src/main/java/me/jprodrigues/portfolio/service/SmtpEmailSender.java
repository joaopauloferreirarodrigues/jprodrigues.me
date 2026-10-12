package me.jprodrigues.portfolio.service;

import java.io.UnsupportedEncodingException;
import java.util.Properties;

import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import me.jprodrigues.portfolio.config.SmtpProperties;
import me.jprodrigues.portfolio.exception.EmailDeliveryException;

/**
 * Envia e-mails pelo Gmail (SMTP), no mesmo esquema do projeto SendEmail
 * da disciplina: JavaMailSender + MimeMessageHelper com conteúdo HTML.
 *
 * Funciona no computador. No plano gratuito do Render as portas SMTP
 * (25, 465 e 587) são bloqueadas, por isso lá usamos o Resend.
 */
public class SmtpEmailSender implements EmailSender {

    private static final String FROM_NAME = "Portfólio jprodrigues.me";

    private final JavaMailSender mailSender;
    private final String fromAddress;

    public SmtpEmailSender(SmtpProperties properties) {
        this.fromAddress = properties.username().trim();

        JavaMailSenderImpl impl = new JavaMailSenderImpl();
        impl.setHost(properties.host());
        impl.setPort(properties.port());
        impl.setUsername(fromAddress);
        // O Google mostra a senha de app em blocos ("abcd efgh ijkl mnop"): os espaços saem aqui
        impl.setPassword(properties.password().replaceAll("\\s+", ""));
        impl.setDefaultEncoding("UTF-8");

        Properties mail = impl.getJavaMailProperties();
        mail.put("mail.smtp.auth", "true");
        mail.put("mail.smtp.starttls.enable", "true");
        mail.put("mail.smtp.starttls.required", "true");
        mail.put("mail.smtp.connectiontimeout", "5000");
        mail.put("mail.smtp.timeout", "10000");
        mail.put("mail.smtp.writetimeout", "10000");

        this.mailSender = impl;
    }

    @Override
    public void send(OutgoingEmail email) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromAddress, FROM_NAME);
            helper.setTo(email.to());
            if (email.replyTo() != null) {
                helper.setReplyTo(email.replyTo());
            }
            helper.setSubject(email.subject());
            helper.setText(email.text(), email.html());

            mailSender.send(message);
        } catch (MailException | MessagingException | UnsupportedEncodingException e) {
            throw new EmailDeliveryException("Falha ao enviar e-mail pelo Gmail (SMTP)", e);
        }
    }

    @Override
    public String providerName() {
        return "Gmail (SMTP) como " + fromAddress;
    }

    @Override
    public boolean canSendToAnyone() {
        return true;
    }
}
