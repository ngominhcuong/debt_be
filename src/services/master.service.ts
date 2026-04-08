import {
  AccountType,
  ItemType,
  NormalBalance,
  PartnerType,
  Prisma,
} from "../../src/generated/prisma/index";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/api-error";

interface ListPartnersInput {
  q?: string;
  partnerType?: PartnerType;
  isActive?: boolean;
}

interface ListItemsInput {
  q?: string;
  itemType?: ItemType;
  isActive?: boolean;
}

interface ListAccountsInput {
  q?: string;
  accountType?: AccountType;
  isActive?: boolean;
}

interface UpsertPartnerInput {
  code?: string;
  name: string;
  partnerType: PartnerType;
  taxCode?: string;
  phone?: string;
  email?: string;
  address?: string;
  paymentTermDays?: number;
  creditLimit?: number;
  isActive?: boolean;
  debtReminderOn?: boolean;
  reminderEmail?: string;
  reminderCcEmails?: string[];
}

interface UpsertItemInput {
  sku?: string;
  name: string;
  itemType: ItemType;
  unit: string;
  salePrice?: number;
  purchasePrice?: number;
  vatRate?: number;
  revenueAccountId?: string | null;
  cogsAccountId?: string | null;
  inventoryAccountId?: string | null;
  isTrackedInventory?: boolean;
  isActive?: boolean;
  description?: string;
}

interface UpsertAccountInput {
  code: string;
  name: string;
  accountType: AccountType;
  normalBalance: NormalBalance;
  parentId?: string | null;
  isPosting?: boolean;
  allowManualEntry?: boolean;
  isActive?: boolean;
  sortOrder?: number;
  description?: string;
}

const CORE_DEBT_ACCOUNT_RULES: Record<
  string,
  {
    accountType: AccountType;
    normalBalance: NormalBalance;
    allowManualEntry: boolean;
    sortOrder: number;
  }
> = {
  "111": {
    accountType: AccountType.ASSET,
    normalBalance: NormalBalance.DEBIT,
    allowManualEntry: true,
    sortOrder: 111,
  },
  "112": {
    accountType: AccountType.ASSET,
    normalBalance: NormalBalance.DEBIT,
    allowManualEntry: true,
    sortOrder: 112,
  },
  "131": {
    accountType: AccountType.ASSET,
    normalBalance: NormalBalance.DEBIT,
    allowManualEntry: true,
    sortOrder: 131,
  },
  "1331": {
    accountType: AccountType.ASSET,
    normalBalance: NormalBalance.DEBIT,
    allowManualEntry: false,
    sortOrder: 1331,
  },
  "1388": {
    accountType: AccountType.ASSET,
    normalBalance: NormalBalance.DEBIT,
    allowManualEntry: true,
    sortOrder: 1388,
  },
  "152": {
    accountType: AccountType.ASSET,
    normalBalance: NormalBalance.DEBIT,
    allowManualEntry: true,
    sortOrder: 152,
  },
  "156": {
    accountType: AccountType.ASSET,
    normalBalance: NormalBalance.DEBIT,
    allowManualEntry: true,
    sortOrder: 156,
  },
  "331": {
    accountType: AccountType.LIABILITY,
    normalBalance: NormalBalance.CREDIT,
    allowManualEntry: true,
    sortOrder: 331,
  },
  "3331": {
    accountType: AccountType.LIABILITY,
    normalBalance: NormalBalance.CREDIT,
    allowManualEntry: false,
    sortOrder: 3331,
  },
  "3388": {
    accountType: AccountType.LIABILITY,
    normalBalance: NormalBalance.CREDIT,
    allowManualEntry: true,
    sortOrder: 3388,
  },
  "511": {
    accountType: AccountType.REVENUE,
    normalBalance: NormalBalance.CREDIT,
    allowManualEntry: true,
    sortOrder: 511,
  },
  "632": {
    accountType: AccountType.EXPENSE,
    normalBalance: NormalBalance.DEBIT,
    allowManualEntry: true,
    sortOrder: 632,
  },
};

function getCoreDebtAccountRule(code: string) {
  return CORE_DEBT_ACCOUNT_RULES[code];
}

function ensureAllowedCoreDebtAccountCode(code: string) {
  const rule = getCoreDebtAccountRule(code);
  if (!rule) {
    throw new ApiError(
      400,
      "Only core debt account codes are allowed (111,112,131,1331,1388,152,156,331,3331,3388,511,632)",
    );
  }
  return rule;
}

const accountSelect = {
  id: true,
  code: true,
  name: true,
  accountType: true,
  normalBalance: true,
  parentId: true,
  level: true,
  isPosting: true,
  allowManualEntry: true,
  isActive: true,
  sortOrder: true,
  description: true,
  createdAt: true,
  updatedAt: true,
  parent: {
    select: {
      id: true,
      code: true,
      name: true,
    },
  },
} satisfies Prisma.AccountSelect;

const itemSelect = {
  id: true,
  sku: true,
  name: true,
  itemType: true,
  unit: true,
  salePrice: true,
  purchasePrice: true,
  vatRate: true,
  revenueAccountId: true,
  cogsAccountId: true,
  inventoryAccountId: true,
  isTrackedInventory: true,
  isActive: true,
  description: true,
  createdAt: true,
  updatedAt: true,
  revenueAccount: {
    select: {
      id: true,
      code: true,
      name: true,
      accountType: true,
    },
  },
  cogsAccount: {
    select: {
      id: true,
      code: true,
      name: true,
      accountType: true,
    },
  },
  inventoryAccount: {
    select: {
      id: true,
      code: true,
      name: true,
      accountType: true,
    },
  },
} satisfies Prisma.ItemSelect;

const partnerSelect = {
  id: true,
  code: true,
  name: true,
  partnerType: true,
  taxCode: true,
  phone: true,
  email: true,
  address: true,
  paymentTermDays: true,
  creditLimit: true,
  isActive: true,
  debtReminderOn: true,
  reminderEmail: true,
  reminderCcEmails: true,
  createdAt: true,
  updatedAt: true,
  debtReminders: {
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
  },
} satisfies Prisma.PartnerSelect;

function buildContainsFilter(q?: string) {
  if (!q) {
    return undefined;
  }

  return {
    contains: q,
    mode: Prisma.QueryMode.insensitive,
  };
}

const CODE_PADDING = 5;

function normalizeCodePrefixByPartnerType(partnerType: PartnerType) {
  if (partnerType === "CUSTOMER") return "KH";
  if (partnerType === "SUPPLIER") return "NCC";
  return "DT";
}

function extractRunningNumber(code: string, prefix: string) {
  const escapedPrefix = prefix.replaceAll(
    /[.*+?^${}()|[\]\\]/g,
    String.raw`\$&`,
  );
  const regex = new RegExp(String.raw`^${escapedPrefix}(\d+)$`);
  const match = regex.exec(code);
  if (!match) return 0;
  return Number(match[1] ?? "0") || 0;
}

function formatRunningCode(prefix: string, runningNumber: number) {
  return `${prefix}${String(runningNumber).padStart(CODE_PADDING, "0")}`;
}

async function generateNextPartnerCode(partnerType: PartnerType) {
  const prefix = normalizeCodePrefixByPartnerType(partnerType);
  const existing = await prisma.partner.findMany({
    where: { code: { startsWith: prefix } },
    select: { code: true },
  });

  const maxRunning = existing.reduce((max, row) => {
    const current = extractRunningNumber(row.code, prefix);
    return Math.max(max, current);
  }, 0);

  return formatRunningCode(prefix, maxRunning + 1);
}

async function generateNextItemSku() {
  const prefix = "MH";
  const existing = await prisma.item.findMany({
    where: { sku: { startsWith: prefix } },
    select: { sku: true },
  });

  const maxRunning = existing.reduce((max, row) => {
    const current = extractRunningNumber(row.sku, prefix);
    return Math.max(max, current);
  }, 0);

  return formatRunningCode(prefix, maxRunning + 1);
}

async function ensureAccountForItem(
  accountId: string | null | undefined,
  expectedType: AccountType,
  fieldLabel: string,
  allowedCodes: string[],
) {
  if (!accountId) {
    return;
  }

  const account = await prisma.account.findUnique({
    where: { id: accountId },
    select: {
      id: true,
      code: true,
      accountType: true,
      isPosting: true,
      isActive: true,
    },
  });

  if (!account?.isActive) {
    throw new ApiError(400, `${fieldLabel} does not exist or is inactive`);
  }

  if (account.accountType !== expectedType) {
    throw new ApiError(
      400,
      `${fieldLabel} must have account type ${expectedType}`,
    );
  }

  if (!allowedCodes.includes(account.code)) {
    throw new ApiError(
      400,
      `${fieldLabel} must be one of: ${allowedCodes.join(", ")}`,
    );
  }

  if (!account.isPosting) {
    throw new ApiError(400, `${fieldLabel} must be a posting account`);
  }
}

async function resolveAccountLevel(parentId?: string | null) {
  if (!parentId) {
    return 1;
  }

  const parent = await prisma.account.findUnique({
    where: { id: parentId },
    select: {
      id: true,
      level: true,
      isActive: true,
    },
  });

  if (!parent?.isActive) {
    throw new ApiError(400, "Parent account does not exist or is inactive");
  }

  return parent.level + 1;
}

export async function listPartners(input: ListPartnersInput) {
  const qFilter = buildContainsFilter(input.q);

  const where: Prisma.PartnerWhereInput = {
    partnerType: input.partnerType,
    isActive: input.isActive,
    OR: qFilter
      ? [
          { code: qFilter },
          { name: qFilter },
          { taxCode: qFilter },
          { phone: qFilter },
          { email: qFilter },
        ]
      : undefined,
  };

  return prisma.partner.findMany({
    where,
    select: partnerSelect,
    orderBy: [{ code: "asc" }],
  });
}

export async function getPartnerById(id: string) {
  const partner = await prisma.partner.findUnique({
    where: { id },
    select: partnerSelect,
  });

  if (!partner) {
    throw new ApiError(404, "Partner not found");
  }

  return partner;
}

export async function createPartner(input: UpsertPartnerInput) {
  const code =
    input.code?.trim() || (await generateNextPartnerCode(input.partnerType));

  return prisma.partner.create({
    data: {
      code,
      name: input.name,
      partnerType: input.partnerType,
      taxCode: input.taxCode,
      phone: input.phone,
      email: input.email,
      address: input.address,
      paymentTermDays: input.paymentTermDays,
      creditLimit: input.creditLimit,
      isActive: input.isActive ?? true,
      debtReminderOn: input.debtReminderOn ?? true,
      reminderEmail: input.reminderEmail,
      reminderCcEmails: input.reminderCcEmails,
    },
    select: partnerSelect,
  });
}

export async function updatePartner(
  id: string,
  input: Partial<UpsertPartnerInput>,
) {
  const existing = await prisma.partner.findUnique({
    where: { id },
    select: { id: true, code: true },
  });
  if (!existing) {
    throw new ApiError(404, "Partner not found");
  }

  if (typeof input.code === "string" && input.code.trim() !== existing.code) {
    throw new ApiError(400, "Partner code cannot be changed");
  }

  return prisma.partner.update({
    where: { id },
    data: {
      code: existing.code,
      name: input.name,
      partnerType: input.partnerType,
      taxCode: input.taxCode,
      phone: input.phone,
      email: input.email,
      address: input.address,
      paymentTermDays: input.paymentTermDays,
      creditLimit: input.creditLimit,
      isActive: input.isActive,
      debtReminderOn: input.debtReminderOn,
      reminderEmail: input.reminderEmail,
      reminderCcEmails: input.reminderCcEmails,
    },
    select: partnerSelect,
  });
}

export async function listItems(input: ListItemsInput) {
  const qFilter = buildContainsFilter(input.q);

  const where: Prisma.ItemWhereInput = {
    itemType: input.itemType,
    isActive: input.isActive,
    OR: qFilter
      ? [{ sku: qFilter }, { name: qFilter }, { description: qFilter }]
      : undefined,
  };

  return prisma.item.findMany({
    where,
    select: itemSelect,
    orderBy: [{ sku: "asc" }],
  });
}

export async function getItemById(id: string) {
  const item = await prisma.item.findUnique({
    where: { id },
    select: itemSelect,
  });

  if (!item) {
    throw new ApiError(404, "Item not found");
  }

  return item;
}

export async function createItem(input: UpsertItemInput) {
  const sku = input.sku?.trim() || (await generateNextItemSku());

  await ensureAccountForItem(
    input.revenueAccountId,
    AccountType.REVENUE,
    "Revenue account",
    ["511"],
  );
  await ensureAccountForItem(
    input.cogsAccountId,
    AccountType.EXPENSE,
    "COGS account",
    ["632"],
  );
  await ensureAccountForItem(
    input.inventoryAccountId,
    AccountType.ASSET,
    "Inventory account",
    ["152", "156"],
  );

  return prisma.item.create({
    data: {
      sku,
      name: input.name,
      itemType: input.itemType,
      unit: input.unit,
      salePrice: input.salePrice,
      purchasePrice: input.purchasePrice,
      vatRate: input.vatRate,
      revenueAccountId: input.revenueAccountId,
      cogsAccountId: input.cogsAccountId,
      inventoryAccountId: input.inventoryAccountId,
      isTrackedInventory: input.isTrackedInventory ?? false,
      isActive: input.isActive ?? true,
      description: input.description,
    },
    select: itemSelect,
  });
}

export async function updateItem(id: string, input: Partial<UpsertItemInput>) {
  const existing = await prisma.item.findUnique({
    where: { id },
    select: { id: true, sku: true },
  });
  if (!existing) {
    throw new ApiError(404, "Item not found");
  }

  if (typeof input.sku === "string" && input.sku.trim() !== existing.sku) {
    throw new ApiError(400, "Item code cannot be changed");
  }

  await ensureAccountForItem(
    input.revenueAccountId,
    AccountType.REVENUE,
    "Revenue account",
    ["511"],
  );
  await ensureAccountForItem(
    input.cogsAccountId,
    AccountType.EXPENSE,
    "COGS account",
    ["632"],
  );
  await ensureAccountForItem(
    input.inventoryAccountId,
    AccountType.ASSET,
    "Inventory account",
    ["152", "156"],
  );

  return prisma.item.update({
    where: { id },
    data: {
      sku: existing.sku,
      name: input.name,
      itemType: input.itemType,
      unit: input.unit,
      salePrice: input.salePrice,
      purchasePrice: input.purchasePrice,
      vatRate: input.vatRate,
      revenueAccountId: input.revenueAccountId,
      cogsAccountId: input.cogsAccountId,
      inventoryAccountId: input.inventoryAccountId,
      isTrackedInventory: input.isTrackedInventory,
      isActive: input.isActive,
      description: input.description,
    },
    select: itemSelect,
  });
}

export async function listAccounts(input: ListAccountsInput) {
  const qFilter = buildContainsFilter(input.q);

  const where: Prisma.AccountWhereInput = {
    accountType: input.accountType,
    isActive: input.isActive,
    OR: qFilter
      ? [{ code: qFilter }, { name: qFilter }, { description: qFilter }]
      : undefined,
  };

  return prisma.account.findMany({
    where,
    select: accountSelect,
    orderBy: [{ code: "asc" }],
  });
}

export async function getAccountById(id: string) {
  const account = await prisma.account.findUnique({
    where: { id },
    select: accountSelect,
  });

  if (!account) {
    throw new ApiError(404, "Account not found");
  }

  return account;
}

export async function createAccount(input: UpsertAccountInput) {
  const rule = ensureAllowedCoreDebtAccountCode(input.code);

  if (input.parentId) {
    throw new ApiError(400, "Core debt accounts cannot have parent account");
  }

  if (input.accountType !== rule.accountType) {
    throw new ApiError(
      400,
      `Account ${input.code} must have account type ${rule.accountType}`,
    );
  }

  if (input.normalBalance !== rule.normalBalance) {
    throw new ApiError(
      400,
      `Account ${input.code} must have normal balance ${rule.normalBalance}`,
    );
  }

  const level = 1;

  return prisma.account.create({
    data: {
      code: input.code,
      name: input.name,
      accountType: input.accountType,
      normalBalance: input.normalBalance,
      parentId: input.parentId,
      level,
      isPosting: true,
      allowManualEntry: rule.allowManualEntry,
      isActive: input.isActive ?? true,
      sortOrder: input.sortOrder ?? rule.sortOrder,
      description: input.description,
    },
    select: accountSelect,
  });
}

export async function updateAccount(
  id: string,
  input: Partial<UpsertAccountInput>,
) {
  const existing = await prisma.account.findUnique({
    where: { id },
    select: { id: true, code: true },
  });

  if (!existing) {
    throw new ApiError(404, "Account not found");
  }

  const originalCode = existing.code;
  const rule = ensureAllowedCoreDebtAccountCode(originalCode);

  if (typeof input.code === "string" && input.code !== originalCode) {
    throw new ApiError(
      400,
      "Changing account code is not allowed for core debt accounts",
    );
  }

  if (input.parentId !== undefined && input.parentId !== null) {
    throw new ApiError(400, "Core debt accounts cannot have parent account");
  }

  if (input.accountType && input.accountType !== rule.accountType) {
    throw new ApiError(
      400,
      `Account ${originalCode} must keep account type ${rule.accountType}`,
    );
  }

  if (input.normalBalance && input.normalBalance !== rule.normalBalance) {
    throw new ApiError(
      400,
      `Account ${originalCode} must keep normal balance ${rule.normalBalance}`,
    );
  }

  if (input.isPosting === false) {
    throw new ApiError(400, "Core debt accounts must be posting accounts");
  }

  if (
    typeof input.allowManualEntry === "boolean" &&
    input.allowManualEntry !== rule.allowManualEntry
  ) {
    throw new ApiError(
      400,
      `Account ${originalCode} must keep allowManualEntry=${String(rule.allowManualEntry)}`,
    );
  }

  if (input.isActive === false) {
    throw new ApiError(400, "Core debt accounts cannot be deactivated");
  }

  if (input.parentId && input.parentId === id) {
    throw new ApiError(400, "Account cannot be its own parent");
  }

  const level = 1;

  return prisma.account.update({
    where: { id },
    data: {
      code: originalCode,
      name: input.name,
      accountType: rule.accountType,
      normalBalance: rule.normalBalance,
      parentId: null,
      level,
      isPosting: true,
      allowManualEntry: rule.allowManualEntry,
      isActive: true,
      sortOrder: input.sortOrder ?? rule.sortOrder,
      description: input.description,
    },
    select: accountSelect,
  });
}
