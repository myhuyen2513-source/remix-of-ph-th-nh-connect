import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Landmark, Search } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { publicServices } from "@/lib/site-data";

export const Route = createFileRoute("/dich-vu-cong")({
  head: () => ({
    meta: [
      { title: "Dịch vụ công | Trung tâm Cung ứng dịch vụ công phường Phú Thạnh" },
      {
        name: "description",
        content:
          "Thông tin và hướng dẫn tiếp cận các dịch vụ do Trung tâm tổ chức thực hiện: văn hóa - du lịch, thể dục thể thao, môi trường - đô thị, Chợ Hiệp Tân, thư viện và dịch vụ khác.",
      },
      { property: "og:title", content: "Dịch vụ công của Trung tâm phường Phú Thạnh" },
      {
        property: "og:description",
        content: "Tra cứu thông tin và tiện ích điện tử phục vụ người dân, tổ chức, doanh nghiệp.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero
        title="Dịch vụ công"
        desc="Giới thiệu, cung cấp thông tin và hướng dẫn tiếp cận các dịch vụ do Trung tâm tổ chức thực hiện."
      />

      <div className="mx-auto w-full max-w-[1600px] space-y-6 px-3 py-6 sm:px-5">
        <section className="rounded-xl border border-border bg-card p-4">
          <h2 className="section-title mb-3 text-base">
            <Search className="size-5" aria-hidden />
            Tra cứu thông tin dịch vụ
          </h2>
          <form
            className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="search"
              placeholder="Nhập tên dịch vụ, thủ tục hoặc lĩnh vực cần tra cứu..."
              className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <button className="h-11 rounded-lg bg-brand px-6 text-sm font-bold text-brand-foreground hover:bg-brand-dark">
              Tra cứu
            </button>
          </form>
          <p className="mt-2 text-xs text-muted-foreground">
            Tiện ích điện tử nhằm tạo thuận lợi cho người dân, tổ chức và doanh nghiệp trong quá
            trình sử dụng dịch vụ của Trung tâm.
          </p>
        </section>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {publicServices.map((s) => (
            <article
              key={s.slug}
              className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-lg"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand text-brand-foreground">
                <Landmark className="size-5" aria-hidden />
              </span>
              <h2 className="text-sm font-bold uppercase text-brand">{s.name}</h2>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
              <Link
                to="/lien-he"
                className="mt-auto inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline"
              >
                Liên hệ hướng dẫn
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}