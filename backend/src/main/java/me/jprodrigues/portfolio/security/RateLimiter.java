package me.jprodrigues.portfolio.security;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Limite de requisições em janela fixa, guardado em memória.
 * Exemplo: no máximo 5 mensagens a cada 10 minutos para cada chave (IP).
 * Protege o formulário contra spam e a cota gratuita de e-mails.
 */
public class RateLimiter {

    private static final int MAX_KEYS = 10_000;

    private final int limit;
    private final Duration window;
    private final Clock clock;
    private final Map<String, Window> windows = new ConcurrentHashMap<>();

    private record Window(Instant start, int count) {
    }

    public RateLimiter(int limit, Duration window, Clock clock) {
        this.limit = limit;
        this.window = window;
        this.clock = clock;
    }

    /**
     * Registra uma tentativa para a chave e diz se ela ainda está dentro do limite.
     */
    public boolean tryAcquire(String key) {
        Instant now = clock.instant();
        Window current = windows.compute(key, (k, existing) -> {
            if (existing == null || isExpired(existing, now)) {
                return new Window(now, 1);
            }
            return new Window(existing.start(), existing.count() + 1);
        });

        if (windows.size() > MAX_KEYS) {
            windows.entrySet().removeIf(entry -> isExpired(entry.getValue(), now));
        }
        return current.count() <= limit;
    }

    private boolean isExpired(Window w, Instant now) {
        return !now.isBefore(w.start().plus(window));
    }
}
