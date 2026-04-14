import nodemailer from "nodemailer";
import { env } from "../config/env";

// ── Transporter (lazy-created once) ───────────────────────────────────────────

let _transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (_transporter) return _transporter;

  if (!env.SMTP_USER || !env.SMTP_PASS) {
    throw new Error(
      "SMTP chưa được cấu hình. Vui lòng thêm SMTP_USER và SMTP_PASS vào file .env",
    );
  }

  _transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });

  return _transporter;
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SendMailOptions {
  to: string | string[];
  cc?: string | string[];
  subject: string;
  html: string;
  attachments?: {
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }[];
}

// ── Send ──────────────────────────────────────────────────────────────────────

export async function sendMail(opts: SendMailOptions): Promise<void> {
  const transporter = getTransporter();
  const fromEmail = env.SMTP_FROM_EMAIL ?? env.SMTP_USER;

  await transporter.sendMail({
    from: `"${env.SMTP_FROM_NAME}" <${fromEmail}>`,
    to: Array.isArray(opts.to) ? opts.to.join(", ") : opts.to,
    cc: opts.cc
      ? Array.isArray(opts.cc)
        ? opts.cc.join(", ")
        : opts.cc
      : undefined,
    subject: opts.subject,
    html: opts.html,
    attachments: opts.attachments,
  });
}

// ── Verify connection (used at startup or for health-check) ───────────────────

export async function verifySmtpConnection(): Promise<void> {
  const transporter = getTransporter();
  await transporter.verify();
}
