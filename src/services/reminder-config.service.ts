/**
 * CRUD service for DebtReminderConfig (per-partner reminder schedule settings)
 * and global SystemSetting-based scheduler config.
 */
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/api-error";
import { env } from "../config/env";

export interface ReminderConfigPayload {
  scope?: "AR" | "AP" | "BOTH";
  enabled?: boolean;
  daysBeforeDue?: number;
  daysAfterDue?: number;
  recipientEmail?: string | null;
  ccEmails?: string[];
}

export interface GlobalReminderSettings {
  cronSchedule: string;
  reminderEnabled: boolean;
  reminderHour: number;
  reminderMinute: number;
  defaultDaysBeforeDue: number;
  defaultDaysAfterDue: number;
  description: string;
}

export interface UpdateGlobalReminderPayload {
  reminderHour?: number;
  reminderMinute?: number;
  defaultDaysBeforeDue?: number;
  defaultDaysAfterDue?: number;
  reminderEnabled?: boolean;
}

// ── Get config for a partner ──────────────────────────────────────────────────

export async function getPartnerReminderConfig(partnerId: string) {
  const partner = await prisma.partner.findUnique({
    where: { id: partnerId },
    select: { id: true },
  });
  if (!partner) throw new ApiError(404, "Đối tác không tồn tại");

  const configs = await prisma.debtReminderConfig.findMany({
    where: { partnerId },
    select: {
      id: true,
      scope: true,
      enabled: true,
      daysBeforeDue: true,
      daysAfterDue: true,
      recipientEmail: true,
      ccEmails: true,
      lastSentAt: true,
      updatedAt: true,
    },
    orderBy: { scope: "asc" },
  });

  return configs;
}

// ── Upsert config for a partner ───────────────────────────────────────────────

export async function upsertPartnerReminderConfig(
  partnerId: string,
  payload: ReminderConfigPayload,
) {
  const partner = await prisma.partner.findUnique({
    where: { id: partnerId },
    select: { id: true },
  });
  if (!partner) throw new ApiError(404, "Đối tác không tồn tại");

  const scope = payload.scope ?? "BOTH";

  const config = await prisma.debtReminderConfig.upsert({
    where: { partnerId_scope: { partnerId, scope } },
    create: {
      partnerId,
      scope,
      enabled: payload.enabled ?? true,
      daysBeforeDue: payload.daysBeforeDue ?? 2,
      daysAfterDue: payload.daysAfterDue ?? 1,
      recipientEmail: payload.recipientEmail ?? null,
      ccEmails: payload.ccEmails ?? [],
    },
    update: {
      ...(payload.enabled !== undefined && { enabled: payload.enabled }),
      ...(payload.daysBeforeDue !== undefined && {
        daysBeforeDue: payload.daysBeforeDue,
      }),
      ...(payload.daysAfterDue !== undefined && {
        daysAfterDue: payload.daysAfterDue,
      }),
      ...(payload.recipientEmail !== undefined && {
        recipientEmail: payload.recipientEmail,
      }),
      ...(payload.ccEmails !== undefined && { ccEmails: payload.ccEmails }),
    },
    select: {
      id: true,
      scope: true,
      enabled: true,
      daysBeforeDue: true,
      daysAfterDue: true,
      recipientEmail: true,
      ccEmails: true,
      lastSentAt: true,
      updatedAt: true,
    },
  });

  return config;
}

// ── Delete config for a partner ───────────────────────────────────────────────

export async function deletePartnerReminderConfig(
  partnerId: string,
  scope: string,
) {
  await prisma.debtReminderConfig.deleteMany({
    where: { partnerId, scope: scope as "AR" | "AP" | "BOTH" },
  });
}

// ── Get recent reminder logs ───────────────────────────────────────────────────

export async function getRecentReminderLogs(limit = 50) {
  const logs = await prisma.debtReminderLog.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      scope: true,
      recipientEmail: true,
      subject: true,
      status: true,
      errorMessage: true,
      sentAt: true,
      createdAt: true,
      partner: {
        select: { id: true, code: true, name: true },
      },
    },
  });
  return logs.map((log) => ({
    ...log,
    id: log.id.toString(),
    sentAt: log.sentAt?.toISOString() ?? null,
    createdAt: log.createdAt.toISOString(),
  }));
}

// ── Key constants for SystemSetting ─────────────────────────────────────────

const SK = {
  ENABLED: "reminder.enabled",
  HOUR: "reminder.hour",
  MINUTE: "reminder.minute",
  DAYS_BEFORE_DUE: "reminder.defaultDaysBeforeDue",
  DAYS_AFTER_DUE: "reminder.defaultDaysAfterDue",
} as const;

async function getSetting(key: string, fallback: string): Promise<string> {
  const row = await prisma.systemSetting.findUnique({ where: { key } });
  return row?.value ?? fallback;
}

async function setSetting(key: string, value: string): Promise<void> {
  await prisma.systemSetting.upsert({
    where: { key },
    create: { key, value },
    update: { value },
  });
}

// ── Global reminder settings (DB-backed, env fallback) ───────────────────────

export async function getGlobalReminderSettings(): Promise<GlobalReminderSettings> {
  const [enabledStr, hourStr, minuteStr, daysBeforeStr, daysAfterStr] =
    await Promise.all([
      getSetting(SK.ENABLED, String(env.REMINDER_ENABLED)),
      getSetting(SK.HOUR, "8"),
      getSetting(SK.MINUTE, "0"),
      getSetting(SK.DAYS_BEFORE_DUE, "2"),
      getSetting(SK.DAYS_AFTER_DUE, "1"),
    ]);

  const reminderEnabled = enabledStr === "true";
  const reminderHour = Number.parseInt(hourStr, 10);
  const reminderMinute = Number.parseInt(minuteStr, 10);
  const defaultDaysBeforeDue = Number.parseInt(daysBeforeStr, 10);
  const defaultDaysAfterDue = Number.parseInt(daysAfterStr, 10);
  const cronSchedule = `${reminderMinute} ${reminderHour} * * *`;
  const description = `Mỗi ngày lúc ${String(reminderHour).padStart(2, "0")}:${String(reminderMinute).padStart(2, "0")}`;

  return {
    cronSchedule,
    reminderEnabled,
    reminderHour,
    reminderMinute,
    defaultDaysBeforeDue,
    defaultDaysAfterDue,
    description,
  };
}

export async function updateGlobalReminderSettings(
  payload: UpdateGlobalReminderPayload,
): Promise<GlobalReminderSettings> {
  const ops: Promise<void>[] = [];

  if (payload.reminderEnabled !== undefined)
    ops.push(setSetting(SK.ENABLED, String(payload.reminderEnabled)));
  if (payload.reminderHour !== undefined)
    ops.push(setSetting(SK.HOUR, String(payload.reminderHour)));
  if (payload.reminderMinute !== undefined)
    ops.push(setSetting(SK.MINUTE, String(payload.reminderMinute)));
  if (payload.defaultDaysBeforeDue !== undefined)
    ops.push(
      setSetting(SK.DAYS_BEFORE_DUE, String(payload.defaultDaysBeforeDue)),
    );
  if (payload.defaultDaysAfterDue !== undefined)
    ops.push(
      setSetting(SK.DAYS_AFTER_DUE, String(payload.defaultDaysAfterDue)),
    );

  await Promise.all(ops);
  return getGlobalReminderSettings();
}
