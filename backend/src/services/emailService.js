require('dotenv').config();
const nodemailer = require('nodemailer');
const { verificationCodeTemplate, emailVerifiedTemplate, instructorAcceptedTemplate, emailSubjects, registrationSuccessfulTemplate, passwordChangedTemplate, newsletterActivatedTemplate, waitlistConfirmationTemplate } = require('../constants/emailTemplates');
const currentYear = new Date().getFullYear().toString();

// Create a transporter using environment variables
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        ciphers: 'SSLv3', // Optional: Try this if you have issues
        rejectUnauthorized: false // Use with caution in production, only for testing
    }
});

// For the template type use the exempt the template but use the template name in snake case e.g verificationCodeTemplate as verification_code
function emailBody(title, templateType, other) {
    return `
      <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/js/all.min.js"></script>
        <title>${title}</title>
    </head>
    
    <body style="margin: 0; padding: 0; font-family:'DM Sans', Arial, sans-serif; background-color: #f4f4f4; color: #000;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
                <td align="center" style="padding: 0;">
                    <table role="presentation"
                        style="width: 600px; border-collapse: collapse; background-color: #ffffff; margin: 0 auto;" >
                        <!-- Header with Logo -->
                        <tr>
                            <td align="center" style="padding: 40px 0 30px 0;">
                         <a href="https://ibb.co/Jw7PmjrG"><img src="https://i.ibb.co/jPMFbk3Q/Photo-2025-03-25-09-11-57.jpg" alt="Photo-2025-03-25-09-11-57" border="0"></a>
                            </td>
                        </tr>
                        <!-- Main Content -->
                        
                        <tr>
                            <td style="padding: 36px 30px 42px 30px;">
                                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            ${templateType === 'verification_code' ? verificationCodeTemplate(other)
            : templateType === 'email_verified' ? emailVerifiedTemplate()
                : templateType === 'instructor_accepted' ? instructorAcceptedTemplate()
                    : templateType === 'waitlist_confirmation' ? waitlistConfirmationTemplate(other)
                        : templateType === 'password_changed' ? passwordChangedTemplate()
                            : templateType === ' newsletter_activated' ? newsletterActivatedTemplate()
                                : registrationSuccessfulTemplate()}
                                </table>
                            </td>
                        </tr>
                        
                        

                        <!-- Footer -->
                        <tr>
                            <td style="padding: 30px; background-color: hsl(0, 100%, 31%); color: #ffffff;">
                                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 0; width: 50%;" align="left">
                                            <p style="margin: 0; font-size: 14px; line-height: 20px;">&copy; <span id="year">${currentYear}</span> All rights reserved, Netmifi<br/><a href="http://www.example.com" style="color: #ffffff; fiil: #ffffff; text-decoration: underline;">www.netmifi.com</a></p>
                                        </td>
                                        <td style="padding: 0; width: 50%;" align="right">
                                            <table role="presentation" style="border-collapse: collapse;">
                                                <tr>
                                                    <td style="">
                                                        <a href="https://chat.whatsapp.com/IYZvFhKf6YQ44Jamwm8NBi" style="color: #ffffff; font-size: 24px;"><i class="fa-brands fa-whatsapp"></i></a>
                                                    </td>
                                                                                                       <td style="padding: 0 10px;">
                                                        <a href="https://www.linkedin.com/company/getnetmifi/" style="color: #ffffff; font-size: 24px;"><i class="fa-brands fa-linkedin"></i></a>
                                                    </td>
                                                                                                <td>
                                                        <a href="https://x.com/GetNetmifi_hq?t=Ikt-aAbTKvfX0FIS6ecE1A&s=09" style="color: #ffffff; font-size: 24px;"><i class="fa-brands fa-x-twitter"></i></a>
                                                    </td>
                                                </tr>
                                            </table>
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
    </html>
`}

async function sendEmail(to, templateType, other) {
    const subject = templateType === 'verification_code' ? emailSubjects.verification_code : templateType === 'waitlist_confirmation' ? emailSubjects.waitlist_confirmation : templateType === 'email_verified' ? emailSubjects.email_verified : templateType === 'instructor_accepted' ? emailSubjects.instructor_accepted : emailSubjects.registration_successful;
    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: to,
            subject: subject,
            html: emailBody(subject, templateType, other),
        });
        console.log('Message sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

module.exports = { sendEmail }
