package me.jprodrigues.portfolio.exception;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Converte erros em respostas JSON curtas, sem expor detalhes internos.
 * O front-end usa o campo "status" para escolher a mensagem que mostra.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /** 400: algum campo não passou na validação. */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException e) {
        List<String> fields = e.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField())
                .distinct()
                .toList();
        return ResponseEntity.badRequest().body(Map.of("status", "invalid", "fields", fields));
    }

    /** 400: o corpo da requisição não é um JSON válido. */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, Object>> handleUnreadable(HttpMessageNotReadableException e) {
        return ResponseEntity.badRequest().body(Map.of("status", "invalid"));
    }

    /** 429: limite de mensagens atingido. */
    @ExceptionHandler(TooManyRequestsException.class)
    public ResponseEntity<Map<String, Object>> handleTooMany(TooManyRequestsException e) {
        return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(Map.of("status", "too_many"));
    }

    /** 503: nenhuma chave de e-mail foi configurada no servidor. */
    @ExceptionHandler(EmailNotConfiguredException.class)
    public ResponseEntity<Map<String, Object>> handleNotConfigured(EmailNotConfiguredException e) {
        log.error(e.getMessage());
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(Map.of("status", "not_configured"));
    }

    /** 502: o provedor de e-mail recusou ou não respondeu. */
    @ExceptionHandler(EmailDeliveryException.class)
    public ResponseEntity<Map<String, Object>> handleDelivery(EmailDeliveryException e) {
        log.error("Falha no envio de e-mail", e);
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(Map.of("status", "failed"));
    }
}
