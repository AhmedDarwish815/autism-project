import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function sendResetCodeEmail(to: string, code: string) {
  await transporter.sendMail({
    from: '"Autism App" <no-reply@autismapp.com>',
    to,
    subject: "Password Reset Code",
    text: `Your reset code is: ${code}`,
    html: `<h2>Your reset code is: <strong>${code}</strong></h2><p>Valid for 10 minutes.</p>`,
  });
}

export async function sendVerificationEmail(to: string, token: string) {
  const link = `${process.env.APP_URL}/auth/verify-email?token=${token}`;
  await transporter.sendMail({
    from: '"Autism App" <no-reply@autismapp.com>',
    to,
    subject: "Verify Your Email",
    text: `Click the link to verify your email: ${link}`,
    html: `
      <h2>Welcome to Autism App! 👋</h2>
      <p>Click the button below to verify your email address.</p>
      <a href="${link}" style="
        display:inline-block;
        padding:12px 24px;
        background:#4F46E5;
        color:white;
        text-decoration:none;
        border-radius:8px;
        font-size:16px;
      ">Verify Email</a>
      <p>This link expires in 24 hours.</p>
    `,
  });
}
