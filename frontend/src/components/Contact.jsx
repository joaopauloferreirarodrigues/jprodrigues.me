import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";

import { profile } from "../data/profile";
import { sendContactMessage, wakeUpApi } from "../services/contactApi";
import "./Contact.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SLOW_RESPONSE_MS = 4000;

// Mensagem mostrada para cada resultado devolvido pela API
const RESULT_MESSAGES = {
  sent: { type: "success", key: "contact.form.sent" },
  too_many: { type: "error", key: "contact.form.tooMany" },
  not_configured: { type: "error", key: "contact.form.notConfigured" },
  invalid: { type: "error", key: "contact.form.failed" },
  failed: { type: "error", key: "contact.form.failed" },
};

function buildChannels(links) {
  return [
    links.email && {
      id: "email",
      label: "E-mail",
      value: links.email,
      href: `mailto:${links.email}`,
      Icon: FiMail,
    },
    links.whatsapp && {
      id: "whatsapp",
      label: "WhatsApp",
      value: `+${links.whatsapp}`,
      href: `https://wa.me/${links.whatsapp}`,
      Icon: FaWhatsapp,
    },
    links.linkedin && {
      id: "linkedin",
      label: "LinkedIn",
      value: links.linkedin.replace(/^https?:\/\/(www\.)?/, ""),
      href: links.linkedin,
      Icon: FaLinkedin,
    },
    links.github && {
      id: "github",
      label: "GitHub",
      value: links.github.replace(/^https?:\/\//, ""),
      href: links.github,
      Icon: FaGithub,
    },
  ].filter(Boolean);
}

export default function Contact() {
  const { t, i18n } = useTranslation();
  const [status, setStatus] = useState({ type: "idle", key: "" });
  const channels = buildChannels(profile.links);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  // Acorda o back-end assim que o site abre (plano gratuito do Render)
  useEffect(() => {
    wakeUpApi();
  }, []);

  async function onSubmit(data) {
    setStatus({ type: "idle", key: "" });
    // Se a resposta demorar, avisa que o servidor está acordando
    const slowTimer = setTimeout(
      () => setStatus({ type: "info", key: "contact.form.waking" }),
      SLOW_RESPONSE_MS
    );

    const result = await sendContactMessage({
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
      website: data.website,
      lang: i18n.language === "en" ? "en" : "pt",
    });

    clearTimeout(slowTimer);
    setStatus(RESULT_MESSAGES[result] ?? RESULT_MESSAGES.failed);
    if (result === "sent") reset();
  }

  return (
    <section id="contato" className="section" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div>
          <header className="section-head">
            <h2 id="contact-title">{t("contact.title")}</h2>
            <p>{t("contact.intro")}</p>
          </header>

          <h3 className="visually-hidden">{t("contact.channels")}</h3>
          <ul className="channels">
            {channels.map(({ id, label, value, href, Icon }) => (
              <li key={id}>
                <a
                  className="channel"
                  href={href}
                  target={id === "email" ? undefined : "_blank"}
                  rel="noreferrer"
                >
                  <Icon className="channel-icon" aria-hidden="true" />
                  <span className="channel-text">
                    <span className="channel-label">{label}</span>
                    <span className="channel-value mono">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="field">
            <label htmlFor="name">{t("contact.form.name")}</label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              {...register("name", {
                required: t("contact.form.errors.nameRequired"),
                maxLength: 100,
                validate: (value) =>
                  value.trim().length >= 2 || t("contact.form.errors.nameShort"),
              })}
              maxLength={100}
            />
            {errors.name && (
              <p id="name-error" className="field-error" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="email">{t("contact.form.email")}</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email", {
                required: t("contact.form.errors.emailRequired"),
                pattern: {
                  value: EMAIL_PATTERN,
                  message: t("contact.form.errors.emailInvalid"),
                },
              })}
            />
            {errors.email && (
              <p id="email-error" className="field-error" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="message">{t("contact.form.message")}</label>
            <textarea
              id="message"
              rows="6"
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby={errors.message ? "message-error" : undefined}
              {...register("message", {
                required: t("contact.form.errors.messageRequired"),
                maxLength: {
                  value: 2000,
                  message: t("contact.form.errors.messageLong"),
                },
                validate: (value) =>
                  value.trim().length >= 10 ||
                  t("contact.form.errors.messageShort"),
              })}
            />
            {errors.message && (
              <p id="message-error" className="field-error" role="alert">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Campo isca: invisível para pessoas, robôs costumam preencher */}
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("website")}
            />
          </div>

          <button
            type="submit"
            className="button button-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? t("contact.form.sending") : t("contact.form.send")}
          </button>

          <p
            className={`form-status form-status-${status.type}`}
            role="status"
            aria-live="polite"
          >
            {status.key ? t(status.key) : ""}
          </p>
        </form>
      </div>
    </section>
  );
}
