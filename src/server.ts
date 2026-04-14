import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { authRouter } from "./routes/auth.routes";
import { masterRouter } from "./routes/master.routes";
import { salesInvoiceRouter } from "./routes/sales-invoice.routes";
import { invoiceSettingRouter } from "./routes/invoice-setting.routes";
import { voucherAuditLogRouter } from "./routes/voucher-audit-log.routes";
import { arDebtRouter } from "./routes/ar-debt.routes";
import { receiptRouter } from "./routes/receipt.routes";
import { purchaseInvoiceRouter } from "./routes/purchase-invoice.routes";
import { apDebtRouter } from "./routes/ap-debt.routes";
import { reminderConfigRouter } from "./routes/reminder-config.routes";
import { paymentRouter } from "./routes/payment.routes";
import { reportRouter } from "./routes/report.routes";
import { periodRouter } from "./routes/period.routes";
import { getGlobalReminderSettings } from "./services/reminder-config.service";
import { startScheduler } from "./services/scheduler";
import { errorHandler, notFoundHandler } from "./middlewares/error-handler";

const app = express();

function normalizeOrigin(value: string): string {
  return value.trim().replaceAll(/\/+$/g, "");
}

function wildcardToRegExp(pattern: string): RegExp {
  const escaped = pattern.replaceAll(/[.+?^${}()|[\]\\]/g, String.raw`\$&`);
  const withWildcard = escaped.replaceAll(/\*/g, ".*");
  return new RegExp(`^${withWildcard}$`);
}

const configuredOrigins = env.ALLOWED_ORIGINS
  ? env.ALLOWED_ORIGINS.split(",")
  : [env.FRONTEND_URL];

const allowedOriginPatterns = configuredOrigins
  .map((origin) => normalizeOrigin(origin))
  .filter(Boolean)
  .map((origin) => wildcardToRegExp(origin));

app.use(
  cors({
    origin: (origin, callback) => {
      // Requests without Origin header (health checks, server-to-server)
      // should not be blocked by CORS.
      if (!origin) {
        callback(null, true);
        return;
      }

      const normalizedOrigin = normalizeOrigin(origin);
      const isAllowed = allowedOriginPatterns.some((pattern) =>
        pattern.test(normalizedOrigin),
      );

      callback(null, isAllowed);
    },
    credentials: true,
  }),
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/master", masterRouter);
app.use("/api/sales-invoices", salesInvoiceRouter);
app.use("/api/invoice-settings", invoiceSettingRouter);
app.use("/api/voucher-audit-logs", voucherAuditLogRouter);
app.use("/api/ar-debts", arDebtRouter);
app.use("/api/receipts", receiptRouter);
app.use("/api/purchase-invoices", purchaseInvoiceRouter);
app.use("/api/ap-debts", apDebtRouter);
app.use("/api/reminder-configs", reminderConfigRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/reports", reportRouter);
app.use("/api/periods", periodRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server is listening on port ${env.PORT}`);

  // ── Start automatic debt reminder scheduler ────────────────────────────
  getGlobalReminderSettings()
    .then((settings) => {
      if (settings.reminderEnabled) {
        startScheduler(settings.cronSchedule);
      } else {
        console.log(
          "[AutoReminder] Scheduler disabled (reminder.enabled=false)",
        );
      }
    })
    .catch((err) =>
      console.error("[AutoReminder] Failed to load schedule from DB:", err),
    );
});
