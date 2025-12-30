import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { firstName, lastName, email, subject, message } = req.body;

    if (!email || !message) {
        return res.status(400).json({ error: 'Email and message are required' });
    }

    const escapeHtml = (text) => {
        if (!text) return text;
        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);

    // Configure transporter
    // Priority: Environment variables -> Gmail (easiest for testing)
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: `"AlphaRevive Contact Form" <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_EMAIL || 'support@alpharevive.shop',
            replyTo: email,
            subject: `Contact Form: ${safeSubject || 'New Message'}`,
            text: `
Name: ${firstName} ${lastName}
Email: ${email}
Subject: ${subject}

Message:
${message}
            `,
            html: `
<h3>New Contact Form Submission</h3>
<p><strong>Name:</strong> ${safeFirstName} ${safeLastName}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<p><strong>Subject:</strong> ${safeSubject}</p>
<br/>
<p><strong>Message:</strong></p>
<p>${safeMessage.replace(/\n/g, '<br/>')}</p>
            `,
        });

        console.log('✅ Contact email sent successfully');
        return res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('❌ Email sending error:', error);
        return res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }
}
