import { Resend } from "resend";

interface Env {
  RESEND_API_KEY: string;
  CONTACT_EMAIL: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  try {
    const body = await request.json() as Record<string, string>;
    const { name, email, phone, eventType, eventDate, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required." }),
        { status: 400, headers }
      );
    }

    const resend = new Resend(env.RESEND_API_KEY);
    const toEmail = env.CONTACT_EMAIL || "hello@merrimentevents.com";

    await resend.emails.send({
      from: "Merriment Website <onboarding@resend.dev>",
      to: [toEmail],
      replyTo: email,
      subject: `New Inquiry from ${name}${eventType ? ` — ${eventType}` : ""}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1E1C1A;">
          <h2 style="font-weight: 400; border-bottom: 1px solid #EDE9E3; padding-bottom: 12px;">
            New Inquiry via Merriment
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
            <tr><td style="padding: 8px 0; color: #9A9490; width: 140px;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #9A9490;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #1E1C1A;">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #9A9490;">Phone</td><td style="padding: 8px 0;">${phone}</td></tr>` : ""}
            ${eventType ? `<tr><td style="padding: 8px 0; color: #9A9490;">Event Type</td><td style="padding: 8px 0;">${eventType}</td></tr>` : ""}
            ${eventDate ? `<tr><td style="padding: 8px 0; color: #9A9490;">Event Date</td><td style="padding: 8px 0;">${eventDate}</td></tr>` : ""}
          </table>
          <div style="background: #F7F4F0; padding: 20px; border-radius: 4px;">
            <p style="margin: 0; line-height: 1.7; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  } catch (err) {
    console.error("Contact form error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to send message. Please try again." }),
      { status: 500, headers }
    );
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
