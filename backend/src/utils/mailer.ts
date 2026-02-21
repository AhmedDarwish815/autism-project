import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetCodeEmail(to: string, code: string) {
  await resend.emails.send({
    from: "Autism App <onboarding@resend.dev>",
    to,
    subject: "Password Reset Code",
    html: `<h2>Your reset code is: <strong>${code}</strong></h2><p>Valid for 10 minutes.</p>`,
  });
}

export async function sendVerificationEmail(to: string, token: string) {
  const link = `${process.env.APP_URL}/auth/verify-email?token=${token}`;
  await resend.emails.send({
    from: "Autism App <onboarding@resend.dev>",
    to,
    subject: "Verify Your Email",
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
