package me.jprodrigues.portfolio.service;

/**
 * Corpo HTML dos e-mails, nas cores do site (fundo azul-tinta e acento ciano).
 * Baseado nos templates "FOR ME" e "FOR SENDER" do portfólio de referência da disciplina.
 *
 * Tudo que vem do visitante passa por escape(), para ninguém conseguir
 * injetar HTML ou links no e-mail pelo formulário.
 */
final class EmailTemplates {

    private EmailTemplates() {
    }

    /** E-mail que chega para mim com a mensagem do visitante. */
    static String notification(String name, String email, String sentAt, String message) {
        return frame(
                "Nova mensagem do site",
                "Você recebeu uma mensagem pelo formulário de jprodrigues.me.",
                messageBlock(name, escape(email) + " · " + escape(sentAt), message),
                "Clique em Responder para escrever direto para " + escape(name) + ".");
    }

    /** Confirmação que vai para quem escreveu. */
    static String confirmation(boolean english, String name, String sentAt, String message) {
        if (english) {
            return frame(
                    "Thanks for reaching out!",
                    "I got your message and will reply soon.",
                    messageBlock(name, escape(sentAt), message),
                    "João Paulo Ferreira Rodrigues · <a href=\"https://jprodrigues.me\" style=\"color:#5cc8d7;\">jprodrigues.me</a>");
        }
        return frame(
                "Obrigado pelo contato!",
                "Recebi sua mensagem e respondo em breve.",
                messageBlock(name, escape(sentAt), message),
                "João Paulo Ferreira Rodrigues · <a href=\"https://jprodrigues.me\" style=\"color:#5cc8d7;\">jprodrigues.me</a>");
    }

    private static String messageBlock(String name, String meta, String message) {
        return """
                <div style="margin-top:20px;padding:16px;border:1px dashed #34506f;border-radius:8px;background:#0d1626;">
                  <div style="font-size:16px;font-weight:bold;color:#e4eaf2;">%s</div>
                  <div style="font-size:13px;color:#9aabc2;margin-bottom:10px;">%s</div>
                  <div style="font-size:15px;color:#e4eaf2;line-height:1.6;">%s</div>
                </div>
                """.formatted(escape(name), meta, escape(message).replace("\n", "<br>"));
    }

    private static String frame(String title, String subtitle, String content, String footer) {
        return """
                <div style="font-family:system-ui,-apple-system,'Segoe UI',Arial,sans-serif;font-size:14px;color:#e4eaf2;max-width:600px;margin:auto;padding:28px;border:2px solid #5cc8d7;border-radius:10px;background:#132036;">
                  <h2 style="color:#5cc8d7;margin:0 0 6px;">%s</h2>
                  <p style="color:#9aabc2;margin:0;">%s</p>
                  %s
                  <p style="margin-top:20px;font-size:13px;color:#9aabc2;">%s</p>
                </div>
                """.formatted(title, subtitle, content, footer);
    }

    /** Troca os caracteres especiais do HTML pelas entidades equivalentes. */
    static String escape(String value) {
        if (value == null) {
            return "";
        }
        StringBuilder out = new StringBuilder(value.length());
        for (char c : value.toCharArray()) {
            switch (c) {
                case '&' -> out.append("&amp;");
                case '<' -> out.append("&lt;");
                case '>' -> out.append("&gt;");
                case '"' -> out.append("&quot;");
                case '\'' -> out.append("&#39;");
                default -> out.append(c);
            }
        }
        return out.toString();
    }
}
