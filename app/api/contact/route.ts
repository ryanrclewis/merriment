import { Resend } from "resend";

export const runtime = "edge";

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  eventDate?: string;
  message: string;
}

function validate(body: Partial<ContactPayload>): string | null {
  if (!body.name?.trim())    return "Name is required.";
  if (!body.email?.trim())   return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return "Please enter a valid email.";
  if (!body.message?.trim()) return "Message is required.";
  return null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: Request, { env }: { env: any }) {
  let body: Partial<ContactPayload>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const validationError = validate(body);
  if (validationError) {
    return Response.json({ error: validationError }, { status: 422 });
  }

  const apiKey = env?.RESEND_API_KEY;
  const toEmail = env?.CONTACT_EMAIL ?? "hello@merrimentevents.com";

  if (!apiKey) {
    console.error("RESEND_API_KEY is not set.");
    return Response.json({ error: "Email service not configured." }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  const { name, email, phone, eventType, eventDate, message } = body as ContactPayload;

  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; color: #1e1c1a;">
      <h2 style="font-weight: 400; font-size: 1.5rem; margin-bottom: 1rem;">
        New Inquiry — Merriment
      </h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem;">
        <tr><td style="padding: 6px 0; color: #9a9490; width: 120px;">Name</td><td>${name}</td></tr>
        <tr><td style="padding: 6px 0; color: #9a9490;">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
        ${phone ? `<tr><td style="padding: 6px 0; color: #9a9490;">Phone</td><td>${phone}</td></tr>` : ""}
        <tr><td style="padding: 6px 0; color: #9a9490;">Event type</td><td>${eventType || "Not specified"}</td></tr>
        ${eventDate ? `<tr><td style="padding: 6px 0; color: #9a9490;">Event date</td><td>${eventDate}</td></tr>` : ""}
      </table>
      <hr style="margin: 1.5rem 0; border: none; border-top: 1px solid #ede9e3;" />
      <p style="line-height: 1.7; white-space: pre-wrap;">${message}</p>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: "Merriment <onboarding@resend.dev>",
    to: [toEmail],
    replyTo: email,
    subject: `New inquiry from ${name}`,
    html,
  });

  if (error) {
    console.error("Resend error:", error);
    return Response.json({ error: "Failed to send. Please try again." }, { status: 500 });
  }

  return Response.json({ ok: true });
}
