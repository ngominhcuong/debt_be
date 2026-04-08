WITH required_accounts AS (
  SELECT *
  FROM (
    VALUES
      ('111', 'Tiền mặt', 'ASSET', 'DEBIT', true, true, 111, 'Đối ứng công nợ bằng phiếu thu/chi tiền mặt'),
      ('112', 'Tiền gửi ngân hàng', 'ASSET', 'DEBIT', true, true, 112, 'Đối ứng công nợ qua chuyển khoản/ủy nhiệm chi'),
      ('131', 'Phải thu của khách hàng', 'ASSET', 'DEBIT', true, true, 131, 'Theo dõi chi tiết công nợ phải thu theo khách hàng'),
      ('1331', 'Thuế GTGT đầu vào được khấu trừ', 'ASSET', 'DEBIT', true, false, 1331, 'Thuế GTGT đầu vào phục vụ công nợ mua hàng'),
      ('1388', 'Phải thu khác', 'ASSET', 'DEBIT', true, true, 1388, 'Khoản phải thu khác ngoài bán hàng'),
      ('152', 'Nguyên liệu, vật liệu', 'ASSET', 'DEBIT', true, true, 152, 'Nguồn gốc phát sinh công nợ mua hàng theo lô vật tư'),
      ('156', 'Hàng hóa', 'ASSET', 'DEBIT', true, true, 156, 'Nguồn gốc phát sinh công nợ mua hàng theo lô hàng hóa'),
      ('331', 'Phải trả cho người bán', 'LIABILITY', 'CREDIT', true, true, 331, 'Theo dõi chi tiết công nợ phải trả theo nhà cung cấp'),
      ('3331', 'Thuế GTGT đầu ra phải nộp', 'LIABILITY', 'CREDIT', true, false, 3331, 'Thuế GTGT đầu ra gắn với công nợ bán hàng'),
      ('3388', 'Phải trả khác', 'LIABILITY', 'CREDIT', true, true, 3388, 'Khoản phải trả khác ngoài mua hàng'),
      ('511', 'Doanh thu bán hàng và cung cấp dịch vụ', 'REVENUE', 'CREDIT', true, true, 511, 'Nguồn gốc phát sinh phải thu khách hàng'),
      ('632', 'Giá vốn hàng bán', 'EXPENSE', 'DEBIT', true, true, 632, 'Chi phí giá vốn để xác định lợi nhuận đơn hàng có công nợ')
  ) AS t(code, name, account_type, normal_balance, is_posting, allow_manual_entry, sort_order, description)
),
upsert_required AS (
  INSERT INTO public.accounts (
    id,
    code,
    name,
    account_type,
    normal_balance,
    parent_id,
    level,
    is_posting,
    allow_manual_entry,
    is_active,
    sort_order,
    description,
    created_at,
    updated_at
  )
  SELECT
    gen_random_uuid(),
    r.code,
    r.name,
    r.account_type::"AccountType",
    r.normal_balance::"NormalBalance",
    NULL,
    1,
    r.is_posting,
    r.allow_manual_entry,
    true,
    r.sort_order,
    r.description,
    NOW(),
    NOW()
  FROM required_accounts r
  ON CONFLICT (code) DO UPDATE
  SET
    name = EXCLUDED.name,
    account_type = EXCLUDED.account_type,
    normal_balance = EXCLUDED.normal_balance,
    parent_id = NULL,
    level = 1,
    is_posting = EXCLUDED.is_posting,
    allow_manual_entry = EXCLUDED.allow_manual_entry,
    is_active = true,
    sort_order = EXCLUDED.sort_order,
    description = EXCLUDED.description,
    updated_at = NOW()
  RETURNING code
)
DELETE FROM public.accounts a
WHERE a.code NOT IN (SELECT code FROM required_accounts);
