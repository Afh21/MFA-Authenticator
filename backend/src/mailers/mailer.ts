import { config } from "../config/app.config";
import { resend } from "./resendClient";

type EmailParams = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  from?: string;
};

const mailer_sender =
  config.NODE_ENV === "development"
    ? "no-reply <onboarding@resend.dev>"
    : `no-reply <${config.MAILER_SENDER}>`;

export const sendEmail = async ({
  to,
  subject,
  text = "",
  html,
  from = mailer_sender,
}: EmailParams) =>
  await resend.emails.send({
    from,
    to: Array.isArray(to) ? to : [to],
    text,
    subject,
    html,
  });
