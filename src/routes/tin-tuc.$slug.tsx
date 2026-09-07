import { Link, createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Download, FileText, MapPin, Tag, Users } from "lucide-react";

import { PostCard } from "@/components/site/PostCard";
import { usePosts } from "@/lib/hooks";
import { resolveImage } from "@/lib/images";
import type { Attachment } from "@/lib/types";

export const Route = createFileRoute("/tin-tuc/$slug")({
  head: () => ({
    meta: [
      { title: "Tin tức - Sự kiện | Trung tâm Cung ứng dịch vụ công phường Phú Thạnh" },
      {
        name: "description",
        content:
          "Tin bài, tin video, phóng sự ảnh phản ánh các hoạt động nổi bật trên địa bàn phường Phú Thạnh.",
      },
    ],
  }),
  component: PostDetail,
});

function PostDetail() {
  const { slug } = Route.useParams();
  const { data: allPosts, isLoading } = usePosts();
  const post = (allPosts ?? []).find((p) => p.slug === slug);

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-[1600px] px-3 py-6 sm:px-5">
        <p className="text-sm text-muted-foreground">Đang tải bài viết...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="mx-auto w-full max-w-[1600px] px-3 py-6 sm:px-5">
        <p className="text-sm text-muted-foreground">Không tìm thấy bài viết.</p>
        <Link to="/tin-tuc" search={{}} className="text-brand hover:underline">
          ← Quay lại danh sách tin tức
        </Link>
      </div>
    );
  }

  const related = (allPosts ?? []).filter((p) => p.slug !== post.slug).slice(0, 4);
  const mapQuery = encodeURIComponent(post.location ?? "");
  const attachments = (post.attachments ?? []) as Attachment[];

  return (
    <article className="mx-auto w-full max-w-[1600px] px-3 py-6 sm:px-5">
      <p className="mb-3 flex flex-wrap items-center gap-2 text-xs">
        <Link to="/" className="text-brand hover:underline">
          Trang chủ
        </Link>
        <span className="text-muted-foreground">/</span>
        <Link to="/tin-tuc" search={{}} className="text-brand hover:underline">
          Tin tức - Sự kiện
        </Link>
      </p>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
        <div className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-6">
          <span
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-bold uppercase text-brand-foreground"
            style={{ backgroundColor: post.categoryColor ?? "var(--color-brand)" }}
          >
            <Tag className="size-3.5" aria-hidden />
            {post.category}
          </span>
          <h1 className="text-2xl font-extrabold leading-tight lg:text-3xl">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 border-y border-border py-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-4" aria-hidden />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="size-4" aria-hidden />
              Đối tượng: {post.audience}
            </span>
            {post.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4" aria-hidden />
                {post.location}
              </span>
            )}
          </div>

          <img
            src={resolveImage(post.image)}
            alt={post.title}
            width={1280}
            height={720}
            className="w-full rounded-xl object-cover"
          />

          <div className="space-y-3 text-[15px] leading-relaxed">
            <p className="font-semibold">{post.excerpt}</p>
            {post.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {attachments.length > 0 && (
            <section className="rounded-xl border border-border p-4">
              <h2 className="section-title mb-3 text-sm">
                <FileText className="size-4" aria-hidden />
                Tài liệu đính kèm (xem trực tiếp)
              </h2>
              <ul className="space-y-2">
                {attachments.map((a) => (
                  <li
                    key={a.name}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-muted px-3 py-2 text-xs"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <FileText className="size-4 shrink-0 text-brand" aria-hidden />
                      <span className="truncate font-semibold">{a.name}</span>
                      <span className="text-muted-foreground">
                        {a.type} · {a.size}
                      </span>
                    </span>
                    <span className="flex gap-2">
                      <button className="rounded-full bg-brand px-3 py-1 font-bold text-brand-foreground hover:bg-brand-dark">
                        Xem trực tuyến
                      </button>
                      <button className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 font-bold hover:bg-accent">
                        <Download className="size-3.5" aria-hidden />
                        Tải về
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {post.location && (
            <section>
              <h2 className="section-title mb-2 text-sm">
                <MapPin className="size-4" aria-hidden />
                Vị trí tổ chức
              </h2>
              <iframe
                title={`Bản đồ vị trí: ${post.location}`}
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                className="h-72 w-full rounded-xl border border-border"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </section>
          )}
        </div>

        <aside className="space-y-3">
          <h2 className="section-title text-sm">Tin liên quan</h2>
          {related.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </aside>
      </div>
    </article>
  );
}
