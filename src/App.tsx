import { useState, useRef } from "react";
import { GiftIntro } from "../app/components/GiftIntro";

const EVENT_TYPES = ["Wedding","Engagement Party","Baby Shower","Birthday Celebration","Corporate Event","Anniversary","Holiday Party","Other"];

// Handdrawn-style coupe glass + diamond sparkle, matches brand illustration
function CoupeIcon({ size = 36, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size * 1.25}
      viewBox="0 0 36 45"
      fill="none"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Diamond sparkle */}
      <path d="M18 1 L19.2 3.8 L18 6.5 L16.8 3.8 Z" />
      {/* Coupe bowl */}
      <path d="M5 11 Q18 22 31 11" />
      <line x1="5" y1="11" x2="13.5" y2="25" />
      <line x1="31" y1="11" x2="22.5" y2="25" />
      {/* Stem join */}
      <line x1="13.5" y1="25" x2="22.5" y2="25" />
      {/* Stem */}
      <line x1="18" y1="25" x2="18" y2="37" />
      {/* Base */}
      <path d="M10 37 Q18 39.5 26 37" />
    </svg>
  );
}

function InlineContactForm() {
  const [status, setStatus] = useState<"idle"|"submitting"|"success"|"error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
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
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json() as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Something went wrong.");
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
        <CoupeIcon size={40} color="#8BBFB0" />
        <h3>We got your note.</h3>
        <p>Thank you for reaching out. We'll be in touch within 1–2 business days.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="contact-form" noValidate>
      <div className="form-row">
        <div className="form-field"><label htmlFor="cf-name">Your name</label><input id="cf-name" name="name" type="text" required placeholder="Jane Smith" /></div>
        <div className="form-field"><label htmlFor="cf-email">Email address</label><input id="cf-email" name="email" type="email" required placeholder="jane@example.com" /></div>
      </div>
      <div className="form-row">
        <div className="form-field"><label htmlFor="cf-phone">Phone <span className="form-optional">(optional)</span></label><input id="cf-phone" name="phone" type="tel" placeholder="(555) 000-0000" /></div>
        <div className="form-field"><label htmlFor="cf-eventType">Type of event</label><select id="cf-eventType" name="eventType" defaultValue=""><option value="" disabled>Select one…</option>{EVENT_TYPES.map(t=><option key={t} value={t}>{t}</option>)}</select></div>
      </div>
      <div className="form-field"><label htmlFor="cf-eventDate">Event date <span className="form-optional">(if known)</span></label><input id="cf-eventDate" name="eventDate" type="date" /></div>
      <div className="form-field"><label htmlFor="cf-message">Tell us about your event</label><textarea id="cf-message" name="message" required rows={5} placeholder="Share any details — venue ideas, guest count, vibe you're going for…" /></div>
      {status === "error" && <p className="form-error" role="alert">{errorMsg}</p>}
      <button type="submit" className="btn btn-dark form-submit" disabled={status === "submitting"}>{status === "submitting" ? "Sending…" : "Send Inquiry"}</button>
    </form>
  );
}

const services = [
  {
    img: "/1D9A4460.jpg",
    alt: "Bride holding bouquet in lace gown",
    title: "Weddings",
    desc: "Full-service wedding planning from first vision to final farewell — intimate elopements to grand receptions.",
  },
  {
    img: "/IMG_4640.jpg",
    alt: "Charcuterie and grazing board",
    title: "Social Gatherings",
    desc: "Birthday celebrations, baby showers, dinner parties and every occasion in between.",
  },
  {
    img: "/IMG_4645.jpg",
    alt: "Blue and white floral centerpiece",
    title: "Styled Events",
    desc: "Tablescapes, florals, signage and full visual design for events that photograph beautifully.",
  },
  {
    img: "/C754A9D3-5BC2-46B3-A541-4BE79C9C84FB.jpg",
    alt: "Elegant place setting with lavender",
    title: "Corporate & Special",
    desc: "Galas, retreats, milestone dinners — elevated with the same care we bring to personal celebrations.",
  },
];

const testimonials = [
  {
    quote: "Merriment brought our vision to life in ways we never could have imagined. Every single detail was perfection.",
    author: "Eleanor & James",
    event: "Summer Wedding",
  },
  {
    quote: "I handed over my chaotic list of ideas and got back something that felt like a dream. They just get it.",
    author: "Marguerite D.",
    event: "30th Birthday",
  },
  {
    quote: "Our guests are still talking about the florals and the food. Worth every penny and then some.",
    author: "The Harrington Family",
    event: "Anniversary Gala",
  },
];

export default function App() {
  return (
    <>
      <GiftIntro />

      {/* ── Nav ── */}
      <nav className="site-nav on-dark" aria-label="Main navigation">
        <a href="#" className="nav-logo-wrap" aria-label="Merriment home">
          <CoupeIcon size={28} color="white" />
          <span className="nav-logo-text">Merriment</span>
        </a>
        <ul className="nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#work">Work</a></li>
          <li><a href="#about">About</a></li>
        </ul>
        <a href="#inquire" className="nav-inquire">Inquire</a>
      </nav>

      {/* ── Hero ── */}
      <section className="hero" aria-labelledby="hero-title">
        <img
          className="hero-img"
          src="/07F8C32B-91DD-4184-923C-C18A1D5B7133.jpg"
          alt="Champagne being poured into crystal flutes"
          loading="eager"
        />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-content">
          <h1 id="hero-title" className="hero-title">Merriment</h1>
          <p className="hero-sub">
            We plan celebrations that feel as good as they look — weddings, gatherings, and every joyful occasion in between.
          </p>
          <a href="#inquire" className="btn btn-light">Start Planning</a>
        </div>
      </section>

      {/* ── Statement ── */}
      <section className="statement-band" aria-labelledby="statement-heading">
        <h2 id="statement-heading">
          Every great event starts with someone who cares deeply about the details.
        </h2>
        <p>
          We're a full-service event planning studio rooted in thoughtful execution and genuine joy.
          Whether it's a wedding for 200 or a dinner for 12, we show up with the same intention.
        </p>
      </section>

      {/* ── Photo Grid A ── */}
      <div className="grid-a" aria-label="Portfolio preview" role="list">
        <div className="cell cell-1" role="listitem">
          <img src="/IMG_2244.jpg" alt="Bride and groom sharing a kiss under the veil" loading="lazy" />
        </div>
        <div className="cell cell-2" role="listitem">
          <img src="/3FE75576-0076-46A0-B545-1D429C8C5AEE.jpg" alt="Outdoor pallet table dinner in a garden" loading="lazy" />
        </div>
        <div className="cell cell-3" role="listitem">
          <img src="/IMG_6341.jpg" alt="Bridesmaids holding white and blue bouquets" loading="lazy" />
        </div>
        <div className="cell cell-4" role="listitem">
          <img src="/1D9A5427.jpg" alt="Sweetheart table with green napkins and florals" loading="lazy" />
        </div>
      </div>

      {/* ── Services ── */}
      <section className="services-band" id="services" aria-labelledby="services-heading">
        <h2 id="services-heading">What we do</h2>
        <div className="services-grid">
          {services.map((s) => (
            <article className="service-card" key={s.title}>
              <div className="service-img-wrap">
                <img src={s.img} alt={s.alt} loading="lazy" />
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Full-bleed break ── */}
      <div className="fullbleed">
        <img
          src="/IMG_7562.jpg"
          alt="Dessert table with artisan cupcakes"
          loading="lazy"
        />
        <p className="fullbleed-caption">
          Every detail,<br />intentionally placed.
        </p>
      </div>

      {/* ── Photo Grid B ── */}
      <div className="grid-b" id="work" aria-label="Portfolio gallery" role="list">
        <div className="cell cell-1" role="listitem">
          <img src="/IMG_7524-Edit.jpg" alt="Couple toasting with champagne" loading="lazy" />
        </div>
        <div className="cell cell-2" role="listitem">
          <img src="/4Y4A4751.jpg" alt="Better Together neon sign at reception" loading="lazy" />
        </div>
        <div className="cell cell-3" role="listitem">
          <img src="/IMG_3084.jpg" alt="Beatrix Potter themed children's table" loading="lazy" />
        </div>
        <div className="cell cell-4" role="listitem">
          <img src="/IMG_8494.jpg" alt="Two flower girls in white lace dresses" loading="lazy" />
        </div>
        <div className="cell cell-5" role="listitem">
          <img src="/IMG_7955.jpg" alt="Wedding guest book table with roses" loading="lazy" />
        </div>
        <div className="cell cell-6" role="listitem">
          <img src="/IMG_2880.jpg" alt="Baby shower activity station with pink ruffled table" loading="lazy" />
        </div>
      </div>

      {/* ── Testimonials ── */}
      <section className="testimonials-band" aria-labelledby="testimonials-heading">
        <h2 id="testimonials-heading">Kind words</h2>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div className="t-card" key={t.author}>
              <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="t-rule" aria-hidden="true" />
              <p className="t-attr">{t.author} — {t.event}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Inquire / Contact ── */}
      <section className="inquire-band" id="inquire" aria-labelledby="inquire-heading">
        {/* Tower illustration — watermark in background */}
        <img
          className="inquire-illustration"
          src="/IMG_3309.jpeg"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
        <div className="inquire-copy" id="about">
          <h2 id="inquire-heading">Let's plan something you'll never forget.</h2>
          <p>
            Tell us about your event and we'll be in touch within 1–2 business days.
            No detail is too small, no dream too large.
          </p>
        </div>
        <InlineContactForm />
      </section>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <a href="#" className="footer-logo-wrap" aria-label="Merriment home">
          <CoupeIcon size={22} color="#F0C87A" />
          <span className="footer-logo-text">Merriment</span>
        </a>
        <nav aria-label="Footer navigation">
          <ul className="footer-links">
            <li><a href="#services">Services</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="mailto:hello@merrimentevents.com">Contact</a></li>
          </ul>
        </nav>
        <p className="footer-copy">© {new Date().getFullYear()} Merriment</p>
      </footer>
    </>
  );
}
