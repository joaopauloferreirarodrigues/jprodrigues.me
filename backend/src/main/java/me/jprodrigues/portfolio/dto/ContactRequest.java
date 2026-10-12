package me.jprodrigues.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Dados enviados pelo formulário de contato do site.
 *
 * @param name    nome de quem escreveu
 * @param email   e-mail para resposta
 * @param message texto da mensagem
 * @param website campo "isca" escondido no formulário: pessoas não preenchem, robôs sim
 * @param lang    idioma do site no momento do envio ("pt" ou "en")
 */
public record ContactRequest(
        @NotBlank @Size(min = 2, max = 100) String name,
        @NotBlank @Email @Size(max = 254) String email,
        @NotBlank @Size(min = 10, max = 2000) String message,
        @Size(max = 200) String website,
        @Size(max = 5) String lang) {

    /** true quando o campo isca foi preenchido, ou seja, provavelmente é um robô. */
    public boolean looksLikeBot() {
        return website != null && !website.isBlank();
    }

    public boolean isEnglish() {
        return "en".equalsIgnoreCase(lang);
    }
}
