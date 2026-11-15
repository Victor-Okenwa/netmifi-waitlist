import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.error("❌ RESEND_API_KEY is missing in .env");
  process.exit(1);
}

const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
const fromName = process.env.RESEND_FROM_NAME ?? "Netmifi";
const from = fromEmail.includes("<") ? fromEmail : `${fromName} <${fromEmail}>`;

// Default to Resend's official test address if no email argument is passed
const recipient = process.argv[2] ?? "delivered@resend.dev";

const resend = new Resend(apiKey);

console.log(`📧 Sending test email via Resend...`);
console.log(`   From: ${from}`);
console.log(`   To:   ${recipient}`);

const { data, error } = await resend.emails.send({
  from,
  to: recipient,
  subject: "Welcome to Netmifi! (Local Test)",
  html: `<div style="font-family: sans-serif; padding: 24px;">
    <h2>Netmifi Resend Test</h2>
    <p>Your Resend configuration is working properly.</p>
    <p><strong>Sender:</strong> ${from}</p>
    <p><strong>Environment:</strong> ${process.env.NODE_ENV ?? "development"}</p>
  </div>`,
});

if (error) {
  console.error("❌ Failed to send email:", error);
  process.exit(1);
}

console.log("✅ Email sent successfully! ID:", data?.id);

