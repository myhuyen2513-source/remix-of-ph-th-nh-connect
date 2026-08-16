import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Quote } from "lucide-react";

import khongGianHcm from "@/assets/khong-gian-hcm.jpg";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/khong-gian-van-hoa-ho-chi-minh")({
  head: () => ({
    meta: [
      { title: "Không gian văn hóa Hồ Chí Minh | Trung tâm phường Phú Thạnh" },
      {
        name: "description",
        content:
          "Không gian văn hóa Hồ Chí Minh tại phường Phú Thạnh: tư liệu, hình ảnh, sách và các hoạt động học tập, làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh.",
      },
      { property: "og:title", content: "Không gian văn hóa Hồ Chí Minh - phường Phú Thạnh" },
      {
        property: "og:description",
        content: "Tư liệu, hình ảnh và hoạt động học tập, làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh.",
      },
    ],
  }),
  component: HcmSpace,
});

const items = [
  {
    title: "Tư liệu, hình ảnh",
    desc: "Hơn 300 tư liệu, hình ảnh về cuộc đời, sự nghiệp cách mạng của Chủ tịch Hồ Chí Minh.",
  },
  {
    title: "Tủ sách Bác Hồ",
    desc: "Sách, báo, tạp chí phục vụ cán bộ, đảng viên và người dân tìm hiểu, nghiên cứu.",
  },
  {
    title: "Sinh hoạt chuyên đề",
    desc: "Sinh hoạt chính trị, kể chuyện về Bác, tuyên dương gương sáng đảng viên định kỳ.",
  },
  {
    title: "Không gian số",
    desc: "Trưng bày trực tuyến, video tư liệu và các bài viết chuyên đề trên Website Trung tâm.",
  },
];

function HcmSpace() {
  return (
    <>
      <PageHero
        title="Không gian văn hóa Hồ Chí Minh"
        desc="Nơi lưu giữ, tuyên truyền và tổ chức các hoạt động học tập, làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh tại phường Phú Thạnh."
      />

      <div className="mx-auto grid w-full max-w-[1600px] gap-5 px-3 py-6 sm:px-5 lg:grid-cols-2">
        <img
          src={khongGianHcm}
          alt="Không gian văn hóa Hồ Chí Minh tại Thư viện phường Phú Thạnh"
          width={1280}
          height={720}
          className="w-full rounded-xl object-cover"
        />

        <div className="space-y-4">
          <blockquote className="rounded-xl border-l-4 border-cat-thongbao bg-card p-5">
            <Quote className="size-5 text-cat-thongbao" aria-hidden />
            <p className="mt-2 text-lg font-semibold italic leading-relaxed">
              “Việc gì lợi cho dân, ta phải hết sức làm. Việc gì hại đến dân, ta phải hết sức
              tránh.”
            </p>
            <footer className="mt-2 text-sm text-muted-foreground">— Chủ tịch Hồ Chí Minh</footer>
          </blockquote>

          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((i) => (
              <article key={i.title} className="rounded-xl border border-border bg-card p-4">
                <h2 className="flex items-center gap-2 text-sm font-bold uppercase text-brand">
                  <BookOpen className="size-4" aria-hidden />
                  {i.title}
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground">{i.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}