-- ============================================================
-- WEBSITE TRUNG TÂM CUNG ỨNG DỊCH VỤ CÔNG PHƯỜNG PHÚ THẠNH
-- CẤU TRÚC CƠ SỞ DỮ LIỆU POSTGRESQL
-- ============================================================
--
-- HƯỚNG DẪN TRIỂN KHAI LÊN HOSTING MẮT BÃO:
--
-- 1. Đăng nhập vào cPanel / phpPgAdmin / pgAdmin trên hosting Mắt Bão.
-- 2. Tạo một database mới, ví dụ: ttcudvc_phuthanh
-- 3. Mở trình soạn thảo SQL (phpPgAdmin → SQL tab, hoặc psql).
-- 4. Copy TOÀN BỘ nội dung file này, paste và chạy (Execute).
-- 5. Cập nhật chuỗi kết nối DATABASE_URL trong file .env của backend API:
--    postgresql://user:password@localhost:5432/ttcudvc_phuthanh
--
-- Lược đồ dùng cú pháp PostgreSQL 12+ tiêu chuẩn.
-- ============================================================

-- ============================================================
-- 1. BẢNG CÀI ĐẶT HỆ THỐNG (system_settings)
-- ============================================================
CREATE TABLE IF NOT EXISTS system_settings (
    id           SERIAL PRIMARY KEY DEFAULT 1,
    org_name     TEXT NOT NULL DEFAULT '',
    org_name_2   TEXT NOT NULL DEFAULT '',
    slogan       TEXT NOT NULL DEFAULT '',
    hotline      TEXT NOT NULL DEFAULT '',
    hotline_note TEXT NOT NULL DEFAULT '',
    email        TEXT NOT NULL DEFAULT '',
    website      TEXT NOT NULL DEFAULT '',
    address      TEXT NOT NULL DEFAULT '',
    address_2    TEXT NOT NULL DEFAULT '',
    facebook_url TEXT NOT NULL DEFAULT '',
    zalo_url     TEXT NOT NULL DEFAULT '',
    dvc_url      TEXT NOT NULL DEFAULT '',
    ubnd_url     TEXT NOT NULL DEFAULT '',
    alert_text   TEXT NOT NULL DEFAULT '',
    is_alert_active BOOLEAN NOT NULL DEFAULT FALSE,
    welcome_text   TEXT NOT NULL DEFAULT '',
    admin_password TEXT NOT NULL DEFAULT 'admin123',
    CONSTRAINT single_row CHECK (id = 1)
);

-- ============================================================
-- 2. BẢNG DANH MỤC (categories)
-- ============================================================
CREATE TABLE IF NOT EXISTS categories (
    id        SERIAL PRIMARY KEY,
    slug      TEXT NOT NULL UNIQUE,
    name      TEXT NOT NULL,
    color_var TEXT NOT NULL DEFAULT 'var(--color-brand)',
    bullets   TEXT[] NOT NULL DEFAULT '{}',
    image     TEXT NOT NULL DEFAULT ''
);

-- ============================================================
-- 3. BẢNG BÀI VIẾT / TIN TỨC (posts)
-- ============================================================
CREATE TABLE IF NOT EXISTS posts (
    id          SERIAL PRIMARY KEY,
    slug        TEXT NOT NULL UNIQUE,
    title       TEXT NOT NULL,
    excerpt     TEXT NOT NULL DEFAULT '',
    body        TEXT[] NOT NULL DEFAULT '{}',
    category    TEXT NOT NULL DEFAULT '',
    audience    TEXT NOT NULL DEFAULT 'Tất cả',
    date        TEXT NOT NULL,
    image       TEXT NOT NULL DEFAULT '',
    location    TEXT NOT NULL DEFAULT '',
    attachments JSONB NOT NULL DEFAULT '[]',
    featured    BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_posts_slug      ON posts (slug);
CREATE INDEX IF NOT EXISTS idx_posts_category  ON posts (category);
CREATE INDEX IF NOT EXISTS idx_posts_featured ON posts (featured);

-- ============================================================
-- 4. BẢNG SỰ KIỆN (events)
-- ============================================================
CREATE TABLE IF NOT EXISTS events (
    id    SERIAL PRIMARY KEY,
    day   INTEGER NOT NULL,
    month INTEGER NOT NULL,
    title TEXT NOT NULL,
    time  TEXT NOT NULL DEFAULT '',
    place TEXT NOT NULL DEFAULT ''
);

-- ============================================================
-- 5. BẢNG HÌNH ẢNH ĐẲNG CẤP (honor_slides)
-- ============================================================
CREATE TABLE IF NOT EXISTS honor_slides (
    id       SERIAL PRIMARY KEY,
    title    TEXT NOT NULL,
    subtitle TEXT NOT NULL DEFAULT '',
    image    TEXT NOT NULL DEFAULT ''
);

-- ============================================================
-- 6. BẢNG DỊCH VỤ CÔNG (public_services)
-- ============================================================
CREATE TABLE IF NOT EXISTS public_services (
    id   SERIAL PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT ''
);

-- ============================================================
-- 7. BẢNG CHUYÊN ĐỀ (thematics)
-- ============================================================
CREATE TABLE IF NOT EXISTS thematics (
    id    SERIAL PRIMARY KEY,
    slug  TEXT NOT NULL UNIQUE,
    name  TEXT NOT NULL,
    description  TEXT NOT NULL DEFAULT '',
    image TEXT NOT NULL DEFAULT ''
);

-- ============================================================
-- 8. BẢNG THƯ VIỆN — ẢNH (media_images)
-- ============================================================
CREATE TABLE IF NOT EXISTS media_images (
    id    SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    image TEXT NOT NULL DEFAULT '',
    date  TEXT NOT NULL DEFAULT ''
);

-- ============================================================
-- 9. BẢNG THƯ VIỆN — VIDEO (media_videos)
-- ============================================================
CREATE TABLE IF NOT EXISTS media_videos (
    id        SERIAL PRIMARY KEY,
    title     TEXT NOT NULL,
    source    TEXT NOT NULL DEFAULT 'YouTube',
    embed_url TEXT NOT NULL DEFAULT '',
    date      TEXT NOT NULL DEFAULT ''
);

-- ============================================================
-- 10. BẢNG THƯ VIỆN — TÀI LIỆU (media_documents)
-- ============================================================
CREATE TABLE IF NOT EXISTS media_documents (
    id    SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    type  TEXT NOT NULL DEFAULT 'PDF',
    size  TEXT NOT NULL DEFAULT '',
    date  TEXT NOT NULL DEFAULT ''
);

-- ============================================================
-- 11. BẢNG THĂM DÒ Ý KIẾN (poll_options)
-- ============================================================
CREATE TABLE IF NOT EXISTS poll_options (
    id    SERIAL PRIMARY KEY,
    label TEXT NOT NULL,
    value INTEGER NOT NULL DEFAULT 0,
    color TEXT NOT NULL DEFAULT 'var(--color-brand)'
);

-- ============================================================
-- 12. BẢNG LIÊN HỆ / GÓP Ý (contacts)
-- ============================================================
CREATE TABLE IF NOT EXISTS contacts (
    id         SERIAL PRIMARY KEY,
    name       TEXT NOT NULL,
    phone      TEXT NOT NULL DEFAULT '',
    email      TEXT NOT NULL DEFAULT '',
    topic      TEXT NOT NULL DEFAULT '',
    message    TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- DỮ LIỆU MẪU BAN ĐẦU
-- ============================================================

INSERT INTO system_settings (id, org_name, org_name_2, slogan, hotline, hotline_note, email, website, address, address_2, facebook_url, zalo_url, dvc_url, ubnd_url, alert_text, is_alert_active, welcome_text, admin_password)
VALUES (1, 'Trung tâm Cung ứng dịch vụ công', 'Phường Phú Thạnh', 'Tận tâm phục vụ - Kết nối phát triển', '028 3979 7935', '(Giờ hành chính)', 'ttcudvcphuthanh@tphcm.gov.vn', 'ttcudvcphuthanh.gov.vn', '151 Lũy Bán Bích, Phường Phú Thạnh', 'Thành phố Hồ Chí Minh', 'https://www.facebook.com/', 'https://zalo.me/', 'https://dichvucong.gov.vn/', 'https://tphcm.gov.vn/', 'THÔNG BÁO KHẨN: Điều chỉnh lịch tiếp nhận hồ sơ tại Trung tâm trong thời gian bảo trì hệ thống, từ ngày 20/6/2026 đến 22/6/2026 — Người dân vui lòng liên hệ hotline 028 3979 7935 để được hướng dẫn.', TRUE, 'Chào mừng bạn đến với Website Trung tâm Cung ứng dịch vụ công phường Phú Thạnh', 'admin123')
ON CONFLICT (id) DO NOTHING;

INSERT INTO categories (id, slug, name, color_var, bullets, image) VALUES
(1, 'van-hoa-van-nghe',   'Văn hóa - Văn nghệ',  'var(--color-cat-vanhoa)',   ARRAY['Hội thi, hội diễn','Câu lạc bộ','Lớp năng khiếu','Hoạt động văn hóa'], '/src/assets/hero-vanhoa.jpg'),
(2, 'the-duc-the-thao',   'Thể dục thể thao',    'var(--color-cat-thethao)',  ARRAY['Giải đấu','Hoạt động thể thao','Câu lạc bộ thể thao','Thể thao cộng đồng'], '/src/assets/hero-thethao.jpg'),
(3, 'moi-truong',         'Môi trường',          'var(--color-cat-moitruong)', ARRAY['Chủ nhật xanh','Bảo vệ môi trường','Phân loại rác thải','Công trình môi trường'], '/src/assets/hero-moitruong.jpg'),
(4, 'do-thi-van-minh',    'Đô thị văn minh',     'var(--color-cat-dothi)',    ARRAY['Tuyến hẻm văn minh','Chiếu sáng thông minh','Nếp sống văn minh','An toàn đô thị'], '/src/assets/hero-dothi.jpg'),
(5, 'thong-bao',          'Thông báo',           'var(--color-cat-thongbao)', ARRAY['Thông báo của Trung tâm','Lịch tiếp công dân','Văn bản mới'], '/src/assets/news-hoinghi.jpg')
ON CONFLICT (id) DO NOTHING;

INSERT INTO posts (id, slug, title, excerpt, body, category, audience, date, image, location, attachments, featured) VALUES
(1, 'trien-khai-nhiem-vu-trong-tam-6-thang-cuoi-nam-2026', 'Trung tâm Cung ứng dịch vụ công phường Phú Thạnh triển khai nhiệm vụ trọng tâm 6 tháng cuối năm 2026', 'Hội nghị sơ kết đã đánh giá kết quả hoạt động 6 tháng đầu năm và xác định các nhiệm vụ trọng tâm về chuyển đổi số, cải cách hành chính, phục vụ người dân trong 6 tháng cuối năm 2026.', ARRAY['Sáng ngày 15/6/2026, Trung tâm Cung ứng dịch vụ công phường Phú Thạnh tổ chức Hội nghị sơ kết hoạt động 6 tháng đầu năm và triển khai nhiệm vụ trọng tâm 6 tháng cuối năm 2026.','Hội nghị tập trung đánh giá kết quả tổ chức các hoạt động văn hóa - văn nghệ, thể dục thể thao, môi trường - đô thị, quản lý khai thác Chợ Hiệp Tân và hoạt động thư viện; đồng thời thống nhất các giải pháp đẩy mạnh ứng dụng công nghệ thông tin, chuyển đổi số trong công tác quản lý, điều hành và truyền thông.','Trung tâm xác định tiếp tục nâng cao chất lượng phục vụ người dân, tổ chức và doanh nghiệp, xây dựng hình ảnh chính quyền thân thiện, hiện đại, công khai, minh bạch.'], 'Thông báo', 'Tất cả', '15/06/2026', '/src/assets/news-hoinghi.jpg', '151 Lũy Bán Bích, Phường Phú Thạnh, Thành phố Hồ Chí Minh', '[{"name":"Ke-hoach-nhiem-vu-6-thang-cuoi-nam-2026.pdf","type":"PDF","size":"1,2 MB"},{"name":"Phan-cong-nhiem-vu-cac-bo-phan.docx","type":"Word","size":"320 KB"}]', TRUE),
(2, 'dem-thi-thu-hai-hoi-thi-van-nghe-2026', 'Phường Phú Thạnh sôi nổi Đêm thi thứ hai Hội thi Văn nghệ chào mừng các ngày lễ lớn năm 2026', 'Đêm thi thứ hai quy tụ các đội văn nghệ đến từ các khu phố với nhiều tiết mục ca, múa, nhạc đặc sắc, thu hút đông đảo người dân đến cổ vũ.', ARRAY['Tối 14/6/2026, tại Nhà Văn hóa phường Phú Thạnh đã diễn ra Đêm thi thứ hai Hội thi Văn nghệ chào mừng các ngày lễ lớn năm 2026.','Các tiết mục dự thi được dàn dựng công phu, ca ngợi Đảng, Bác Hồ, quê hương đất nước và những đổi mới của phường Phú Thạnh trong công cuộc xây dựng đô thị văn minh.'], 'Văn hóa - Văn nghệ', 'Tất cả', '14/06/2026', '/src/assets/hero-vanhoa.jpg', 'Nhà Văn hóa phường Phú Thạnh', '[]', TRUE),
(3, 'chuyen-doi-he-thong-chieu-sang-thong-minh', 'Chuyển đổi hệ thống chiếu sáng thông minh ở phường Phú Thạnh', 'Các tuyến đường, tuyến hẻm trên địa bàn phường từng bước được thay thế bằng hệ thống đèn LED tiết kiệm năng lượng, điều khiển tập trung.', ARRAY['Việc chuyển đổi hệ thống chiếu sáng thông minh góp phần tiết kiệm điện năng, nâng cao an toàn giao thông và an ninh trật tự trong khu dân cư.','Người dân được khuyến khích phản ánh các vị trí đèn hư hỏng thông qua chuyên mục Liên hệ - Góp ý trên Website của Trung tâm.'], 'Đô thị văn minh', 'Tất cả', '15/06/2026', '/src/assets/hero-dothi.jpg', '', '[]', TRUE),
(4, 'chu-nhat-xanh-thang-6-2026', 'Ra quân Chủ nhật xanh, xóa các điểm tồn đọng rác thải trên địa bàn phường', 'Hơn 150 đoàn viên, hội viên và người dân đã tham gia tổng vệ sinh, trồng cây xanh và tuyên truyền phân loại rác tại nguồn.', ARRAY['Hoạt động Chủ nhật xanh được tổ chức định kỳ nhằm nâng cao ý thức bảo vệ môi trường của người dân trên địa bàn phường Phú Thạnh.'], 'Môi trường', 'Thanh niên', '08/06/2026', '/src/assets/hero-moitruong.jpg', 'Khu phố 5, Phường Phú Thạnh', '[]', FALSE),
(5, 'hoi-thao-phuong-phu-thanh-2026', 'Khởi tranh Hội thao phường Phú Thạnh năm 2026 với 6 môn thi đấu', 'Hội thao thu hút gần 400 vận động viên tham gia tranh tài ở các môn bóng đá, bóng bàn, cầu lông, kéo co, việt dã và cờ tướng.', ARRAY['Hội thao là hoạt động thường niên nhằm đẩy mạnh phong trào Toàn dân rèn luyện thân thể theo gương Bác Hồ vĩ đại.'], 'Thể dục thể thao', 'Tất cả', '05/06/2026', '/src/assets/hero-thethao.jpg', 'Sân vận động phường Phú Thạnh', '[]', FALSE),
(6, 'khong-gian-van-hoa-ho-chi-minh-tai-thu-vien', 'Không gian văn hóa Hồ Chí Minh tại Thư viện phường thu hút bạn đọc', 'Không gian trưng bày hơn 300 tư liệu, hình ảnh, sách về cuộc đời và sự nghiệp của Chủ tịch Hồ Chí Minh.', ARRAY['Không gian văn hóa Hồ Chí Minh là nơi sinh hoạt chính trị, học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh của cán bộ, đảng viên và người dân phường Phú Thạnh.'], 'Văn hóa - Văn nghệ', 'Tất cả', '02/06/2026', '/src/assets/khong-gian-hcm.jpg', 'Thư viện phường Phú Thạnh', '[]', FALSE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id, day, month, title, time, place) VALUES
(1, 20, 6, 'Khai giảng các lớp năng khiếu hè năm 2026', '07:30', 'Nhà Thiếu nhi Phú Thạnh'),
(2, 25, 6, 'Hội thao phường Phú Thạnh năm 2026', '07:00', 'Sân vận động Phú Thạnh'),
(3, 30, 6, 'Chương trình văn nghệ chào mừng tháng hành động vì môi trường', '19:00', 'Nhà Văn hóa Phú Thạnh')
ON CONFLICT (id) DO NOTHING;

INSERT INTO honor_slides (id, title, subtitle, image) VALUES
(1, 'Đội văn nghệ Khu phố 3',   'Giải Nhất Hội thi Văn nghệ phường Phú Thạnh năm 2026', '/src/assets/hero-vanhoa.jpg'),
(2, 'Chi hội Phụ nữ Khu phố 7', 'Tập thể xuất sắc trong phong trào Chủ nhật xanh',     '/src/assets/hero-moitruong.jpg'),
(3, 'Câu lạc bộ Bóng đá Thanh niên', 'Gương điển hình phong trào thể dục thể thao cơ sở', '/src/assets/hero-thethao.jpg'),
(4, 'Hộ gia đình văn hóa tiêu biểu',  'Chung tay xây dựng tuyến hẻm văn minh, sáng - xanh - sạch', '/src/assets/hero-dothi.jpg')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public_services (id, slug, name, description) VALUES
(1, 'van-hoa-du-lich',       'Văn hóa - Du lịch', 'Tổ chức hội thi, hội diễn, lớp năng khiếu, giới thiệu điểm đến trên địa bàn phường.'),
(2, 'the-duc-the-thao',      'Thể dục, thể thao',  'Giải đấu phong trào, cho thuê sân bãi, hướng dẫn tập luyện, câu lạc bộ thể thao.'),
(3, 'thong-tin-truyen-thong','Thông tin - Truyền thông', 'Tuyên truyền cổ động, sản xuất tin bài, hình ảnh, video phục vụ nhiệm vụ chính trị.'),
(4, 'moi-truong-do-thi',     'Môi trường - Đô thị', 'Vệ sinh môi trường, phân loại rác tại nguồn, chỉnh trang, chiếu sáng khu dân cư.'),
(5, 'cho-hiep-tan',          'Quản lý, khai thác Chợ Hiệp Tân', 'Đăng ký sạp, hợp đồng khai thác, vệ sinh an toàn thực phẩm, an toàn phòng cháy.'),
(6, 'cau-lac-bo',            'Hoạt động câu lạc bộ, đội, nhóm', 'Thành lập, hướng dẫn sinh hoạt các câu lạc bộ, đội, nhóm theo lứa tuổi và sở thích.'),
(7, 'thu-vien',              'Thư viện', 'Phục vụ bạn đọc, phòng đọc thiếu nhi, Không gian văn hóa Hồ Chí Minh, sách điện tử.'),
(8, 'dich-vu-khac',          'Dịch vụ khác', 'Các dịch vụ công do Trung tâm tổ chức thực hiện theo phân công của UBND phường.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO thematics (id, slug, name, description, image) VALUES
(1, 'diem-den-phu-thanh', 'Điểm đến phường Phú Thạnh', 'Giới thiệu các địa chỉ văn hóa, lịch sử, ẩm thực và không gian công cộng tiêu biểu.', '/src/assets/hero-dothi.jpg'),
(2, 'dinh-duong-suc-khoe', 'Dinh dưỡng - Sức khỏe', 'Cẩm nang dinh dưỡng, vận động và chăm sóc sức khỏe cho mọi lứa tuổi.', '/src/assets/hero-thethao.jpg'),
(3, 'chuyen-de-khac', 'Chuyên đề truyền thông khác', 'Chuyển đổi số, cải cách hành chính, an toàn thông tin, nếp sống văn minh đô thị.', '/src/assets/hero-moitruong.jpg')
ON CONFLICT (id) DO NOTHING;

INSERT INTO media_images (id, title, image, date) VALUES
(1, 'Hội thi Văn nghệ phường Phú Thạnh 2026', '/src/assets/hero-vanhoa.jpg', '14/06/2026'),
(2, 'Chủ nhật xanh tại Khu phố 5',           '/src/assets/hero-moitruong.jpg', '08/06/2026'),
(3, 'Hội thao phường Phú Thạnh 2026',        '/src/assets/hero-thethao.jpg', '05/06/2026'),
(4, 'Tuyến đường chiếu sáng thông minh',     '/src/assets/hero-dothi.jpg', '15/06/2026'),
(5, 'Hội nghị sơ kết 6 tháng đầu năm',       '/src/assets/news-hoinghi.jpg', '15/06/2026'),
(6, 'Không gian văn hóa Hồ Chí Minh',        '/src/assets/khong-gian-hcm.jpg', '02/06/2026')
ON CONFLICT (id) DO NOTHING;

INSERT INTO media_videos (id, title, source, embed_url, date) VALUES
(1, 'Phóng sự: Phú Thạnh chuyển đổi số phục vụ người dân', 'YouTube', 'https://www.youtube.com/embed/aqz-KE-bpKQ', '12/06/2026'),
(2, 'Clip tuyên truyền phân loại rác tại nguồn',           'YouTube', 'https://www.youtube.com/embed/ScMzIvxBSi4', '08/06/2026'),
(3, 'Ký sự: Không gian văn hóa Hồ Chí Minh tại Thư viện phường', 'Vimeo', 'https://player.vimeo.com/video/76979871', '02/06/2026')
ON CONFLICT (id) DO NOTHING;

INSERT INTO media_documents (id, title, type, size, date) VALUES
(1, 'Kế hoạch xây dựng và vận hành Website Trung tâm', 'PDF', '1,2 MB', '10/06/2026'),
(2, 'Quy chế hoạt động Website Trung tâm',             'PDF', '860 KB', '10/06/2026'),
(3, 'Biểu mẫu đăng ký sử dụng sân bãi thể dục thể thao','Word','245 KB', '05/06/2026'),
(4, 'Hướng dẫn phân loại rác tại nguồn (tờ gấp)',       'PDF', '3,4 MB', '01/06/2026')
ON CONFLICT (id) DO NOTHING;

INSERT INTO poll_options (id, label, value, color) VALUES
(1, 'Rất hài lòng',   62, 'var(--color-cat-moitruong)'),
(2, 'Hài lòng',       24, 'var(--color-brand)'),
(3, 'Bình thường',     9, 'var(--color-cat-dothi)'),
(4, 'Chưa hài lòng',   5, 'var(--color-cat-thongbao)')
ON CONFLICT (id) DO NOTHING;
