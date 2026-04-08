-- CreateEnum
CREATE TYPE "PartnerType" AS ENUM ('CUSTOMER', 'SUPPLIER', 'BOTH');

-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('GOODS', 'SERVICE', 'MATERIAL', 'OTHER');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE', 'OFF_BALANCE');

-- CreateEnum
CREATE TYPE "NormalBalance" AS ENUM ('DEBIT', 'CREDIT');

-- CreateEnum
CREATE TYPE "ReminderScope" AS ENUM ('AR', 'AP', 'BOTH');

-- CreateEnum
CREATE TYPE "ReminderStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');

-- CreateTable
CREATE TABLE "partners" (
	"id" UUID NOT NULL DEFAULT gen_random_uuid(),
	"code" VARCHAR(30) NOT NULL,
	"name" VARCHAR(180) NOT NULL,
	"partner_type" "PartnerType" NOT NULL DEFAULT 'BOTH',
	"tax_code" VARCHAR(30),
	"phone" VARCHAR(30),
	"email" VARCHAR(255),
	"address" TEXT,
	"payment_term_days" INTEGER,
	"credit_limit" DECIMAL(18,2),
	"is_active" BOOLEAN NOT NULL DEFAULT true,
	"debt_reminder_on" BOOLEAN NOT NULL DEFAULT true,
	"reminder_email" VARCHAR(255),
	"reminder_cc_emails" JSONB,
	"created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_at" TIMESTAMP(3) NOT NULL,

	CONSTRAINT "partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
	"id" UUID NOT NULL DEFAULT gen_random_uuid(),
	"code" VARCHAR(20) NOT NULL,
	"name" VARCHAR(180) NOT NULL,
	"account_type" "AccountType" NOT NULL,
	"normal_balance" "NormalBalance" NOT NULL,
	"parent_id" UUID,
	"level" INTEGER NOT NULL DEFAULT 1,
	"is_posting" BOOLEAN NOT NULL DEFAULT true,
	"allow_manual_entry" BOOLEAN NOT NULL DEFAULT true,
	"is_active" BOOLEAN NOT NULL DEFAULT true,
	"sort_order" INTEGER NOT NULL DEFAULT 0,
	"description" TEXT,
	"created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_at" TIMESTAMP(3) NOT NULL,

	CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
	"id" UUID NOT NULL DEFAULT gen_random_uuid(),
	"sku" VARCHAR(40) NOT NULL,
	"name" VARCHAR(180) NOT NULL,
	"item_type" "ItemType" NOT NULL DEFAULT 'GOODS',
	"unit" VARCHAR(30) NOT NULL,
	"sale_price" DECIMAL(18,2),
	"purchase_price" DECIMAL(18,2),
	"vat_rate" DECIMAL(5,2),
	"revenue_account_id" UUID,
	"cogs_account_id" UUID,
	"inventory_account_id" UUID,
	"is_tracked_inventory" BOOLEAN NOT NULL DEFAULT false,
	"is_active" BOOLEAN NOT NULL DEFAULT true,
	"description" TEXT,
	"created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_at" TIMESTAMP(3) NOT NULL,

	CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "debt_reminder_configs" (
	"id" UUID NOT NULL DEFAULT gen_random_uuid(),
	"partner_id" UUID NOT NULL,
	"scope" "ReminderScope" NOT NULL DEFAULT 'BOTH',
	"enabled" BOOLEAN NOT NULL DEFAULT true,
	"days_before_due" INTEGER NOT NULL DEFAULT 3,
	"days_after_due" INTEGER NOT NULL DEFAULT 1,
	"recipient_email" VARCHAR(255),
	"cc_emails" JSONB,
	"last_sent_at" TIMESTAMP(3),
	"created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_at" TIMESTAMP(3) NOT NULL,

	CONSTRAINT "debt_reminder_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "debt_reminder_logs" (
	"id" BIGSERIAL NOT NULL,
	"partner_id" UUID NOT NULL,
	"scope" "ReminderScope" NOT NULL,
	"invoice_ref" VARCHAR(80),
	"recipient_email" VARCHAR(255) NOT NULL,
	"subject" VARCHAR(255) NOT NULL,
	"status" "ReminderStatus" NOT NULL DEFAULT 'PENDING',
	"error_message" TEXT,
	"scheduled_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"sent_at" TIMESTAMP(3),
	"created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

	CONSTRAINT "debt_reminder_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "partners_code_key" ON "partners"("code");

-- CreateIndex
CREATE INDEX "partners_name_idx" ON "partners"("name");

-- CreateIndex
CREATE INDEX "partners_partner_type_idx" ON "partners"("partner_type");

-- CreateIndex
CREATE INDEX "partners_is_active_idx" ON "partners"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_code_key" ON "accounts"("code");

-- CreateIndex
CREATE INDEX "accounts_parent_id_idx" ON "accounts"("parent_id");

-- CreateIndex
CREATE INDEX "accounts_account_type_idx" ON "accounts"("account_type");

-- CreateIndex
CREATE INDEX "accounts_is_active_idx" ON "accounts"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "items_sku_key" ON "items"("sku");

-- CreateIndex
CREATE INDEX "items_name_idx" ON "items"("name");

-- CreateIndex
CREATE INDEX "items_item_type_idx" ON "items"("item_type");

-- CreateIndex
CREATE INDEX "items_is_active_idx" ON "items"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "debt_reminder_configs_partner_id_scope_key" ON "debt_reminder_configs"("partner_id", "scope");

-- CreateIndex
CREATE INDEX "debt_reminder_configs_enabled_idx" ON "debt_reminder_configs"("enabled");

-- CreateIndex
CREATE INDEX "debt_reminder_logs_partner_id_idx" ON "debt_reminder_logs"("partner_id");

-- CreateIndex
CREATE INDEX "debt_reminder_logs_status_idx" ON "debt_reminder_logs"("status");

-- CreateIndex
CREATE INDEX "debt_reminder_logs_scheduled_at_idx" ON "debt_reminder_logs"("scheduled_at");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_revenue_account_id_fkey" FOREIGN KEY ("revenue_account_id") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_cogs_account_id_fkey" FOREIGN KEY ("cogs_account_id") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_inventory_account_id_fkey" FOREIGN KEY ("inventory_account_id") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "debt_reminder_configs" ADD CONSTRAINT "debt_reminder_configs_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "partners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "debt_reminder_logs" ADD CONSTRAINT "debt_reminder_logs_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "partners"("id") ON DELETE CASCADE ON UPDATE CASCADE;
