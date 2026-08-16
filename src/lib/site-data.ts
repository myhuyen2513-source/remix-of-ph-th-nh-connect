import heroVanhoa from "@/assets/hero-vanhoa.jpg";
import heroMoitruong from "@/assets/hero-moitruong.jpg";
import heroThethao from "@/assets/hero-thethao.jpg";
import heroDothi from "@/assets/hero-dothi.jpg";
import newsHoinghi from "@/assets/news-hoinghi.jpg";
import khongGianHcm from "@/assets/khong-gian-hcm.jpg";

/**
 * Dữ liệu mẫu mô phỏng các bảng CSDL: system_settings, categories, posts,
 * events, media_items. Khi bật backend, các hàm đọc dữ liệu sẽ thay thế
 * các mảng tĩnh này (cấu trúc giữ nguyên để không phải sửa giao diện).
 */

export const systemSettings = {
  org_name: "Trung tâm Cung ứng dịch vụ công",
  org_name_2: "Phường Phú Thạnh",
  slogan: "Tận tâm phục vụ - Kết nối phát triển",
  hotline: "028 3979 7935",
  hotline_note: "(Giờ hành chính)",
  email: "ttcudvcphuthanh@tphcm.gov.vn",
  website: "ttcudvcphuthanh.gov.vn",
  address: "151 Lũy Bán Bích, Phường Phú Thạnh",
  address_2: "Thành phố Hồ Chí Minh",
  facebook_url: "https://www.facebook.com/",
  zalo_url: "https://zalo.me/",
  dvc_url: "https://dichvucong.gov.vn/",
  ubnd_url: "https://tphcm.gov.vn/",
  alert_text:
    "THÔNG BÁO KHẨN: Điều chỉnh lịch tiếp nhận hồ sơ tại Trung tâm trong thời gian bảo trì hệ thống, từ ngày 20/6/2026 đến 22/6/2026 — Người dân vui lòng liên hệ hotline 028 3979 7935 để được hướng dẫn.",
  is_alert_active: true,
  welcome_text:
    "Chào mừng bạn đến với Website Trung tâm Cung ứng dịch vụ công phường Phú Thạnh",
};

export type Category = {
  id: number;
  slug: string;
  name: string;
  colorVar: string;
  bullets: string[];
  image: string;
};

export const categories: Category[] = [
  {
    id: 1,
    slug: "van-hoa-van-nghe",
    name: "Văn hóa - Văn nghệ",
    colorVar: "var(--color-cat-vanhoa)",
    bullets: ["Hội thi, hội diễn", "Câu lạc bộ", "Lớp năng khiếu", "Hoạt động văn hóa"],
    image: heroVanhoa,
  },
  {
    id: 2,
    slug: "the-duc-the-thao",
    name: "Thể dục thể thao",
    colorVar: "var(--color-cat-thethao)",
    bullets: ["Giải đấu", "Hoạt động thể thao", "Câu lạc bộ thể thao", "Thể thao cộng đồng"],
    image: heroThethao,
  },
  {
    id: 3,
    slug: "moi-truong",
    name: "Môi trường",
    colorVar: "var(--color-cat-moitruong)",
    bullets: ["Chủ nhật xanh", "Bảo vệ môi trường", "Phân loại rác thải", "Công trình môi trường"],
    image: heroMoitruong,
  },
  {
    id: 4,
    slug: "do-thi-van-minh",
    name: "Đô thị văn minh",
    colorVar: "var(--color-cat-dothi)",
    bullets: ["Tuyến hẻm văn minh", "Chiếu sáng thông minh", "Nếp sống văn minh", "An toàn đô thị"],
    image: heroDothi,
  },
  {
    id: 5,
    slug: "thong-bao",
    name: "Thông báo",
    colorVar: "var(--color-cat-thongbao)",
    bullets: ["Thông báo của Trung tâm", "Lịch tiếp công dân", "Văn bản mới"],
    image: newsHoinghi,
  },
];

export type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  category: string;
  audience: "Tất cả" | "Thiếu nhi" | "Thanh niên" | "Người cao tuổi";
  date: string;
  image: string;
  location?: string;
  attachments?: { name: string; type: "PDF" | "Word"; size: string }[];
  featured?: boolean;
};

export const posts: Post[] = [
  {
    id: 1,
    slug: "trien-khai-nhiem-vu-trong-tam-6-thang-cuoi-nam-2026",
    title:
      "Trung tâm Cung ứng dịch vụ công phường Phú Thạnh triển khai nhiệm vụ trọng tâm 6 tháng cuối năm 2026",
    excerpt:
      "Hội nghị sơ kết đã đánh giá kết quả hoạt động 6 tháng đầu năm và xác định các nhiệm vụ trọng tâm về chuyển đổi số, cải cách hành chính, phục vụ người dân trong 6 tháng cuối năm 2026.",
    body: [
      "Sáng ngày 15/6/2026, Trung tâm Cung ứng dịch vụ công phường Phú Thạnh tổ chức Hội nghị sơ kết hoạt động 6 tháng đầu năm và triển khai nhiệm vụ trọng tâm 6 tháng cuối năm 2026.",
      "Hội nghị tập trung đánh giá kết quả tổ chức các hoạt động văn hóa - văn nghệ, thể dục thể thao, môi trường - đô thị, quản lý khai thác Chợ Hiệp Tân và hoạt động thư viện; đồng thời thống nhất các giải pháp đẩy mạnh ứng dụng công nghệ thông tin, chuyển đổi số trong công tác quản lý, điều hành và truyền thông.",
      "Trung tâm xác định tiếp tục nâng cao chất lượng phục vụ người dân, tổ chức và doanh nghiệp, xây dựng hình ảnh chính quyền thân thiện, hiện đại, công khai, minh bạch.",
    ],
    category: "Thông báo",
    audience: "Tất cả",
    date: "15/06/2026",
    image: newsHoinghi,
    location: "151 Lũy Bán Bích, Phường Phú Thạnh, Thành phố Hồ Chí Minh",
    attachments: [
      { name: "Ke-hoach-nhiem-vu-6-thang-cuoi-nam-2026.pdf", type: "PDF", size: "1,2 MB" },
      { name: "Phan-cong-nhiem-vu-cac-bo-phan.docx", type: "Word", size: "320 KB" },
    ],
    featured: true,
  },
  {
    id: 2,
    slug: "dem-thi-thu-hai-hoi-thi-van-nghe-2026",
    title:
      "Phường Phú Thạnh sôi nổi Đêm thi thứ hai Hội thi Văn nghệ chào mừng các ngày lễ lớn năm 2026",
    excerpt:
      "Đêm thi thứ hai quy tụ các đội văn nghệ đến từ các khu phố với nhiều tiết mục ca, múa, nhạc đặc sắc, thu hút đông đảo người dân đến cổ vũ.",
    body: [
      "Tối 14/6/2026, tại Nhà Văn hóa phường Phú Thạnh đã diễn ra Đêm thi thứ hai Hội thi Văn nghệ chào mừng các ngày lễ lớn năm 2026.",
      "Các tiết mục dự thi được dàn dựng công phu, ca ngợi Đảng, Bác Hồ, quê hương đất nước và những đổi mới của phường Phú Thạnh trong công cuộc xây dựng đô thị văn minh.",
    ],
    category: "Văn hóa - Văn nghệ",
    audience: "Tất cả",
    date: "14/06/2026",
    image: heroVanhoa,
    location: "Nhà Văn hóa phường Phú Thạnh",
    featured: true,
  },
  {
    id: 3,
    slug: "chuyen-doi-he-thong-chieu-sang-thong-minh",
    title: "Chuyển đổi hệ thống chiếu sáng thông minh ở phường Phú Thạnh",
    excerpt:
      "Các tuyến đường, tuyến hẻm trên địa bàn phường từng bước được thay thế bằng hệ thống đèn LED tiết kiệm năng lượng, điều khiển tập trung.",
    body: [
      "Việc chuyển đổi hệ thống chiếu sáng thông minh góp phần tiết kiệm điện năng, nâng cao an toàn giao thông và an ninh trật tự trong khu dân cư.",
      "Người dân được khuyến khích phản ánh các vị trí đèn hư hỏng thông qua chuyên mục Liên hệ - Góp ý trên Website của Trung tâm.",
    ],
    category: "Đô thị văn minh",
    audience: "Tất cả",
    date: "15/06/2026",
    image: heroDothi,
    featured: true,
  },
  {
    id: 4,
    slug: "chu-nhat-xanh-thang-6-2026",
    title: "Ra quân Chủ nhật xanh, xóa các điểm tồn đọng rác thải trên địa bàn phường",
    excerpt:
      "Hơn 150 đoàn viên, hội viên và người dân đã tham gia tổng vệ sinh, trồng cây xanh và tuyên truyền phân loại rác tại nguồn.",
    body: [
      "Hoạt động Chủ nhật xanh được tổ chức định kỳ nhằm nâng cao ý thức bảo vệ môi trường của người dân trên địa bàn phường Phú Thạnh.",
    ],
    category: "Môi trường",
    audience: "Thanh niên",
    date: "08/06/2026",
    image: heroMoitruong,
    location: "Khu phố 5, Phường Phú Thạnh",
  },
  {
    id: 5,
    slug: "hoi-thao-phuong-phu-thanh-2026",
    title: "Khởi tranh Hội thao phường Phú Thạnh năm 2026 với 6 môn thi đấu",
    excerpt:
      "Hội thao thu hút gần 400 vận động viên tham gia tranh tài ở các môn bóng đá, bóng bàn, cầu lông, kéo co, việt dã và cờ tướng.",
    body: [
      "Hội thao là hoạt động thường niên nhằm đẩy mạnh phong trào Toàn dân rèn luyện thân thể theo gương Bác Hồ vĩ đại.",
    ],
    category: "Thể dục thể thao",
    audience: "Tất cả",
    date: "05/06/2026",
    image: heroThethao,
    location: "Sân vận động phường Phú Thạnh",
  },
  {
    id: 6,
    slug: "khong-gian-van-hoa-ho-chi-minh-tai-thu-vien",
    title: "Không gian văn hóa Hồ Chí Minh tại Thư viện phường thu hút bạn đọc",
    excerpt:
      "Không gian trưng bày hơn 300 tư liệu, hình ảnh, sách về cuộc đời và sự nghiệp của Chủ tịch Hồ Chí Minh.",
    body: [
      "Không gian văn hóa Hồ Chí Minh là nơi sinh hoạt chính trị, học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh của cán bộ, đảng viên và người dân phường Phú Thạnh.",
    ],
    category: "Văn hóa - Văn nghệ",
    audience: "Tất cả",
    date: "02/06/2026",
    image: khongGianHcm,
    location: "Thư viện phường Phú Thạnh",
  },
];

export const honorSlides = [
  {
    id: 1,
    title: "Đội văn nghệ Khu phố 3",
    subtitle: "Giải Nhất Hội thi Văn nghệ phường Phú Thạnh năm 2026",
    image: heroVanhoa,
  },
  {
    id: 2,
    title: "Chi hội Phụ nữ Khu phố 7",
    subtitle: "Tập thể xuất sắc trong phong trào Chủ nhật xanh",
    image: heroMoitruong,
  },
  {
    id: 3,
    title: "Câu lạc bộ Bóng đá Thanh niên",
    subtitle: "Gương điển hình phong trào thể dục thể thao cơ sở",
    image: heroThethao,
  },
  {
    id: 4,
    title: "Hộ gia đình văn hóa tiêu biểu",
    subtitle: "Chung tay xây dựng tuyến hẻm văn minh, sáng - xanh - sạch",
    image: heroDothi,
  },
];

export type EventItem = {
  id: number;
  day: number;
  month: number;
  title: string;
  time: string;
  place: string;
};

export const events: EventItem[] = [
  {
    id: 1,
    day: 20,
    month: 6,
    title: "Khai giảng các lớp năng khiếu hè năm 2026",
    time: "07:30",
    place: "Nhà Thiếu nhi Phú Thạnh",
  },
  {
    id: 2,
    day: 25,
    month: 6,
    title: "Hội thao phường Phú Thạnh năm 2026",
    time: "07:00",
    place: "Sân vận động Phú Thạnh",
  },
  {
    id: 3,
    day: 30,
    month: 6,
    title: "Chương trình văn nghệ chào mừng tháng hành động vì môi trường",
    time: "19:00",
    place: "Nhà Văn hóa Phú Thạnh",
  },
];

export const publicServices = [
  {
    slug: "van-hoa-du-lich",
    name: "Văn hóa - Du lịch",
    desc: "Tổ chức hội thi, hội diễn, lớp năng khiếu, giới thiệu điểm đến trên địa bàn phường.",
  },
  {
    slug: "the-duc-the-thao",
    name: "Thể dục, thể thao",
    desc: "Giải đấu phong trào, cho thuê sân bãi, hướng dẫn tập luyện, câu lạc bộ thể thao.",
  },
  {
    slug: "thong-tin-truyen-thong",
    name: "Thông tin - Truyền thông",
    desc: "Tuyên truyền cổ động, sản xuất tin bài, hình ảnh, video phục vụ nhiệm vụ chính trị.",
  },
  {
    slug: "moi-truong-do-thi",
    name: "Môi trường - Đô thị",
    desc: "Vệ sinh môi trường, phân loại rác tại nguồn, chỉnh trang, chiếu sáng khu dân cư.",
  },
  {
    slug: "cho-hiep-tan",
    name: "Quản lý, khai thác Chợ Hiệp Tân",
    desc: "Đăng ký sạp, hợp đồng khai thác, vệ sinh an toàn thực phẩm, an toàn phòng cháy.",
  },
  {
    slug: "cau-lac-bo",
    name: "Hoạt động câu lạc bộ, đội, nhóm",
    desc: "Thành lập, hướng dẫn sinh hoạt các câu lạc bộ, đội, nhóm theo lứa tuổi và sở thích.",
  },
  {
    slug: "thu-vien",
    name: "Thư viện",
    desc: "Phục vụ bạn đọc, phòng đọc thiếu nhi, Không gian văn hóa Hồ Chí Minh, sách điện tử.",
  },
  {
    slug: "dich-vu-khac",
    name: "Dịch vụ khác",
    desc: "Các dịch vụ công do Trung tâm tổ chức thực hiện theo phân công của UBND phường.",
  },
];

export const thematics = [
  {
    slug: "diem-den-phu-thanh",
    name: "Điểm đến phường Phú Thạnh",
    desc: "Giới thiệu các địa chỉ văn hóa, lịch sử, ẩm thực và không gian công cộng tiêu biểu.",
    image: heroDothi,
  },
  {
    slug: "dinh-duong-suc-khoe",
    name: "Dinh dưỡng - Sức khỏe",
    desc: "Cẩm nang dinh dưỡng, vận động và chăm sóc sức khỏe cho mọi lứa tuổi.",
    image: heroThethao,
  },
  {
    slug: "chuyen-de-khac",
    name: "Chuyên đề truyền thông khác",
    desc: "Chuyển đổi số, cải cách hành chính, an toàn thông tin, nếp sống văn minh đô thị.",
    image: heroMoitruong,
  },
];

export const mediaImages = [
  { id: 1, title: "Hội thi Văn nghệ phường Phú Thạnh 2026", image: heroVanhoa, date: "14/06/2026" },
  { id: 2, title: "Chủ nhật xanh tại Khu phố 5", image: heroMoitruong, date: "08/06/2026" },
  { id: 3, title: "Hội thao phường Phú Thạnh 2026", image: heroThethao, date: "05/06/2026" },
  { id: 4, title: "Tuyến đường chiếu sáng thông minh", image: heroDothi, date: "15/06/2026" },
  { id: 5, title: "Hội nghị sơ kết 6 tháng đầu năm", image: newsHoinghi, date: "15/06/2026" },
  { id: 6, title: "Không gian văn hóa Hồ Chí Minh", image: khongGianHcm, date: "02/06/2026" },
];

export const mediaVideos = [
  {
    id: 1,
    title: "Phóng sự: Phú Thạnh chuyển đổi số phục vụ người dân",
    source: "YouTube",
    embedUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    date: "12/06/2026",
  },
  {
    id: 2,
    title: "Clip tuyên truyền phân loại rác tại nguồn",
    source: "YouTube",
    embedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    date: "08/06/2026",
  },
  {
    id: 3,
    title: "Ký sự: Không gian văn hóa Hồ Chí Minh tại Thư viện phường",
    source: "Vimeo",
    embedUrl: "https://player.vimeo.com/video/76979871",
    date: "02/06/2026",
  },
];

export const mediaDocuments = [
  {
    id: 1,
    title: "Kế hoạch xây dựng và vận hành Website Trung tâm",
    type: "PDF" as const,
    size: "1,2 MB",
    date: "10/06/2026",
  },
  {
    id: 2,
    title: "Quy chế hoạt động Website Trung tâm",
    type: "PDF" as const,
    size: "860 KB",
    date: "10/06/2026",
  },
  {
    id: 3,
    title: "Biểu mẫu đăng ký sử dụng sân bãi thể dục thể thao",
    type: "Word" as const,
    size: "245 KB",
    date: "05/06/2026",
  },
  {
    id: 4,
    title: "Hướng dẫn phân loại rác tại nguồn (tờ gấp)",
    type: "PDF" as const,
    size: "3,4 MB",
    date: "01/06/2026",
  },
];

export const pollOptions = [
  { label: "Rất hài lòng", value: 62, color: "var(--color-cat-moitruong)" },
  { label: "Hài lòng", value: 24, color: "var(--color-brand)" },
  { label: "Bình thường", value: 9, color: "var(--color-cat-dothi)" },
  { label: "Chưa hài lòng", value: 5, color: "var(--color-cat-thongbao)" },
];

export const heroImage = khongGianHcm;

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function categoryColor(name: string) {
  return categories.find((c) => c.name === name)?.colorVar ?? "var(--color-brand)";
}