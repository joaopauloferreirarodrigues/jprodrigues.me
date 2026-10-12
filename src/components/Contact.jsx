import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";

import { profile } from "../data/profile";
import EMAILJS_CONFIG, { isEmailConfigured } from "../config/emailJsConfig";
import "./Contact.css";

// Data e hora do envio, no horário de Brasília, para aparecer no e-mail.
function sentAt() {
  return new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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
  const { t } = useTranslation();
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const channels = buildChannels(profile.links);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  async function onSubmit(data) {
    if (!isEmailConfigured) {
      setStatus({ type: "error", message: t("contact.form.notConfigured") });
      return;
    }

    const params = {
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
      time: sentAt(),
    };

    try {
      // 1) Notificação para mim
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID_FOR_ME,
        { ...params, title: `Nova mensagem do portfólio: ${params.name}` },
        { publicKey: EMAILJS_CONFIG.PUBLIC_KEY }
      );
      // 2) Confirmação para quem enviou (opcional)
      if (EMAILJS_CONFIG.TEMPLATE_ID_FOR_SENDER) {
        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID_FOR_SENDER,
          { ...params, title: "Recebi sua mensagem!" },
          { publicKey: EMAILJS_CONFIG.PUBLIC_KEY }
        );
      }
      setStatus({ type: "success", message: t("contact.form.sent") });
      reset();
    } catch (error) {
      console.error("Falha no envio pelo EmailJS:", error);
      setStatus({ type: "error", message: t("contact.form.failed") });
    }
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
                validate: (value) =>
                  value.trim().length >= 2 || t("contact.form.errors.nameShort"),
              })}
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
            {status.message}
          </p>
        </form>
      </div>
    </section>
  );
}
