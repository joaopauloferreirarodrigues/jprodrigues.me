package me.jprodrigues.portfolio.security;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.time.ZoneOffset;

import org.junit.jupiter.api.Test;

class RateLimiterTest {

    /** Relógio que só anda quando o teste manda. */
    private static class FakeClock extends Clock {
        private Instant now = Instant.parse("2026-10-12T12:00:00Z");

        void advance(Duration duration) {
            now = now.plus(duration);
        }

        @Override
        public Instant instant() {
            return now;
        }

        @Override
        public ZoneOffset getZone() {
            return ZoneOffset.UTC;
        }

        @Override
        public Clock withZone(java.time.ZoneId zone) {
            return this;
        }
    }

    @Test
    void permiteAteOLimiteEBloqueiaDepois() {
        RateLimiter limiter = new RateLimiter(3, Duration.ofMinutes(10), new FakeClock());

        assertThat(limiter.tryAcquire("1.1.1.1")).isTrue();
        assertThat(limiter.tryAcquire("1.1.1.1")).isTrue();
        assertThat(limiter.tryAcquire("1.1.1.1")).isTrue();
        assertThat(limiter.tryAcquire("1.1.1.1")).isFalse();
    }

    @Test
    void cadaVisitanteTemSeuProprioLimite() {
        RateLimiter limiter = new RateLimiter(1, Duration.ofMinutes(10), new FakeClock());

        assertThat(limiter.tryAcquire("1.1.1.1")).isTrue();
        assertThat(limiter.tryAcquire("1.1.1.1")).isFalse();
        assertThat(limiter.tryAcquire("2.2.2.2")).isTrue();
    }

    @Test
    void liberaDeNovoQuandoAJanelaTermina() {
        FakeClock clock = new FakeClock();
        RateLimiter limiter = new RateLimiter(1, Duration.ofMinutes(10), clock);

        assertThat(limiter.tryAcquire("1.1.1.1")).isTrue();
        assertThat(limiter.tryAcquire("1.1.1.1")).isFalse();

        clock.advance(Duration.ofMinutes(10));

        assertThat(limiter.tryAcquire("1.1.1.1")).isTrue();
    }
}
