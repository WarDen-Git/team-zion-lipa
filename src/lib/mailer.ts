import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const to = process.env.CONTACT_EMAIL || "hello@teamzionlipa.org";
const from = process.env.FROM_EMAIL || "onboarding@resend.dev";

/**
 * Sends an email if RESEND_API_KEY is set; otherwise logs to the server console
 * so local development works without any credentials.
 */
export async function sendNotification(subject: string, text: string) {
  if (!apiKey) {
    console.log(`\n[mailer] (no RESEND_API_KEY — logging instead)\nTo: ${to}\nSubject: ${subject}\n${text}\n`);
    return { delivered: false as const };
  }

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from,
    to,
    subject,
    text,
  });
  return { delivered: true as const };
}
