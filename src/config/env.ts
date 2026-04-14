import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  FRONTEND_URL: z.url().default("http://localhost:8080"),
  ALLOWED_ORIGINS: z.string().optional(),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  DIRECT_URL: z.string().optional(),
  SUPABASE_URL: z.url("SUPABASE_URL must be a valid URL"),
  SUPABASE_ANON_KEY: z.string().min(1, "SUPABASE_ANON_KEY is required"),
  SUPABASE_SERVICE_ROLE_KEY: z
    .string()
    .min(1, "SUPABASE_SERVICE_ROLE_KEY is required"),
  SUPABASE_EMAIL_REDIRECT_URL: z.url().optional(),
  SUPABASE_GOOGLE_REDIRECT_URL: z.url().optional(),
  // Nodemailer / Gmail SMTP
  SMTP_HOST: z.string().default("smtp.gmail.com"),
  SMTP_PORT: z.coerce.number().int().default(465),
  SMTP_SECURE: z
    .string()
    .default("true")
    .transform((v) => v === "true"),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM_NAME: z.string().default("DebtFlow"),
  SMTP_FROM_EMAIL: z.string().optional(),
  // Seller name shown in reminder emails
  SELLER_NAME: z.string().default("CÔNG TY TNHH MWCONNECT VIỆT NAM"),
  // Automatic reminder scheduler
  REMINDER_ENABLED: z
    .string()
    .default("true")
    .transform((v) => v === "true"),
  // Cron expression — default: every day at 08:00
  REMINDER_CRON_SCHEDULE: z.string().default("0 8 * * *"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "Invalid environment variables",
    z.flattenError(parsed.error).fieldErrors,
  );
  throw new Error("Environment validation failed");
}

export const env = parsed.data;
