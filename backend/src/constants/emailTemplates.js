const emailSubjects = {
    verification_code: "Verification Code",
    email_verified: "Email Verification",
    registration_successful: "Welcome To Netmifi!",
    waitlist_confirmation: "Welcome to Netmifi!",
    instructor_accepted: "Welcome To Netmifi Legion",
}

function verificationCodeTemplate(code) {
    return `
        <tr>
            <td>
                <h1 style="font-size: 24px; margin: 0 0 20px 0; color: hsl(0, 100%, 31%);">
                    Hello,</h1>
                <p style="margin: 0 0 12px 0; line-height: 24px;">Here is your verification code, please do not share to anyone:</p>
                <p
                    style="margin: 0 0 12px 0; line-height: 24px; font-size: 25px; font-weight: bold; color: hsl(0, 100%, 31%); text-align: center; border: 2px solid hsl(0, 100%, 31%); padding: 10px;">
                    ${code}
                </p>
                <p style="margin: 0 0 12px 0; line-height: 24px;">This code will expire in 10
                    minutes. If you didn't request this code, please ignore this email or
                    contact support if you have concerns.</p>
                <p style="margin: 0; line-height: 24px;">Thank you for using our service!</p>
            </td>
        </tr>
`}

function waitlistConfirmationTemplate(name) {
    return `
            <td class=" font-family:'DM Sans', Arial">
            <p style="margin: 0 0 12px 0; line-height: 24px">
            Dear ${name}, <br/><br/>
                A big thank you for joining our waitlist! We're thrilled to have you on board. <br/><br/>
                Welcome to Netmifi, the ultimate addictive e-learning and social commerce platform! Here's what you can expect when we launch:
<br/>
                - Learn from experts: Buy courses and learn from top instructors <br/>
                - Monetize your knowledge: Publish and sell your own courses, ebooks, comics, and video content <br/>
                - Collaborate with creators: Connect with like-minded individuals and grow your network <br/>
                - Get certified: Earn certificates upon completing courses<br/>
                - Launch your career: Get paired with internship opportunities in tech and media<br/>
<br/><br/>
                We're committed to creating a platform that's engaging, rewarding, and fun! Stay tuned for updates, and get ready to experience the future of e-learning. <br/>

                Thank you again for joining us on this exciting journey!
<br/><br/>
                Best regards,<br/>
                Onyekachi Nnaemena,<br/>
                Co-founder & CEO, Netmifi
            </p>
        </td>
    </tr>`;
}

function emailVerifiedTemplate() {
    return `
    <tr>
        <td>
            <h1 style="font-size: 24px; margin: 0 0 20px 0; color: hsl(0, 100%, 31%);">
                Hello,</h1>
            <p style="margin: 0 0 12px 0; line-height: 24px;">Your email was flagged for
                verification and has been verified.</p>

            <p style="margin: 0 0 12px 0; line-height: 24px;"></p>
            <p style="margin: 0; line-height: 24px;">Thank you for choosing our service!</p>
        </td>
    </tr>`;
}
function registrationSuccessfulTemplate() {
    return `
    <tr>
        <td>
            <h1 style="font-size: 24px; margin: 0 0 20px 0; color: hsl(0, 100%, 31%);">
                Welcome To Netmifi,</h1>
            <p style="margin: 0 0 12px 0; line-height: 24px;">Your email was registered on
                our platform. We are happy to see you being part of Netmifi, we hope to see you become better in your chosen career.</p>

            <p style="margin: 0 0 12px 0; line-height: 24px;"></p>
            <p style="margin: 0; line-height: 24px;">Thank you for choosing our service!</p>
        </td>
    </tr>`
}
function passwordChangedTemplate() {
    return `
    <tr>
        <td>
            <h1 style="font-size: 24px; margin: 0 0 20px 0; color: hsl(0, 100%, 31%);">
                Password Change Successful,
            </h1>
            <p style="margin: 0 0 12px 0; line-height: 24px;">Your password was changed successfully.</p>
                <p style="margin: 0 0 12px 0; line-height: 24px;">If you make this request, please
                 contact support if you have concerns.
                </p>
            <p style="margin: 0 0 12px 0; line-height: 24px;"></p>
            <p style="margin: 0; line-height: 24px;">Thank you for choosing our service!</p>
        </td>
    </tr>`
}

function instructorAcceptedTemplate() {
    return `
        <tr>
            <td>
                <h1 style="font-size: 24px; margin: 0 0 20px 0; color: hsl(0, 100%, 31%);">
                    Hello,</h1>
                <p style="margin: 0 0 12px 0; line-height: 24px;">Your request to be an
                    instructor has been accepted. You can now upload your courses at a go.</p>

                <p style="margin: 0 0 12px 0; line-height: 24px;"></p>
                <p style="margin: 0; line-height: 24px;">Thanks for choosing our Netmifi!</p>
            </td>
        </tr>`;
}

function newsletterActivatedTemplate() {
    return `
        <tr>
            <td>
                <h1 style="font-size: 24px; margin: 0 0 20px 0; color: hsl(0, 100%, 31%);">
                    Hello,</h1>
                <p style="margin: 0 0 12px 0; line-height: 24px;">Your have subscribed to our newsletter. You will receive firsthand information and updates on our platform.</p>

                <p style="margin: 0 0 12px 0; line-height: 24px;"></p>
                <p style="margin: 0; line-height: 24px;">Thanks for choosing our Netmifi!</p>
            </td>
        </tr>`;
}

module.exports = {
    emailSubjects,
    verificationCodeTemplate,
    emailVerifiedTemplate,
    waitlistConfirmationTemplate,
    registrationSuccessfulTemplate,
    passwordChangedTemplate,
    instructorAcceptedTemplate,
    newsletterActivatedTemplate
}