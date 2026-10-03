import { Resend } from 'resend';

// Initialize only if the API key exists
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || "Hr.ruchithaassociates@gmail.com";
// We must use a verified domain in production, but onboarding@resend.dev works for testing
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev"; 

export async function sendAdminNotification(subject: string, text: string, html: string) {
  if (!resend) {
    console.log("-----------------------------------------");
    console.log("📧 MOCK EMAIL NOTIFICATION (No RESEND_API_KEY found):");
    console.log(`To: ${NOTIFICATION_EMAIL}`);
    console.log(`Subject: ${subject}`);
    console.log(`Content:\n${text}`);
    console.log("-----------------------------------------");
    return { success: true, mock: true };
  }

  try {
    const data = await resend.emails.send({
      from: `Ruchitha System <${FROM_EMAIL}>`,
      to: NOTIFICATION_EMAIL,
      subject,
      text,
      html,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send notification email:", error);
    return { success: false, error };
  }
}
