const nodemailer = require("nodemailer");

// Uses Gmail SMTP. Requires a Gmail *app password* (not your normal login
// password) - generate one at https://myaccount.google.com/apppasswords
// after enabling 2-Step Verification on the sender account.
//
// Configure in backend/.env:
//   GMAIL_USER=gmail1@gmail.com        <- the account that SENDS the mail
//   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
//   NOTIFY_EMAIL=gmail2@gmail.com      <- the account that RECEIVES the mail

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return null; // email not configured - caller should skip sending
  }

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  return transporter;
}

/**
 * Sends a "new message" notification email. Never throws - logs and
 * resolves so a mail failure never breaks the visitor-facing request.
 */
async function sendMessageNotification({ name, message, email }) {
  const t = getTransporter();
  const to = process.env.NOTIFY_EMAIL;

  if (!t || !to) {
    console.warn("[mailer] Skipping email notification - GMAIL_USER/GMAIL_APP_PASSWORD/NOTIFY_EMAIL not set in .env");
    return;
  }

  try {
    await t.sendMail({
      from: `"Portfolio Website" <${process.env.GMAIL_USER}>`,
      to,
      subject: `New message on Portfolio Website from ${name}`,
      text: `You received a new message on your portfolio site.\n\nFrom: ${name}${
        email ? ` (${email})` : ""
      }\n\nMessage:\n${message}`,
      html: `
        <div style="font-family:sans-serif;line-height:1.6">
          <h2>New message on your portfolio</h2>
          <p><strong>From:</strong> ${escapeHtml(name)}${email ? ` (${escapeHtml(email)})` : ""}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap;border-left:3px solid #7c5cff;padding-left:12px">${escapeHtml(
            message
          )}</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("[mailer] Failed to send notification email:", err.message);
  }
}

function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

module.exports = { sendMessageNotification };
