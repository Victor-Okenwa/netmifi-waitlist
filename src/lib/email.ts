import { Resend } from "resend";
import {
  newsletterActivatedTemplate,
  waitlistConfirmationTemplate,
} from "@/lib/email-templates";

export type EmailTemplate = "waitlist_confirmation" | "newsletter_activated";

const emailSubjects: Record<EmailTemplate, string> = {
  waitlist_confirmation: "Welcome to Netmifi!",
  newsletter_activated: "Welcome To Netmifi!",
};

const currentYear = new Date().getFullYear().toString();

export function emailBody(
  title: string,
  templateType: EmailTemplate,
  other?: string
) {
  const inner =
    templateType === "waitlist_confirmation"
      ? waitlistConfirmationTemplate(other ?? "")
      : newsletterActivatedTemplate();

  return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
        </head>
        
        <body style="margin: 0; padding: 0; font-family: Poppins, verdana, sans-serif; background-color: #f4f4f4; color: black;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td align="center" style="padding: 0;">
                        <table role="presentation"
                            style="width: 600px; border-collapse: collapse; background-color: #ffffff; margin: 0 auto;" >
                            <tr>
                                <td style="padding: 36px 30px 42px 30px;">
                                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                ${inner}
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 30px; background-color: #f5f5f5; border-radius: 35px 35px 0 0">
                                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                        <tr>
                                            <td style="padding: 0; width: 50%;" align="left">
                                                <p style="margin: 0; font-size: 14px; line-height: 20px;">&copy; <span>${currentYear}</span> All rights reserved, Netmifi<br/><br/><a href="https://netmifi-web.web.app" style="display: flex; align-items: center; font-size: 25px; color: #000; text-decoration: none;"><img src="https://i.ibb.co/4wW1vbbw/netmifi-logo.jpg" alt="netmifi-logo" border="0" height="40px">Netmifi</a></p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
    </html>`;
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY environment variable is not set");
  }
  return new Resend(apiKey);
}

function getFromAddress() {
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const fromName = process.env.RESEND_FROM_NAME ?? "Netmifi";

  if (fromEmail.includes("<")) {
    return fromEmail;
  }

  return `${fromName} <${fromEmail}>`;
}

export async function sendEmail(
  to: string,
  templateType: EmailTemplate,
  other?: string
) {
  const resend = getResendClient();
  const subject = emailSubjects[templateType];

  const { data, error } = await resend.emails.send({
    from: getFromAddress(),
    to,
    subject,
    html: emailBody(subject, templateType, other),
  });

  if (error) {
    throw new Error(`Resend error (${error.name}): ${error.message}`);
  }

  console.log("Message sent: %s", data?.id);
  return data;
}
