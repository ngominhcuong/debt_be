import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/api-error";

// ─── Input Types ──────────────────────────────────────────────────────────────

export interface CreateInvoiceSettingInput {
  year: number;
  symbol: string;
  templateCode?: string;
  startNumber?: number;
  isActive?: boolean;
}

export interface UpdateInvoiceSettingInput {
  symbol?: string;
  templateCode?: string;
  startNumber?: number;
  isActive?: boolean;
}

// ─── List ─────────────────────────────────────────────────────────────────────

export async function listInvoiceSettings(year?: number) {
  return prisma.invoiceSetting.findMany({
    where: year ? { year } : undefined,
    orderBy: [{ year: "desc" }, { symbol: "asc" }],
  });
}

// ─── Get one ──────────────────────────────────────────────────────────────────

export async function getInvoiceSettingById(id: string) {
  const setting = await prisma.invoiceSetting.findUnique({ where: { id } });
  if (!setting) throw new ApiError(404, "Cấu hình dải hóa đơn không tồn tại");
  return setting;
}

// ─── Create ───────────────────────────────────────────────────────────────────

export async function createInvoiceSetting(input: CreateInvoiceSettingInput) {
  const {
    year,
    symbol,
    templateCode = "1",
    startNumber = 1,
    isActive = false,
  } = input;

  // Validate symbol format: C/K + 2-digit year + T/D/L/M + 2 letters
  if (!isValidSymbol(symbol)) {
    throw new ApiError(
      400,
      "Ký hiệu hóa đơn không hợp lệ. Định dạng: [C|K][YY][T|D|L|M][AA-ZZ]",
    );
  }

  const existing = await prisma.invoiceSetting.findFirst({
    where: { year, symbol },
  });
  if (existing) {
    throw new ApiError(
      409,
      `Dải hóa đơn năm ${year} ký hiệu ${symbol} đã tồn tại`,
    );
  }

  // If setting as active, deactivate others in same year
  if (isActive) {
    await prisma.invoiceSetting.updateMany({
      where: { year, isActive: true },
      data: { isActive: false },
    });
  }

  return prisma.invoiceSetting.create({
    data: {
      year,
      symbol,
      templateCode,
      startNumber,
      currentNumber: 0,
      isActive,
    },
  });
}

// ─── Update ───────────────────────────────────────────────────────────────────

export async function updateInvoiceSetting(
  id: string,
  input: UpdateInvoiceSettingInput,
) {
  const existing = await prisma.invoiceSetting.findUnique({ where: { id } });
  if (!existing) throw new ApiError(404, "Cấu hình dải hóa đơn không tồn tại");

  // Symbol can only be changed before any invoice has been issued
  if (input.symbol !== undefined && input.symbol !== existing.symbol) {
    if (existing.currentNumber > 0) {
      throw new ApiError(
        400,
        "Không thể đổi ký hiệu sau khi dải số đã được sử dụng",
      );
    }
    if (!isValidSymbol(input.symbol)) {
      throw new ApiError(
        400,
        "Ký hiệu hóa đơn không hợp lệ. Định dạng: [C|K][YY][T|D|L|M][AA-ZZ]",
      );
    }
    // Check for duplicate (same year + new symbol)
    const dup = await prisma.invoiceSetting.findFirst({
      where: { year: existing.year, symbol: input.symbol, id: { not: id } },
    });
    if (dup)
      throw new ApiError(
        409,
        `Dải hóa đơn năm ${existing.year} ký hiệu ${input.symbol} đã tồn tại`,
      );
  }

  // If activating, deactivate others in same year
  if (input.isActive === true && !existing.isActive) {
    await prisma.invoiceSetting.updateMany({
      where: { year: existing.year, isActive: true, id: { not: id } },
      data: { isActive: false },
    });
  }

  return prisma.invoiceSetting.update({
    where: { id },
    data: {
      symbol: input.symbol,
      templateCode: input.templateCode,
      startNumber: input.startNumber,
      isActive: input.isActive,
    },
  });
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export async function deleteInvoiceSetting(id: string) {
  const existing = await prisma.invoiceSetting.findUnique({ where: { id } });
  if (!existing) throw new ApiError(404, "Cấu hình dải hóa đơn không tồn tại");
  if (existing.currentNumber > 0) {
    throw new ApiError(400, "Không thể xóa dải hóa đơn đã được sử dụng");
  }
  await prisma.invoiceSetting.delete({ where: { id } });
}

// ─── Auto-increment (used by issueInvoice) ────────────────────────────────────

export async function getAndIncrementNextInvoiceNumber(
  settingId: string,
): Promise<{
  fullInvoiceNumber: string;
  symbol: string;
  templateCode: string;
}> {
  return prisma.$transaction(async (tx) => {
    // Lock the row for update
    const setting = await tx.invoiceSetting.findUnique({
      where: { id: settingId },
    });
    if (!setting) throw new ApiError(404, "Cấu hình dải hóa đơn không tồn tại");
    if (!setting.isActive)
      throw new ApiError(400, "Dải hóa đơn không đang hoạt động");

    const MAX_NUMBER = 9_999_999;
    if (setting.currentNumber >= MAX_NUMBER) {
      throw new ApiError(400, "Hết dải số hóa đơn (đã đạt 9.999.999)");
    }

    const nextNumber = setting.currentNumber + 1;
    await tx.invoiceSetting.update({
      where: { id: settingId },
      data: { currentNumber: nextNumber },
    });

    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const seq = String(nextNumber).padStart(7, "0");

    return {
      fullInvoiceNumber: `HĐ/${yyyy}/${mm}/${seq}`,
      symbol: setting.symbol,
      templateCode: setting.templateCode,
    };
  });
}

// ─── Get active setting for current year ─────────────────────────────────────

export async function getActiveInvoiceSetting(year?: number) {
  const targetYear = year ?? new Date().getFullYear();
  const setting = await prisma.invoiceSetting.findFirst({
    where: { year: targetYear, isActive: true },
  });
  if (!setting) {
    throw new ApiError(
      404,
      `Chưa có dải hóa đơn đang hoạt động cho năm ${targetYear}. Vui lòng cấu hình trong Hệ thống → Dải hóa đơn.`,
    );
  }
  return setting;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isValidSymbol(symbol: string): boolean {
  // Format: [C|K] + 2-digit year + [T|D|L|M] + 2 uppercase letters
  // Example: C26TAA, K26DAB
  return /^[CK]\d{2}[TDLM][A-Z]{2}$/.test(symbol);
}
