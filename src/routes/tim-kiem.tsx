import { Link, createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { PostCard } from "@/components/site/PostCard";
import { useSearchPosts } from "@/lib/hooks";

type SearchParams = { q?: string };

export const Route = createFileRoute("/tim-kiem")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Tìm kiếm | Trung tâm Cung ứng dịch vụ công phường Phú Thạnh" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q = "" } = Route.useSearch();
  const { data: results, isLoading } = useSearchPosts(q);

  return (
    <>
      <PageHero
        title="Tìm kiếm"
        desc="Tìm nhanh tin tức, hoạt động và thông tin đang được quan tâm trên Website Trung tâm."
      />
      <div className="mx-auto w-full max-w-[1600px] px-3 py-6 sm:px-5">
        <form method="get" className="mx-auto mb-6 flex max-w-2xl gap-2">
          <input
            name="q"
            defaultValue={q}
            placeholder="Nhập từ khóa cần tìm..."
            className="h-11 min-w-0 flex-1 rounded-lg border border-border bg-card px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            className="rounded-lg bg-brand px-5 text-sm font-bold text-brand-foreground hover:bg-brand-dark"
          >
            Tìm kiếm
          </button>
        </form>

        {!q ? (
          <p className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
            Nhập từ khóa để bắt đầu tìm kiếm.
          </p>
        ) : isLoading ? (
          <p className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
            Đang tìm kiếm...
          </p>
        ) : results && results.length > 0 ? (
          <>
            <p className="mb-4 text-sm text-muted-foreground">
              Tìm thấy {results.length} bài viết cho từ khóa <strong className="text-foreground">“{q}”</strong>
            </p>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {results.map((post) => <PostCard key={post.id} post={post} />)}
            </div>
          </>
        ) : (
          <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
            Không tìm thấy bài viết phù hợp với từ khóa “{q}”.
            <Link to="/tin-tuc" className="ml-1 font-bold text-brand hover:underline">Xem tất cả tin tức</Link>
          </div>
        )}
      </div>
    </>
  );
}
