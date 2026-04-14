import { Prisma } from "../../src/generated/prisma/index";
import { prisma } from "../lib/prisma";

export interface ListVoucherAuditLogsInput {
  q?: string;
  action?: string;
  entityType?: string;
  entityId?: string;
  userId?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

export async function listVoucherAuditLogs(input: ListVoucherAuditLogsInput) {
  const page = Math.max(1, input.page ?? 1);
  const limit = Math.min(200, Math.max(1, input.limit ?? 50));
  const skip = (page - 1) * limit;

  const where: Prisma.VoucherAuditLogWhereInput = {};

  if (input.q) {
    where.OR = [
      { entityRef: { contains: input.q, mode: "insensitive" } },
      { userEmail: { contains: input.q, mode: "insensitive" } },
      { userName: { contains: input.q, mode: "insensitive" } },
      { detail: { contains: input.q, mode: "insensitive" } },
    ];
  }

  if (input.action) where.action = input.action;
  if (input.entityType) where.entityType = input.entityType;
  if (input.entityId) where.entityId = input.entityId;
  if (input.userId) where.userId = input.userId;

  if (input.dateFrom || input.dateTo) {
    where.createdAt = {};
    if (input.dateFrom) where.createdAt.gte = new Date(input.dateFrom);
    if (input.dateTo) {
      const to = new Date(input.dateTo);
      to.setDate(to.getDate() + 1);
      where.createdAt.lt = to;
    }
  }

  const [total, rows] = await Promise.all([
    prisma.voucherAuditLog.count({ where }),
    prisma.voucherAuditLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      select: {
        id: true,
        action: true,
        entityType: true,
        entityId: true,
        entityRef: true,
        detail: true,
        createdAt: true,
        userEmail: true,
        userName: true,
        userId: true,
      },
    }),
  ]);

  // BigInt id must be serialized as string for JSON
  const serialized = rows.map((r) => ({ ...r, id: r.id.toString() }));

  return { total, page, limit, rows: serialized };
}

// ── Shared helper used by multiple services ───────────────────────────────────

export async function writeVoucherLog(params: {
  userId: string;
  userEmail: string;
  action: string;
  entityId: string;
  entityRef: string;
  detail: string;
}): Promise<void> {
  const profile = await prisma.userProfile.findUnique({
    where: { id: params.userId },
    select: { fullName: true },
  });
  await prisma.voucherAuditLog.create({
    data: {
      userId: params.userId,
      userEmail: params.userEmail,
      userName: profile?.fullName ?? params.userEmail,
      action: params.action,
      entityType: "SALES_INVOICE",
      entityId: params.entityId,
      entityRef: params.entityRef,
      detail: params.detail,
    },
  });
}
