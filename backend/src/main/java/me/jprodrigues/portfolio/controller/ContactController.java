package me.jprodrigues.portfolio.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import me.jprodrigues.portfolio.dto.ContactRequest;
import me.jprodrigues.portfolio.exception.TooManyRequestsException;
import me.jprodrigues.portfolio.security.RateLimiter;
import me.jprodrigues.portfolio.service.ContactService;

/**
 * Endpoints da API.
 *
 * GET  /            → informação simples, para conferir no navegador (http://localhost:8080)
 * GET  /api/health  → usado pelo Render e pelo site para "acordar" o servidor
 * POST /api/contact → recebe a mensagem do formulário e envia por e-mail
 */
@RestController
public class ContactController {

    private final ContactService contactService;
    private final RateLimiter visitorRateLimiter;
    private final RateLimiter dailyRateLimiter;

    public ContactController(
            ContactService contactService,
            @Qualifier("visitorRateLimiter") RateLimiter visitorRateLimiter,
            @Qualifier("dailyRateLimiter") RateLimiter dailyRateLimiter) {
        this.contactService = contactService;
        this.visitorRateLimiter = visitorRateLimiter;
        this.dailyRateLimiter = dailyRateLimiter;
    }

    @GetMapping("/")
    public Map<String, String> index() {
        return Map.of("service", "portfolio-api", "status", "ok", "contact", "POST /api/contact");
    }

    @GetMapping("/api/health")
    public Map<String, String> health() {
        return Map.of("status", "ok");
    }

    @PostMapping("/api/contact")
    public ResponseEntity<Map<String, String>> contact(
            @Valid @RequestBody ContactRequest request,
            HttpServletRequest httpRequest) {

        if (!visitorRateLimiter.tryAcquire(clientIp(httpRequest)) || !dailyRateLimiter.tryAcquire("site")) {
            throw new TooManyRequestsException();
        }

        // Robôs preenchem o campo escondido: responde como se tivesse enviado, mas descarta.
        if (!request.looksLikeBot()) {
            contactService.send(request);
        }
        return ResponseEntity.accepted().body(Map.of("status", "sent"));
    }

    /**
     * No Render a requisição passa por um proxy, então o IP real do visitante
     * chega no cabeçalho X-Forwarded-For (o primeiro da lista).
     */
    private static String clientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            return forwarded.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
