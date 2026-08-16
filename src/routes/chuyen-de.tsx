import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { thematics } from "@/lib/site-data";

export const Route = createFileRoute("/chuyen-de")({
  head: () => ({
    meta: [
      { title: "Chuyên đề truyền thông | Trung tâm Cung ứng dịch vụ công phường Phú Thạnh" },
      {
        name: "description",
        content:
          "Các chuyên đề truyền thông: Điểm đến phường Phú Thạnh, Dinh dưỡng - Sức khỏe và các chuyên đề khác về chuyển đổi số, nếp sống văn minh đô thị.",
      },
      { property: "og:title", content: "Chuyên đề truyền thông phường Phú Thạnh" },
      {
        property: "og:description",
        content: "Điểm đến phường Phú Thạnh, Dinh dưỡng - Sức khỏe và các chuyên đề truyền thông khác.",
      },
    ],
  }),
  component: Thematics,
});

function Thematics() {
  return (
    <>
      <PageHero
        title="Chuyên đề truyền thông"
        desc="Các chuyên đề được xây dựng nhằm truyền thông sâu về từng nhóm nội dung phục vụ người dân."
      />

      <div className="mx-auto grid w-full max-w-[1600px] gap-5 px-3 py-6 sm:px-5 lg:grid-cols-3">
        {thematics.map((t) => (
          <article
            key={t.slug}
            className="group overflow-hidden rounded-xl border border-border bg-card"
          >
            <div className="hover-zoom">
              <img
                src={t.image}
                alt={t.name}
                width={1280}
                height={720}
                loading="lazy"
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
            <div className="space-y-2 p-5">
              <h2 className="text-base font-bold uppercase text-brand">{t.name}</h2>
              <p className="text-sm text-muted-foreground">{t.desc}</p>
              <Link
                to="/tin-tuc"
                search={{}}
                className="inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline"
              >
                Xem các bài viết
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}