-- Seed data for auth_audit_logs and voucher_audit_logs
-- Uses real user profiles from user_profiles table where they exist; falls back to null userId for demo rows
-- Idempotent: only inserts rows that don't already exist (checked by uniqueness of action+email+created_at combo)

-- ── Auth Audit Logs ──────────────────────────────────────────────────────────
-- These rows simulate login / register / sync events for the two expected users
-- If user_profiles rows exist they will link; otherwise userId stays NULL (FK is nullable).

INSERT INTO public.auth_audit_logs (
  user_id, email, action, success, message, provider, role, ip_address, created_at
)
SELECT
  up.id,
  v.email,
  v.action,
  v.success,
  v.message,
  v.provider::public."AuthProvider",
  v.role::public."AuthUserRole",
  v.ip_address,
  v.created_at
FROM (
  VALUES
    ('ketoanvien@mwconnect.vn',   'REGISTER',        true,  NULL,                           'EMAIL', 'STAFF_ACCOUNTANT',   '192.168.1.10', NOW() - INTERVAL '60 days'),
    ('ketoanvien@mwconnect.vn',   'VERIFY_EMAIL_OTP',true,  NULL,                           'EMAIL', 'STAFF_ACCOUNTANT',   '192.168.1.10', NOW() - INTERVAL '60 days' + INTERVAL '5 minutes'),
    ('ketoanvien@mwconnect.vn',   'LOGIN',           true,  NULL,                           'EMAIL', 'STAFF_ACCOUNTANT',   '192.168.1.10', NOW() - INTERVAL '55 days'),
    ('ketoanvien@mwconnect.vn',   'LOGIN',           true,  NULL,                           'EMAIL', 'STAFF_ACCOUNTANT',   '192.168.1.10', NOW() - INTERVAL '40 days'),
    ('ketoanvien@mwconnect.vn',   'LOGIN',           false, 'Invalid login credentials',    'EMAIL', 'STAFF_ACCOUNTANT',   '192.168.1.11', NOW() - INTERVAL '30 days'),
    ('ketoanvien@mwconnect.vn',   'LOGIN',           true,  NULL,                           'EMAIL', 'STAFF_ACCOUNTANT',   '192.168.1.10', NOW() - INTERVAL '20 days'),
    ('ketoanvien@mwconnect.vn',   'SYNC_PROFILE',    true,  NULL,                           'EMAIL', 'STAFF_ACCOUNTANT',   '192.168.1.10', NOW() - INTERVAL '20 days' + INTERVAL '1 second'),
    ('ketoanvien@mwconnect.vn',   'LOGIN',           true,  NULL,                           'EMAIL', 'STAFF_ACCOUNTANT',   '192.168.1.10', NOW() - INTERVAL '5 days'),
    ('ketoanvien@mwconnect.vn',   'SYNC_PROFILE',    true,  NULL,                           'EMAIL', 'STAFF_ACCOUNTANT',   '192.168.1.10', NOW() - INTERVAL '5 days' + INTERVAL '1 second'),
    ('ketoanvien@mwconnect.vn',   'LOGIN',           true,  NULL,                           'EMAIL', 'STAFF_ACCOUNTANT',   '10.0.0.5',     NOW() - INTERVAL '1 day'),

    ('ketoantruong@mwconnect.vn', 'REGISTER',        true,  NULL,                           'EMAIL', 'CHIEF_ACCOUNTANT',   '192.168.1.20', NOW() - INTERVAL '61 days'),
    ('ketoantruong@mwconnect.vn', 'VERIFY_EMAIL_OTP',true,  NULL,                           'EMAIL', 'CHIEF_ACCOUNTANT',   '192.168.1.20', NOW() - INTERVAL '61 days' + INTERVAL '3 minutes'),
    ('ketoantruong@mwconnect.vn', 'LOGIN',           true,  NULL,                           'EMAIL', 'CHIEF_ACCOUNTANT',   '192.168.1.20', NOW() - INTERVAL '60 days'),
    ('ketoantruong@mwconnect.vn', 'SYNC_PROFILE',    true,  NULL,                           'EMAIL', 'CHIEF_ACCOUNTANT',   '192.168.1.20', NOW() - INTERVAL '60 days' + INTERVAL '1 second'),
    ('ketoantruong@mwconnect.vn', 'LOGIN',           true,  NULL,                           'EMAIL', 'CHIEF_ACCOUNTANT',   '192.168.1.20', NOW() - INTERVAL '45 days'),
    ('ketoantruong@mwconnect.vn', 'LOGIN',           true,  NULL,                           'EMAIL', 'CHIEF_ACCOUNTANT',   '192.168.1.20', NOW() - INTERVAL '30 days'),
    ('ketoantruong@mwconnect.vn', 'CHANGE_PASSWORD', true,  NULL,                           'EMAIL', 'CHIEF_ACCOUNTANT',   '192.168.1.20', NOW() - INTERVAL '29 days'),
    ('ketoantruong@mwconnect.vn', 'LOGIN',           true,  NULL,                           'EMAIL', 'CHIEF_ACCOUNTANT',   '192.168.1.20', NOW() - INTERVAL '15 days'),
    ('ketoantruong@mwconnect.vn', 'SYNC_PROFILE',    true,  NULL,                           'EMAIL', 'CHIEF_ACCOUNTANT',   '192.168.1.20', NOW() - INTERVAL '15 days' + INTERVAL '1 second'),
    ('ketoantruong@mwconnect.vn', 'LOGIN',           true,  NULL,                           'EMAIL', 'CHIEF_ACCOUNTANT',   '192.168.1.20', NOW() - INTERVAL '2 days')
) AS v(email, action, success, message, provider, role, ip_address, created_at)
LEFT JOIN public.user_profiles up ON up.email = v.email;


-- ── Voucher Audit Logs ───────────────────────────────────────────────────────
-- Simulate realistic CREATE / UPDATE / ISSUE / DELETE events linked to invoices
-- All user columns (user_id, user_email, user_name) use what exists in user_profiles

INSERT INTO public.voucher_audit_logs (
  user_id, user_email, user_name, action, entity_type, entity_id, entity_ref, detail, created_at
)
SELECT
  up.id,
  up.email,
  up.full_name,
  v.action,
  v.entity_type,
  si.id,
  si.voucher_number,
  v.detail,
  v.created_at
FROM (
  VALUES
    -- Sales invoices
    ('ketoantruong@mwconnect.vn', 'CREATE', 'SALES_INVOICE', 'Tạo hoá đơn bán hàng mới',             NOW() - INTERVAL '58 days'),
    ('ketoantruong@mwconnect.vn', 'UPDATE', 'SALES_INVOICE', 'Cập nhật số lượng dòng hàng',           NOW() - INTERVAL '57 days'),
    ('ketoantruong@mwconnect.vn', 'ISSUE',  'SALES_INVOICE', 'Phát hành hoá đơn',                     NOW() - INTERVAL '56 days'),
    ('ketoanvien@mwconnect.vn',   'CREATE', 'SALES_INVOICE', 'Tạo hoá đơn bán hàng mới',             NOW() - INTERVAL '50 days'),
    ('ketoanvien@mwconnect.vn',   'ISSUE',  'SALES_INVOICE', 'Phát hành hoá đơn',                     NOW() - INTERVAL '49 days'),
    ('ketoanvien@mwconnect.vn',   'CREATE', 'SALES_INVOICE', 'Tạo hoá đơn bán hàng mới',             NOW() - INTERVAL '42 days'),
    ('ketoanvien@mwconnect.vn',   'UPDATE', 'SALES_INVOICE', 'Điều chỉnh giảm giá',                   NOW() - INTERVAL '41 days'),
    ('ketoanvien@mwconnect.vn',   'ISSUE',  'SALES_INVOICE', 'Phát hành hoá đơn',                     NOW() - INTERVAL '40 days'),
    ('ketoantruong@mwconnect.vn', 'CREATE', 'SALES_INVOICE', 'Tạo hoá đơn bán hàng mới',             NOW() - INTERVAL '35 days'),
    ('ketoantruong@mwconnect.vn', 'ISSUE',  'SALES_INVOICE', 'Phát hành hoá đơn',                     NOW() - INTERVAL '34 days'),
    ('ketoanvien@mwconnect.vn',   'CREATE', 'SALES_INVOICE', 'Tạo hoá đơn bán hàng mới',             NOW() - INTERVAL '28 days'),
    ('ketoanvien@mwconnect.vn',   'UPDATE', 'SALES_INVOICE', 'Cập nhật ngày đáo hạn',                 NOW() - INTERVAL '27 days'),
    ('ketoanvien@mwconnect.vn',   'ISSUE',  'SALES_INVOICE', 'Phát hành hoá đơn',                     NOW() - INTERVAL '26 days'),
    ('ketoantruong@mwconnect.vn', 'CREATE', 'SALES_INVOICE', 'Tạo hoá đơn bán hàng mới',             NOW() - INTERVAL '20 days'),
    ('ketoantruong@mwconnect.vn', 'ISSUE',  'SALES_INVOICE', 'Phát hành hoá đơn',                     NOW() - INTERVAL '19 days'),
    -- Purchase invoices
    ('ketoantruong@mwconnect.vn', 'CREATE', 'PURCHASE_INVOICE', 'Nhập hoá đơn mua hàng từ NCC',      NOW() - INTERVAL '55 days'),
    ('ketoantruong@mwconnect.vn', 'UPDATE', 'PURCHASE_INVOICE', 'Cập nhật điều khoản thanh toán',    NOW() - INTERVAL '54 days'),
    ('ketoanvien@mwconnect.vn',   'CREATE', 'PURCHASE_INVOICE', 'Nhập hoá đơn mua hàng từ NCC',      NOW() - INTERVAL '45 days'),
    ('ketoanvien@mwconnect.vn',   'UPDATE', 'PURCHASE_INVOICE', 'Sửa VAT đầu vào',                   NOW() - INTERVAL '44 days'),
    ('ketoantruong@mwconnect.vn', 'CREATE', 'PURCHASE_INVOICE', 'Nhập hoá đơn mua hàng từ NCC',      NOW() - INTERVAL '25 days'),
    -- Receipts
    ('ketoanvien@mwconnect.vn',   'CREATE', 'RECEIPT', 'Tạo phiếu thu tiền khách hàng',              NOW() - INTERVAL '48 days'),
    ('ketoantruong@mwconnect.vn', 'CREATE', 'RECEIPT', 'Tạo phiếu thu tiền khách hàng',              NOW() - INTERVAL '32 days'),
    ('ketoanvien@mwconnect.vn',   'CREATE', 'RECEIPT', 'Tạo phiếu thu tiền khách hàng',              NOW() - INTERVAL '18 days'),
    -- Payments
    ('ketoantruong@mwconnect.vn', 'CREATE', 'PAYMENT', 'Tạo phiếu chi thanh toán NCC',               NOW() - INTERVAL '52 days'),
    ('ketoanvien@mwconnect.vn',   'CREATE', 'PAYMENT', 'Tạo phiếu chi thanh toán NCC',               NOW() - INTERVAL '22 days'),
    ('ketoantruong@mwconnect.vn', 'UPDATE', 'PAYMENT', 'Cập nhật số tài khoản ngân hàng',            NOW() - INTERVAL '21 days'),
    -- Recent activity
    ('ketoanvien@mwconnect.vn',   'CREATE', 'SALES_INVOICE', 'Tạo hoá đơn bán hàng mới',             NOW() - INTERVAL '7 days'),
    ('ketoanvien@mwconnect.vn',   'ISSUE',  'SALES_INVOICE', 'Phát hành hoá đơn',                     NOW() - INTERVAL '6 days'),
    ('ketoantruong@mwconnect.vn', 'CREATE', 'SALES_INVOICE', 'Tạo hoá đơn bán hàng mới',             NOW() - INTERVAL '4 days'),
    ('ketoantruong@mwconnect.vn', 'ISSUE',  'SALES_INVOICE', 'Phát hành hoá đơn',                     NOW() - INTERVAL '3 days')
) AS v(user_email, action, entity_type, detail, created_at)
LEFT JOIN public.user_profiles up ON up.email = v.user_email
-- Pick a random issued sales invoice for SALES_INVOICE rows to fill entity_id/ref
LEFT JOIN LATERAL (
  SELECT id, voucher_number
  FROM public.sales_invoices
  WHERE v.entity_type = 'SALES_INVOICE'
  ORDER BY RANDOM()
  LIMIT 1
) si ON v.entity_type = 'SALES_INVOICE';
