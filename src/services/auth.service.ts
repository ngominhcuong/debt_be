import { supabaseAdminClient, supabaseAuthClient } from "../config/supabase";
import { Prisma } from "../generated/prisma";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/api-error";

type UserRole = "CHIEF_ACCOUNTANT" | "STAFF_ACCOUNTANT";
type AuthProvider = "EMAIL" | "GOOGLE";

interface RegisterInput {
  email: string;
  password: string;
  fullName?: string;
  role?: UserRole;
}

interface VerifyOtpInput {
  email: string;
  token: string;
  type: "signup" | "recovery";
}

interface LoginInput {
  email: string;
  password: string;
}

interface GoogleAuthInput {
  idToken: string;
  role?: UserRole;
  fullName?: string;
}

interface ResendOtpInput {
  email: string;
}

interface ForgotPasswordInput {
  email: string;
}

interface ChangePasswordInput {
  userId: string;
  email: string;
  currentPassword: string;
  newPassword: string;
}

type ProfileUpsertInput = {
  userId: string;
  email: string;
  fullName?: string | null;
  avatarUrl?: string | null;
  provider: AuthProvider;
  role?: UserRole;
  isEmailVerified: boolean;
};

function extractErrorMessage(error: unknown, fallback: string): string {
  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message: unknown }).message;
    if (typeof message === "string") {
      return message;
    }

    return JSON.stringify(message);
  }
  return fallback;
}

async function writeAuditLog(data: {
  userId?: string | null;
  email?: string | null;
  action: string;
  success: boolean;
  message?: string | null;
  provider?: AuthProvider | null;
  role?: UserRole | null;
  ipAddress?: string | null;
}) {
  try {
    await prisma.authAuditLog.create({
      data: {
        userId: data.userId ?? null,
        email: data.email ?? null,
        action: data.action,
        success: data.success,
        message: data.message ?? null,
        provider: data.provider ?? null,
        role: data.role ?? null,
        ipAddress: data.ipAddress ?? null,
      },
    });
  } catch {
    // Audit log should not block auth flow.
  }
}

async function upsertUserProfile(input: ProfileUpsertInput) {
  const createData = {
    id: input.userId,
    email: input.email,
    fullName: input.fullName ?? null,
    role: input.role ?? "STAFF_ACCOUNTANT",
    provider: input.provider,
    avatarUrl: input.avatarUrl ?? null,
    isEmailVerified: input.isEmailVerified,
  };

  const updateData: {
    email: string;
    provider: AuthProvider;
    isEmailVerified: boolean;
    fullName?: string;
    avatarUrl?: string;
    role?: UserRole;
  } = {
    email: input.email,
    provider: input.provider,
    isEmailVerified: input.isEmailVerified,
  };

  if (input.fullName) {
    updateData.fullName = input.fullName;
  }

  if (input.avatarUrl) {
    updateData.avatarUrl = input.avatarUrl;
  }

  if (input.role) {
    updateData.role = input.role;
  }

  return prisma.userProfile.upsert({
    where: { id: input.userId },
    create: createData,
    update: updateData,
  });
}

export async function registerWithEmail(
  input: RegisterInput,
  ipAddress?: string,
) {
  const { data, error } = await supabaseAuthClient.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: {
        full_name: input.fullName,
        role: input.role ?? "STAFF_ACCOUNTANT",
      },
    },
  });

  if (error) {
    await writeAuditLog({
      email: input.email,
      action: "REGISTER",
      success: false,
      message: error.message,
      provider: "EMAIL",
      role: input.role ?? "STAFF_ACCOUNTANT",
      ipAddress,
    });
    throw new ApiError(400, error.message);
  }

  if (!data.user) {
    throw new ApiError(400, "Cannot create user");
  }

  const profile = await upsertUserProfile({
    userId: data.user.id,
    email: data.user.email ?? input.email,
    fullName: input.fullName ?? data.user.user_metadata?.full_name ?? null,
    provider: "EMAIL",
    role: input.role ?? "STAFF_ACCOUNTANT",
    isEmailVerified: Boolean(data.user.email_confirmed_at),
  });

  await writeAuditLog({
    userId: data.user.id,
    email: data.user.email ?? input.email,
    action: "REGISTER",
    success: true,
    provider: "EMAIL",
    role: profile.role,
    ipAddress,
  });

  return {
    user: data.user,
    profile,
    message: "Registration successful. Please verify your email OTP.",
  };
}

export async function verifyEmailOtp(
  input: VerifyOtpInput,
  ipAddress?: string,
) {
  const { data, error } = await supabaseAuthClient.auth.verifyOtp({
    email: input.email,
    token: input.token,
    type: input.type,
  });

  if (error || !data.user) {
    await writeAuditLog({
      email: input.email,
      action: "VERIFY_EMAIL_OTP",
      success: false,
      message: error?.message ?? "OTP verification failed",
      provider: "EMAIL",
      ipAddress,
    });

    throw new ApiError(400, error?.message ?? "OTP verification failed");
  }

  const profile = await upsertUserProfile({
    userId: data.user.id,
    email: data.user.email ?? input.email,
    fullName:
      data.user.user_metadata?.full_name ??
      data.user.user_metadata?.name ??
      null,
    avatarUrl:
      data.user.user_metadata?.avatar_url ??
      data.user.user_metadata?.picture ??
      null,
    provider: "EMAIL",
    isEmailVerified: true,
  });

  await writeAuditLog({
    userId: data.user.id,
    email: data.user.email ?? input.email,
    action: "VERIFY_EMAIL_OTP",
    success: true,
    provider: "EMAIL",
    role: profile.role,
    ipAddress,
  });

  return {
    session: data.session,
    user: data.user,
    profile,
  };
}

export async function resendEmailOtp(
  input: ResendOtpInput,
  ipAddress?: string,
) {
  const { error } = await supabaseAuthClient.auth.resend({
    type: "signup",
    email: input.email,
  });

  if (error) {
    await writeAuditLog({
      email: input.email,
      action: "RESEND_EMAIL_OTP",
      success: false,
      message: error.message,
      provider: "EMAIL",
      ipAddress,
    });

    throw new ApiError(400, error.message);
  }

  await writeAuditLog({
    email: input.email,
    action: "RESEND_EMAIL_OTP",
    success: true,
    provider: "EMAIL",
    ipAddress,
  });

  return {
    message: "OTP resent successfully",
  };
}

export async function loginWithEmail(input: LoginInput, ipAddress?: string) {
  const { data, error } = await supabaseAuthClient.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  });

  if (error || !data.user || !data.session) {
    await writeAuditLog({
      email: input.email,
      action: "LOGIN",
      success: false,
      message: error?.message ?? "Login failed",
      provider: "EMAIL",
      ipAddress,
    });
    throw new ApiError(401, error?.message ?? "Invalid credentials");
  }

  if (!data.user.email_confirmed_at) {
    throw new ApiError(403, "Email is not verified. Please verify OTP first.");
  }

  const profile = await upsertUserProfile({
    userId: data.user.id,
    email: data.user.email ?? input.email,
    fullName:
      data.user.user_metadata?.full_name ??
      data.user.user_metadata?.name ??
      null,
    avatarUrl:
      data.user.user_metadata?.avatar_url ??
      data.user.user_metadata?.picture ??
      null,
    provider: "EMAIL",
    isEmailVerified: true,
  });

  await writeAuditLog({
    userId: data.user.id,
    email: data.user.email ?? input.email,
    action: "LOGIN",
    success: true,
    provider: "EMAIL",
    role: profile.role,
    ipAddress,
  });

  return {
    session: data.session,
    user: data.user,
    profile,
  };
}

export async function loginWithGoogle(
  input: GoogleAuthInput,
  ipAddress?: string,
) {
  const { data, error } = await supabaseAuthClient.auth.signInWithIdToken({
    provider: "google",
    token: input.idToken,
  });

  if (error || !data.user || !data.session) {
    await writeAuditLog({
      action: "GOOGLE_LOGIN",
      success: false,
      message: error?.message ?? "Google login failed",
      provider: "GOOGLE",
      role: input.role,
      ipAddress,
    });
    throw new ApiError(401, error?.message ?? "Google login failed");
  }

  const metadata = data.user.user_metadata ?? {};

  const profile = await upsertUserProfile({
    userId: data.user.id,
    email: data.user.email ?? "",
    fullName:
      input.fullName ??
      (typeof metadata.full_name === "string" ? metadata.full_name : null) ??
      (typeof metadata.name === "string" ? metadata.name : null),
    avatarUrl:
      (typeof metadata.avatar_url === "string" ? metadata.avatar_url : null) ??
      (typeof metadata.picture === "string" ? metadata.picture : null),
    provider: "GOOGLE",
    role: input.role,
    isEmailVerified: Boolean(data.user.email_confirmed_at),
  });

  await writeAuditLog({
    userId: data.user.id,
    email: data.user.email,
    action: "GOOGLE_LOGIN",
    success: true,
    provider: "GOOGLE",
    role: profile.role,
    ipAddress,
  });

  return {
    session: data.session,
    user: data.user,
    profile,
  };
}

export function getGoogleOAuthUrl() {
  const baseUrl = process.env.SUPABASE_URL;
  const redirectUrl = process.env.SUPABASE_GOOGLE_REDIRECT_URL;

  if (!baseUrl) {
    throw new ApiError(500, "SUPABASE_URL is not configured");
  }

  const authUrl = new URL("/auth/v1/authorize", baseUrl);
  authUrl.searchParams.set("provider", "google");

  if (redirectUrl) {
    authUrl.searchParams.set("redirect_to", redirectUrl);
  }

  return {
    provider: "google",
    url: authUrl.toString(),
  };
}

export async function syncUserProfile(
  userId: string,
  email: string,
  opts?: {
    fullName?: string;
    avatarUrl?: string;
    provider?: AuthProvider;
    role?: UserRole;
  },
  ipAddress?: string,
) {
  const profile = await upsertUserProfile({
    userId,
    email,
    fullName: opts?.fullName ?? null,
    avatarUrl: opts?.avatarUrl ?? null,
    provider: opts?.provider ?? "EMAIL",
    role: opts?.role,
    isEmailVerified: true,
  });

  await writeAuditLog({
    userId,
    email,
    action: "SYNC_PROFILE",
    success: true,
    provider: opts?.provider ?? "EMAIL",
    role: profile.role,
    ipAddress,
  });

  return profile;
}

export async function forgotPassword(
  input: ForgotPasswordInput,
  ipAddress?: string,
) {
  const redirectTo =
    (process.env.FRONTEND_URL ?? "http://localhost:8080") +
    "/auth/reset-password";

  const { error } = await supabaseAuthClient.auth.resetPasswordForEmail(
    input.email,
    { redirectTo },
  );

  if (error) {
    await writeAuditLog({
      email: input.email,
      action: "FORGOT_PASSWORD",
      success: false,
      message: error.message,
      provider: "EMAIL",
      ipAddress,
    });
    throw new ApiError(400, error.message);
  }

  await writeAuditLog({
    email: input.email,
    action: "FORGOT_PASSWORD",
    success: true,
    provider: "EMAIL",
    ipAddress,
  });

  return { message: "Password reset email sent" };
}

export async function changePassword(
  input: ChangePasswordInput,
  ipAddress?: string,
) {
  const { error: signInError } =
    await supabaseAuthClient.auth.signInWithPassword({
      email: input.email,
      password: input.currentPassword,
    });

  if (signInError) {
    await writeAuditLog({
      userId: input.userId,
      email: input.email,
      action: "CHANGE_PASSWORD",
      success: false,
      message: "Current password is incorrect",
      provider: "EMAIL",
      ipAddress,
    });
    throw new ApiError(400, "Current password is incorrect");
  }

  const { error: updateError } =
    await supabaseAdminClient.auth.admin.updateUserById(input.userId, {
      password: input.newPassword,
    });

  if (updateError) {
    await writeAuditLog({
      userId: input.userId,
      email: input.email,
      action: "CHANGE_PASSWORD",
      success: false,
      message: updateError.message,
      provider: "EMAIL",
      ipAddress,
    });
    throw new ApiError(400, updateError.message);
  }

  await writeAuditLog({
    userId: input.userId,
    email: input.email,
    action: "CHANGE_PASSWORD",
    success: true,
    provider: "EMAIL",
    ipAddress,
  });

  return { message: "Password changed successfully" };
}

export async function listUserProfiles(params: {
  q?: string;
  role?: UserRole;
  page?: number;
  limit?: number;
}) {
  const { q, role, page = 1, limit = 20 } = params;
  const skip = (page - 1) * limit;

  const where: Prisma.UserProfileWhereInput = {};
  if (role) where.role = role;
  if (q) {
    where.OR = [
      { email: { contains: q, mode: "insensitive" } },
      { fullName: { contains: q, mode: "insensitive" } },
    ];
  }

  const [rows, total] = await Promise.all([
    prisma.userProfile.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        provider: true,
        avatarUrl: true,
        isEmailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.userProfile.count({ where }),
  ]);

  return { rows, total, page, limit };
}

export function mapServiceError(error: unknown) {
  if (error instanceof ApiError) {
    return error;
  }

  return new ApiError(400, extractErrorMessage(error, "Request failed"));
}
