import type { Request, Response, NextFunction } from "express";
import { runAutoReminder } from "../services/reminder.service";
import { rescheduleReminder } from "../services/scheduler";
import {
  getPartnerReminderConfig,
  upsertPartnerReminderConfig,
  deletePartnerReminderConfig,
  getRecentReminderLogs,
  getGlobalReminderSettings,
  updateGlobalReminderSettings,
  type ReminderConfigPayload,
  type UpdateGlobalReminderPayload,
} from "../services/reminder-config.service";
import { ApiError } from "../utils/api-error";

// ── GET /api/reminder-configs/settings ───────────────────────────────────────
export async function getSettingsHandler(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const settings = await getGlobalReminderSettings();
    res.json({ success: true, data: settings });
  } catch (err) {
    next(err);
  }
}

// ── PUT /api/reminder-configs/settings ───────────────────────────────────────
export async function updateSettingsHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const body = req.body as UpdateGlobalReminderPayload;

    // Validate
    if (body.reminderHour !== undefined) {
      const h = Number(body.reminderHour);
      if (!Number.isInteger(h) || h < 0 || h > 23)
        throw new ApiError(400, "reminderHour phải từ 0 đến 23");
      body.reminderHour = h;
    }
    if (body.reminderMinute !== undefined) {
      const m = Number(body.reminderMinute);
      if (!Number.isInteger(m) || m < 0 || m > 59)
        throw new ApiError(400, "reminderMinute phải từ 0 đến 59");
      body.reminderMinute = m;
    }
    if (body.defaultDaysBeforeDue !== undefined) {
      const v = Number(body.defaultDaysBeforeDue);
      if (!Number.isInteger(v) || v < 0 || v > 365)
        throw new ApiError(400, "defaultDaysBeforeDue phải từ 0 đến 365");
      body.defaultDaysBeforeDue = v;
    }
    if (body.defaultDaysAfterDue !== undefined) {
      const v = Number(body.defaultDaysAfterDue);
      if (!Number.isInteger(v) || v < 0 || v > 365)
        throw new ApiError(400, "defaultDaysAfterDue phải từ 0 đến 365");
      body.defaultDaysAfterDue = v;
    }

    const updated = await updateGlobalReminderSettings(body);

    // Dynamically reschedule the cron job if time changed
    if (
      updated.reminderEnabled &&
      (body.reminderHour !== undefined ||
        body.reminderMinute !== undefined ||
        body.reminderEnabled !== undefined)
    ) {
      rescheduleReminder(updated.cronSchedule);
    }

    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

// ── GET /api/reminder-configs/logs ───────────────────────────────────────────
export async function getLogsHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const limit = req.query.limit
      ? parseInt(req.query.limit as string, 10)
      : 50;
    const logs = await getRecentReminderLogs(limit);
    res.json({ success: true, data: logs });
  } catch (err) {
    next(err);
  }
}

// ── POST /api/reminder-configs/run-now ───────────────────────────────────────
export async function runNowHandler(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const result = await runAutoReminder(true); // forceRun — bypass "already sent today" filter
    res.json({
      success: true,
      data: result,
      message: `Hoàn tất: đã gửi ${result.sent}, bỏ qua ${result.skipped}, lỗi ${result.errors}`,
    });
  } catch (err) {
    next(err);
  }
}

// ── GET /api/reminder-configs/:partnerId ─────────────────────────────────────
export async function getConfigHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const partnerId = req.params["partnerId"] as string;
    if (!partnerId) throw new ApiError(400, "partnerId is required");
    const configs = await getPartnerReminderConfig(partnerId);
    res.json({ success: true, data: configs });
  } catch (err) {
    next(err);
  }
}

// ── PUT /api/reminder-configs/:partnerId ─────────────────────────────────────
export async function upsertConfigHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const partnerId = req.params["partnerId"] as string;
    if (!partnerId) throw new ApiError(400, "partnerId is required");

    const body = req.body as ReminderConfigPayload;

    // Validate
    if (body.daysBeforeDue !== undefined) {
      const v = Number(body.daysBeforeDue);
      if (!Number.isInteger(v) || v < 0 || v > 365)
        throw new ApiError(400, "daysBeforeDue phải là số nguyên 0–365");
      body.daysBeforeDue = v;
    }
    if (body.daysAfterDue !== undefined) {
      const v = Number(body.daysAfterDue);
      if (!Number.isInteger(v) || v < 0 || v > 365)
        throw new ApiError(400, "daysAfterDue phải là số nguyên 0–365");
      body.daysAfterDue = v;
    }
    if (
      body.scope !== undefined &&
      !["AR", "AP", "BOTH"].includes(body.scope)
    ) {
      throw new ApiError(400, "scope phải là AR, AP, hoặc BOTH");
    }

    const config = await upsertPartnerReminderConfig(partnerId, body);
    res.json({ success: true, data: config });
  } catch (err) {
    next(err);
  }
}

// ── DELETE /api/reminder-configs/:partnerId/:scope ───────────────────────────
export async function deleteConfigHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const partnerId = req.params["partnerId"] as string;
    const scope = req.params["scope"] as string;
    if (!partnerId || !scope)
      throw new ApiError(400, "partnerId and scope are required");
    await deletePartnerReminderConfig(partnerId, scope);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}
