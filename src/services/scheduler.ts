/**
 * Dynamic cron scheduler for the auto debt reminder.
 * Call startScheduler() once at boot, then rescheduleReminder() whenever
 * the admin changes the schedule via the settings API.
 */

import cron, { type ScheduledTask } from "node-cron";
import { runAutoReminder } from "./reminder.service";

let activeTask: ScheduledTask | null = null;

function runJob() {
  runAutoReminder().catch((err) =>
    console.error("[AutoReminder] Unhandled error:", err),
  );
}

export function startScheduler(cronExpr: string): void {
  if (activeTask) {
    activeTask.stop();
    activeTask = null;
  }

  if (!cron.validate(cronExpr)) {
    console.error(
      `[AutoReminder] Invalid cron schedule: "${cronExpr}" — scheduler NOT started`,
    );
    return;
  }

  activeTask = cron.schedule(cronExpr, runJob);
  console.log(`[AutoReminder] Scheduler started — cron: "${cronExpr}"`);
}

export function rescheduleReminder(cronExpr: string): void {
  console.log(`[AutoReminder] Rescheduling to: "${cronExpr}"`);
  startScheduler(cronExpr);
}

export function stopScheduler(): void {
  if (activeTask) {
    activeTask.stop();
    activeTask = null;
    console.log("[AutoReminder] Scheduler stopped");
  }
}
