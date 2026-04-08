-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateEnum
CREATE TYPE "AuthUserRole" AS ENUM ('CHIEF_ACCOUNTANT', 'STAFF_ACCOUNTANT');

-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('EMAIL', 'GOOGLE');

-- CreateTable
CREATE TABLE "user_profiles" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "full_name" VARCHAR(120),
    "role" "AuthUserRole" NOT NULL DEFAULT 'STAFF_ACCOUNTANT',
    "provider" "AuthProvider" NOT NULL DEFAULT 'EMAIL',
    "avatar_url" TEXT,
    "is_email_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_audit_logs" (
    "id" BIGSERIAL NOT NULL,
    "user_id" UUID,
    "email" VARCHAR(255),
    "action" VARCHAR(50) NOT NULL,
    "success" BOOLEAN NOT NULL,
    "message" TEXT,
    "provider" "AuthProvider",
    "role" "AuthUserRole",
    "ip_address" VARCHAR(64),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auth_audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_email_key" ON "user_profiles"("email");

-- CreateIndex
CREATE INDEX "auth_audit_logs_user_id_idx" ON "auth_audit_logs"("user_id");

-- CreateIndex
CREATE INDEX "auth_audit_logs_email_idx" ON "auth_audit_logs"("email");

-- CreateIndex
CREATE INDEX "auth_audit_logs_action_idx" ON "auth_audit_logs"("action");

-- CreateIndex
CREATE INDEX "auth_audit_logs_created_at_idx" ON "auth_audit_logs"("created_at");

-- AddForeignKey
ALTER TABLE "auth_audit_logs" ADD CONSTRAINT "auth_audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
