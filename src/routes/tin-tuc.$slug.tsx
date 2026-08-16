import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { CalendarDays, Download, FileText, MapPin, Tag, Users } from "lucide-react";

import { PostCard } from "@/components/site/PostCard";
import { categoryColor, getPost, posts } from "@/lib/site-data";

export const Route = createFileRoute("/tin-tuc/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Không tìm thấy bài viết" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} | Trung tâm Cung ứng dịch vụ công phường Phú Thạnh` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: PostDetail,
});

function PostDetail() {
  const { post } = Route.useLoaderData();
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 4);
  const mapQuery = encodeURIComponent(post.location ?? "");

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
            style={{ backgroundColor: categoryColor(post.category) }}
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
            src={post.image}
            alt={post.title}
            width={1280}
            height={720}
            className="w-full rounded-xl object-cover"
          />

          <div className="space-y-3 text-[15px] leading-relaxed">
            <p className="font-semibold">{post.excerpt}</p>
            {post.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {post.attachments && post.attachments.length > 0 && (
            <section className="rounded-xl border border-border p-4">
              <h2 className="section-title mb-3 text-sm">
                <FileText className="size-4" aria-hidden />
                Tài liệu đính kèm (xem trực tiếp)
              </h2>
              <ul className="space-y-2">
                {post.attachments.map((a) => (
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