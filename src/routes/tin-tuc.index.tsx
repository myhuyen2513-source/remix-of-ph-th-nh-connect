import { Link, createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { PostCard } from "@/components/site/PostCard";
import { categories, posts } from "@/lib/site-data";

type NewsSearch = { danh_muc?: string | undefined };

export const Route = createFileRoute("/tin-tuc/")({
  validateSearch: (search: Record<string, unknown>): NewsSearch => ({
    danh_muc: typeof search["danh_muc"] === "string" ? (search["danh_muc"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Tin tức - Sự kiện | Trung tâm Cung ứng dịch vụ công phường Phú Thạnh" },
      {
        name: "description",
        content:
          "Tin bài, tin video, phóng sự ảnh phản ánh các hoạt động nổi bật trên địa bàn phường Phú Thạnh và hoạt động của Trung tâm.",
      },
      { property: "og:title", content: "Tin tức - Sự kiện phường Phú Thạnh" },
      {
        property: "og:description",
        content: "Cập nhật kịp thời hoạt động của Đảng ủy, HĐND, UBND, MTTQ phường và Trung tâm.",
      },
    ],
  }),
  component: NewsList,
});

function NewsList() {
  const { danh_muc } = Route.useSearch();
  const list = danh_muc ? posts.filter((p) => p.category === danh_muc) : posts;

  return (
    <>
      <PageHero
        title="Tin tức - Sự kiện"
        desc="Cập nhật tin bài, tin video, phóng sự ảnh về các hoạt động của Đảng ủy, HĐND, UBND, Ủy ban MTTQ Việt Nam phường, các tổ chức chính trị - xã hội, khu phố và Trung tâm."
      />

      <div className="mx-auto w-full max-w-[1600px] px-3 py-6 sm:px-5">
        <div className="mb-5 flex flex-wrap gap-2">
          <Link
            to="/tin-tuc"
            search={{}}
            className={`rounded-full border px-3 py-1.5 text-xs font-bold uppercase ${
              danh_muc
                ? "border-border text-foreground hover:bg-accent"
                : "border-brand bg-brand text-brand-foreground"
            }`}
          >
            Tất cả
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/tin-tuc"
              search={{ danh_muc: c.name }}
              className={`rounded-full border px-3 py-1.5 text-xs font-bold uppercase ${
                danh_muc === c.name
                  ? "border-transparent text-brand-foreground"
                  : "border-border text-foreground hover:bg-accent"
              }`}
              style={danh_muc === c.name ? { backgroundColor: c.colorVar } : undefined}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {list.length === 0 ? (
          <p className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
            Chuyên mục này chưa có bài viết được xuất bản.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {list.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}