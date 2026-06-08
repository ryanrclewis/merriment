"use client";

import { useState, useRef } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const EVENT_TYPES = [
  "Wedding",
  "Engagement Party",
  "Baby Shower",
  "Birthday Celebration",
  "Corporate Event",
  "Anniversary",
  "Holiday Party",
  "Other",
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name:      (form.elements.namedItem("name")      as HTMLInputElement).value,
      email:     (form.elements.namedItem("email")     as HTMLInputElement).value,
      phone:     (form.elements.namedItem("phone")     as HTMLInputElement).value,
      eventType: (form.elements.namedItem("eventType") as HTMLSelectElement).value,
      eventDate: (form.elements.namedItem("eventDate") as HTMLInputElement).value,
      message:   (form.elements.namedItem("message")   as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json() as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "Something went wrong.");
      }
      setStatus("success");
      formRef.current?.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 20.5l5.5 5.5 10-11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h3>We got your note.</h3>
        <p>Thank you for reaching out. We'll be in touch within 1–2 business days.</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="contact-form"
      noValidate
      aria-label="Inquiry form"
    >
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="cf-name">Your name</label>
          <input id="cf-name" name="name" type="text" autoComplete="name" required placeholder="Jane Smith" />
        </div>
        <div className="form-field">
          <label htmlFor="cf-email">Email address</label>
          <input id="cf-email" name="email" type="email" autoComplete="email" required placeholder="jane@example.com" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="cf-phone">Phone <span className="form-optional">(optional)</span></label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" placeholder="(555) 000-0000" />
        </div>
        <div className="form-field">
          <label htmlFor="cf-eventType">Type of event</label>
          <select id="cf-eventType" name="eventType" defaultValue="">
            <option value="" disabled>Select one…</option>
            {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="cf-eventDate">Event date <span className="form-optional">(if known)</span></label>
        <input id="cf-eventDate" name="eventDate" type="date" />
      </div>

      <div className="form-field">
        <label htmlFor="cf-message">Tell us about your event</label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          placeholder="Share any details you have — venue ideas, guest count, vibe you're going for…"
        />
      </div>

      {status === "error" && (
        <p className="form-error" role="alert">{errorMsg}</p>
      )}

      <button
        type="submit"
        className="btn btn-dark form-submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Send Inquiry"}
      </button>
    </form>
  );
}
