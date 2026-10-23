export function waitlistConfirmationTemplate(name: string) {
  return `
        <tr>
            <td style="font-family:'DM Sans', Arial, sans-serif;">
            <p style="margin: 0 0 12px 0; line-height: 24px">
            Dear ${name}, <br/><br/>
                Thank you for joining the Netmifi waitlist.<br/><br/>
                Netmifi is a learning, social, and commerce ecosystem. It starts with Nigerian undergraduates who need help with a specific course, topic, or exam. Lecturers, tutors, and students who know the work will publish in the same place: tutorials, classmates, tutors, and study materials for the course in front of you.<br/><br/>
                Joining is free. This email only confirms that you are on the waitlist. Netmifi is not open yet. When publishing opens, some material will stay free, and creators will be able to charge in naira. Share only work you have the right to distribute.<br/><br/>
                We will write when there is something to open.<br/><br/>
                Best regards,<br/>
                Onyekachi Nnaemena,<br/>
                Co-founder &amp; CEO, Netmifi
            </p>
        </td>
    </tr>`;
}

export function newsletterActivatedTemplate() {
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
