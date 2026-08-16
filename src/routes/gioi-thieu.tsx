import { createFileRoute } from "@tanstack/react-router";
import { Building2, ClipboardList, Users } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { systemSettings } from "@/lib/site-data";

export const Route = createFileRoute("/gioi-thieu")({
  head: () => ({
    meta: [
      { title: "Giới thiệu Trung tâm Cung ứng dịch vụ công phường Phú Thạnh" },
      {
        name: "description",
        content:
          "Giới thiệu chung, chức năng - nhiệm vụ và cơ cấu tổ chức của Trung tâm Cung ứng dịch vụ công phường Phú Thạnh, Thành phố Hồ Chí Minh.",
      },
      { property: "og:title", content: "Giới thiệu Trung tâm Cung ứng dịch vụ công Phú Thạnh" },
      {
        property: "og:description",
        content: "Giới thiệu chung, chức năng - nhiệm vụ và cơ cấu tổ chức của Trung tâm.",
      },
    ],
  }),
  component: About,
});

const structure = [
  { role: "Ban Giám đốc", detail: "Giám đốc và các Phó Giám đốc phụ trách từng lĩnh vực." },
  { role: "Bộ phận Hành chính - Tổng hợp", detail: "Văn thư, kế toán, tổng hợp, thi đua khen thưởng." },
  {
    role: "Bộ phận Văn hóa - Thể thao",
    detail: "Tổ chức hội thi, hội diễn, lớp năng khiếu, giải thể thao phong trào.",
  },
  {
    role: "Bộ phận Thông tin - Truyền thông",
    detail: "Ban Biên tập và Tổ Quản trị Website, tuyên truyền cổ động trực quan.",
  },
  {
    role: "Bộ phận Môi trường - Đô thị",
    detail: "Vệ sinh môi trường, chỉnh trang đô thị, chiếu sáng khu dân cư.",
  },
  {
    role: "Bộ phận Quản lý Chợ Hiệp Tân",
    detail: "Quản lý, khai thác chợ, an toàn thực phẩm và phòng cháy chữa cháy.",
  },
  { role: "Thư viện phường", detail: "Phục vụ bạn đọc và Không gian văn hóa Hồ Chí Minh." },
];

function About() {
  return (
    <>
      <PageHero
        title="Giới thiệu"
        desc="Giới thiệu chung về Trung tâm; chức năng, nhiệm vụ và cơ cấu tổ chức."
      />

      <div className="mx-auto grid w-full max-w-[1600px] gap-5 px-3 py-6 sm:px-5 lg:grid-cols-3">
        <section className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
          <h2 className="section-title mb-3 text-base">
            <Building2 className="size-5" aria-hidden />
            Giới thiệu chung
          </h2>
          <div className="space-y-3 text-[15px] leading-relaxed">
            <p>
              {systemSettings.org_name} {systemSettings.org_name_2} là đơn vị sự nghiệp công lập
              trực thuộc Ủy ban nhân dân phường Phú Thạnh, Thành phố Hồ Chí Minh, hoạt động với
              phương châm <strong>“{systemSettings.slogan}”</strong>.
            </p>
            <p>
              Trung tâm tổ chức thực hiện các dịch vụ công trên các lĩnh vực văn hóa - du lịch; thể
              dục, thể thao; thông tin - truyền thông; môi trường - đô thị; quản lý, khai thác Chợ
              Hiệp Tân; hoạt động câu lạc bộ, đội, nhóm; thư viện và các dịch vụ khác theo phân công
              của Ủy ban nhân dân phường.
            </p>
            <p>
              Trụ sở: {systemSettings.address}, {systemSettings.address_2}. Điện thoại:{" "}
              {systemSettings.hotline} {systemSettings.hotline_note}. Email: {systemSettings.email}.
            </p>
          </div>

          <h2 className="section-title mb-3 mt-6 text-base">
            <ClipboardList className="size-5" aria-hidden />
            Chức năng, nhiệm vụ
          </h2>
          <ul className="space-y-2 text-[15px]">
            {[
              "Tổ chức các hoạt động văn hóa, văn nghệ, thể dục thể thao phục vụ nhân dân trên địa bàn phường.",
              "Thực hiện công tác thông tin, tuyên truyền các chủ trương của Đảng, chính sách, pháp luật của Nhà nước.",
              "Tổ chức các dịch vụ về môi trường - đô thị, góp phần xây dựng phường sáng - xanh - sạch - đẹp - văn minh.",
              "Quản lý, khai thác Chợ Hiệp Tân theo quy định của pháp luật.",
              "Quản lý và phục vụ hoạt động Thư viện phường, Không gian văn hóa Hồ Chí Minh.",
              "Đẩy mạnh ứng dụng công nghệ thông tin, chuyển đổi số trong quản lý, điều hành và phục vụ người dân.",
              "Tiếp nhận, xử lý phản ánh, kiến nghị của tổ chức, cá nhân theo quy trình đã ban hành.",
            ].map((t) => (
              <li key={t} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                {t}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-border bg-card p-5">
          <h2 className="section-title mb-3 text-base">
            <Users className="size-5" aria-hidden />
            Cơ cấu tổ chức
          </h2>
          <ul className="space-y-3">
            {structure.map((s) => (
              <li key={s.role} className="rounded-lg border border-border p-3">
                <p className="text-sm font-bold text-brand">{s.role}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.detail}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}