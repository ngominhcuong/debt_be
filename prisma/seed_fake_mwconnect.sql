-- Fake seed data for MWCONNECT VIETNAM COMPANY LIMITED
-- Industry: Manufacturing motors, generators, transformers, electrical distribution and control equipment
-- Idempotent: safe to run multiple times

WITH account_map AS (
  SELECT code, id
  FROM public.accounts
  WHERE code IN ('511', '632', '152', '156')
),
partner_seed (
  code,
  name,
  partner_type,
  tax_code,
  phone,
  email,
  address,
  payment_term_days,
  credit_limit,
  is_active,
  debt_reminder_on,
  reminder_email,
  reminder_cc_emails
) AS (
  VALUES
    ('KH00001', 'Công ty Cổ phần Điện lực Miền Nam', 'CUSTOMER', '0312345678', '028-3822-1001', 'congno@dienlucmiennam.vn', 'Tòa nhà EVN, Quận 1, TP. Hồ Chí Minh', 30, 3500000000::numeric, true, true, 'congno@dienlucmiennam.vn', '["ketoan@dienlucmiennam.vn"]'::jsonb),
    ('KH00002', 'Công ty TNHH Thiết bị Tự động Hưng Phát', 'CUSTOMER', '0312345679', '028-3822-1002', 'accounting@hungphatauto.vn', 'KCN Tân Bình, TP. Hồ Chí Minh', 45, 2200000000::numeric, true, true, 'accounting@hungphatauto.vn', '["purchasing@hungphatauto.vn"]'::jsonb),
    ('KH00003', 'Công ty Cổ phần Cơ điện Hải Đăng', 'CUSTOMER', '0312345680', '024-3761-2201', 'ap@haidungme.vn', 'Cầu Giấy, Hà Nội', 30, 1800000000::numeric, true, true, 'ap@haidungme.vn', '["finance@haidungme.vn"]'::jsonb),
    ('KH00004', 'Công ty TNHH Năng lượng Xanh An Phú', 'CUSTOMER', '0312345681', '028-3822-1004', 'finance@anphugreen.vn', 'TP. Thủ Đức, TP. Hồ Chí Minh', 60, 4200000000::numeric, true, true, 'finance@anphugreen.vn', '["ceo.office@anphugreen.vn"]'::jsonb),
    ('KH00005', 'Công ty Cổ phần Tủ điện Việt Thành', 'CUSTOMER', '0312345682', '028-3822-1005', 'debt@vietthanhpanel.vn', 'KCN Sóng Thần, Bình Dương', 30, 1500000000::numeric, true, true, 'debt@vietthanhpanel.vn', '["ketoantruong@vietthanhpanel.vn"]'::jsonb),
    ('KH00006', 'Công ty TNHH Robot Công nghiệp Hòa Bình', 'CUSTOMER', '0312345683', '0225-3688-901', 'finance@hoabinh-robot.vn', 'Quận Hồng Bàng, Hải Phòng', 45, 2000000000::numeric, true, true, 'finance@hoabinh-robot.vn', '["procurement@hoabinh-robot.vn"]'::jsonb),

    ('NCC00001', 'Công ty TNHH Đồng Việt Metal', 'SUPPLIER', '0312345684', '028-3822-2001', 'ar@dongvietmetal.vn', 'KCN Biên Hòa 2, Đồng Nai', 20, 900000000::numeric, true, true, 'ar@dongvietmetal.vn', '["sales@dongvietmetal.vn"]'::jsonb),
    ('NCC00002', 'Công ty Cổ phần Thép Silic Đông Á', 'SUPPLIER', '0312345685', '028-3822-2002', 'debt@dongasilic.vn', 'Dĩ An, Bình Dương', 15, 1200000000::numeric, true, false, null, '[]'::jsonb),
    ('NCC00003', 'Công ty TNHH Ổ bi Kỹ thuật Toàn Cầu', 'SUPPLIER', '0312345686', '024-3761-3301', 'accounting@globalbearing.vn', 'Long Biên, Hà Nội', 30, 750000000::numeric, true, false, null, '[]'::jsonb),
    ('NCC00004', 'Công ty Cổ phần Sơn cách điện Việt Nhật', 'SUPPLIER', '0312345687', '028-3822-2004', 'debt@vjinsulation.vn', 'KCN VSIP 1, Bình Dương', 25, 680000000::numeric, true, false, null, '[]'::jsonb),
    ('NCC00005', 'Công ty TNHH Thiết bị đo lường Nam Việt', 'SUPPLIER', '0312345688', '028-3822-2005', 'ar@namviet-instrument.vn', 'Quận 7, TP. Hồ Chí Minh', 30, 500000000::numeric, true, false, null, '[]'::jsonb),

    ('DT00001', 'Công ty Cổ phần Kỹ nghệ Điện SmartGrid', 'BOTH', '0312345689', '028-3822-3001', 'finance@smartgrid.vn', 'Quận 3, TP. Hồ Chí Minh', 30, 1300000000::numeric, true, true, 'finance@smartgrid.vn', '["admin@smartgrid.vn"]'::jsonb)
),
upsert_partners AS (
  INSERT INTO public.partners (
    code,
    name,
    partner_type,
    tax_code,
    phone,
    email,
    address,
    payment_term_days,
    credit_limit,
    is_active,
    debt_reminder_on,
    reminder_email,
    reminder_cc_emails,
    created_at,
    updated_at
  )
  SELECT
    code,
    name,
    partner_type::public."PartnerType",
    tax_code,
    phone,
    email,
    address,
    payment_term_days,
    credit_limit,
    is_active,
    debt_reminder_on,
    reminder_email,
    reminder_cc_emails,
    now(),
    now()
  FROM partner_seed
  ON CONFLICT (code)
  DO UPDATE SET
    name = EXCLUDED.name,
    partner_type = EXCLUDED.partner_type,
    tax_code = EXCLUDED.tax_code,
    phone = EXCLUDED.phone,
    email = EXCLUDED.email,
    address = EXCLUDED.address,
    payment_term_days = EXCLUDED.payment_term_days,
    credit_limit = EXCLUDED.credit_limit,
    is_active = EXCLUDED.is_active,
    debt_reminder_on = EXCLUDED.debt_reminder_on,
    reminder_email = EXCLUDED.reminder_email,
    reminder_cc_emails = EXCLUDED.reminder_cc_emails,
    updated_at = now()
  RETURNING code
),
item_seed (
  sku,
  name,
  item_type,
  unit,
  sale_price,
  purchase_price,
  vat_rate,
  inventory_account_code,
  is_tracked_inventory,
  is_active,
  description
) AS (
  VALUES
    ('MH00001', 'Mô tơ AC 3 pha 0.75kW', 'GOODS', 'Cái', 1850000::numeric, 1380000::numeric, 10::numeric, '156', true, true, 'Mô tơ dùng cho băng tải và máy đóng gói công nghiệp nhẹ'),
    ('MH00002', 'Mô tơ AC 3 pha 1.5kW', 'GOODS', 'Cái', 2450000::numeric, 1860000::numeric, 10::numeric, '156', true, true, 'Mô tơ tiêu chuẩn IE2 cho tủ điện và hệ thống quạt công nghiệp'),
    ('MH00003', 'Mô tơ AC 3 pha 2.2kW', 'GOODS', 'Cái', 3200000::numeric, 2420000::numeric, 10::numeric, '156', true, true, 'Mô tơ cho dây chuyền sản xuất tự động'),
    ('MH00004', 'Máy phát điện mini 5kVA', 'GOODS', 'Bộ', 19500000::numeric, 16200000::numeric, 10::numeric, '156', true, true, 'Máy phát điện dự phòng cho nhà xưởng nhỏ'),
    ('MH00005', 'Biến thế khô 3 pha 250kVA', 'GOODS', 'Bộ', 84500000::numeric, 71200000::numeric, 10::numeric, '156', true, true, 'Biến áp phân phối cho tủ trung thế'),
    ('MH00006', 'Tủ phân phối điện hạ thế MDB', 'GOODS', 'Tủ', 42000000::numeric, 33500000::numeric, 10::numeric, '156', true, true, 'Tủ điện tổng cho nhà máy và tòa nhà thương mại'),
    ('MH00007', 'Bộ điều khiển động cơ mềm Soft Starter', 'GOODS', 'Bộ', 11800000::numeric, 9300000::numeric, 10::numeric, '156', true, true, 'Khởi động mềm cho động cơ công suất trung bình'),
    ('MH00008', 'Dây đồng quấn stator 1.2mm', 'MATERIAL', 'Kg', 295000::numeric, 240000::numeric, 10::numeric, '152', true, true, 'Nguyên liệu chính cho quấn stator mô tơ'),
    ('MH00009', 'Lá thép silic EI', 'MATERIAL', 'Kg', 98000::numeric, 76000::numeric, 10::numeric, '152', true, true, 'Vật liệu lõi từ cho mô tơ và biến thế'),
    ('MH00010', 'Ổ bi NSK 6205', 'MATERIAL', 'Cái', 98000::numeric, 76000::numeric, 10::numeric, '152', true, true, 'Linh kiện ổ bi cho mô tơ AC 3 pha'),
    ('MH00011', 'Sơn cách điện cấp F', 'MATERIAL', 'Lít', 165000::numeric, 128000::numeric, 10::numeric, '152', true, true, 'Vật tư tẩm sơn cuộn dây mô tơ'),
    ('MH00012', 'Dịch vụ bảo trì mô tơ định kỳ', 'SERVICE', 'Lần', 2500000::numeric, 1400000::numeric, 10::numeric, null, false, true, 'Bảo trì, kiểm tra, vệ sinh và cân chỉnh mô tơ tại nhà máy'),
    ('MH00013', 'Dịch vụ sửa chữa tủ điện công nghiệp', 'SERVICE', 'Lần', 4200000::numeric, 2500000::numeric, 10::numeric, null, false, true, 'Xử lý sự cố tủ điện và thay thế linh kiện hư hỏng'),
    ('MH00014', 'Bộ cảm biến nhiệt cuộn dây PT100', 'OTHER', 'Bộ', 620000::numeric, 470000::numeric, 10::numeric, '156', true, true, 'Phụ kiện giám sát nhiệt độ cuộn dây động cơ'),
    ('MH00015', 'Module điều khiển PLC mini', 'OTHER', 'Bộ', 3500000::numeric, 2680000::numeric, 10::numeric, '156', true, true, 'Thiết bị điều khiển cho dây chuyền phân phối điện')
)
INSERT INTO public.items (
  sku,
  name,
  item_type,
  unit,
  sale_price,
  purchase_price,
  vat_rate,
  revenue_account_id,
  cogs_account_id,
  inventory_account_id,
  is_tracked_inventory,
  is_active,
  description,
  created_at,
  updated_at
)
SELECT
  s.sku,
  s.name,
  s.item_type::public."ItemType",
  s.unit,
  s.sale_price,
  s.purchase_price,
  s.vat_rate,
  (SELECT id FROM account_map WHERE code = '511'),
  (SELECT id FROM account_map WHERE code = '632'),
  CASE
    WHEN s.inventory_account_code IS NULL THEN NULL
    ELSE (SELECT id FROM account_map WHERE code = s.inventory_account_code)
  END,
  s.is_tracked_inventory,
  s.is_active,
  s.description,
  now(),
  now()
FROM item_seed s
ON CONFLICT (sku)
DO UPDATE SET
  name = EXCLUDED.name,
  item_type = EXCLUDED.item_type,
  unit = EXCLUDED.unit,
  sale_price = EXCLUDED.sale_price,
  purchase_price = EXCLUDED.purchase_price,
  vat_rate = EXCLUDED.vat_rate,
  revenue_account_id = EXCLUDED.revenue_account_id,
  cogs_account_id = EXCLUDED.cogs_account_id,
  inventory_account_id = EXCLUDED.inventory_account_id,
  is_tracked_inventory = EXCLUDED.is_tracked_inventory,
  is_active = EXCLUDED.is_active,
  description = EXCLUDED.description,
  updated_at = now();
