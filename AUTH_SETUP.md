# Auth + Supabase Setup Guide

## 1. Prisma schema tables

Schema is defined in [prisma/schema.prisma](prisma/schema.prisma) with:

- Enum `AuthUserRole`
  - `CHIEF_ACCOUNTANT` = Ke toan truong
  - `STAFF_ACCOUNTANT` = Ke toan thuong
- Enum `AuthProvider` (`EMAIL`, `GOOGLE`)
- Table `user_profiles`
- Table `auth_audit_logs`

`user_profiles.id` stores the same UUID as `auth.users.id` from Supabase Auth.

## 2. Prepare environment variables

Copy `.env.example` to `.env` and fill real values.

Important variables:

- `DATABASE_URL`: Supabase pooled connection string (port 6543)
- `DIRECT_URL`: Supabase direct connection string (port 5432)
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_EMAIL_REDIRECT_URL`
- `SUPABASE_GOOGLE_REDIRECT_URL`

## 3. Push schema to Supabase database

Run in backend folder:

```bash
npm install
npx prisma generate
npx prisma db push
```

Optional if you want migration history:

```bash
npx prisma migrate dev --name init_auth
```

## 4. Configure Supabase Auth (Email OTP verify)

In Supabase Dashboard:

1. Go to `Authentication` -> `Providers` -> `Email`.
2. Enable Email provider.
3. Enable confirmation requirement (email confirm).
4. In `Authentication` -> `URL Configuration`:
   - Site URL: `http://localhost:5173`
   - Additional Redirect URLs:
     - `http://localhost:5173/auth/confirm`
     - `http://localhost:5173/auth/callback`
5. (Optional) Customize email templates for OTP/verification link.

## 5. Configure Google OAuth in Supabase

### 5.1 Google Cloud

1. Open Google Cloud Console -> APIs & Services -> Credentials.
2. Create OAuth Client ID (Web application).
3. Authorized JavaScript origins:
   - `http://localhost:5173`
   - Your production frontend domain
4. Authorized redirect URIs:
   - `https://<project_ref>.supabase.co/auth/v1/callback`

### 5.2 Supabase Dashboard

1. Go to `Authentication` -> `Providers` -> `Google`.
2. Enable Google provider.
3. Paste `Client ID` and `Client Secret` from Google Cloud.
4. Save.

## 6. Available backend auth APIs

Base URL: `http://localhost:4000/api/auth`

### POST /register

Request body:

```json
{
  "email": "user@company.com",
  "password": "Password123!",
  "fullName": "Nguyen Van A",
  "role": "CHIEF_ACCOUNTANT"
}
```

Response: creates Supabase auth user + user profile, sends verification email/OTP.

### POST /verify-email-otp

Request body:

```json
{
  "email": "user@company.com",
  "token": "123456",
  "type": "email"
}
```

Response: verifies OTP and returns session + user + profile.

### POST /resend-otp

Request body:

```json
{
  "email": "user@company.com"
}
```

### POST /login

Request body:

```json
{
  "email": "user@company.com",
  "password": "Password123!"
}
```

### POST /google

Request body:

```json
{
  "idToken": "<google_id_token>",
  "role": "STAFF_ACCOUNTANT"
}
```

Use this when frontend gets a Google ID token (Google Identity Services).

### GET /google/oauth-url

Returns a Supabase authorize URL for redirect-based Google sign-in.

## 7. Run backend

```bash
npm run dev
```

Health check: `GET http://localhost:4000/health`

## 8. Frontend integration notes

- Register flow:
  1. Call `POST /api/auth/register`
  2. Ask user to input OTP from email
  3. Call `POST /api/auth/verify-email-otp`
- Email login flow:
  - Call `POST /api/auth/login`
- Google login flow:
  - Preferred: frontend gets Google ID token and send to `POST /api/auth/google`

## 9. Supabase RLS suggestion

Because this backend uses `service_role` key for some operations, keep key only on server.
For data tables with direct client access, enable RLS and create policies by authenticated user.
