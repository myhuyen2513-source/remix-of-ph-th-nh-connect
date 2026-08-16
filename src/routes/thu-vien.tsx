import { createFileRoute } from "@tanstack/react-router";
import { FileText, Images, PlayCircle } from "lucide-react";
import { useState } from "react";

import { PageHero } from "@/components/site/PageHero";
import { mediaDocuments, mediaImages, mediaVideos } from "@/lib/site-data";

export const Route = createFileRoute("/thu-vien")({
  head: () => ({
    meta: [
      { title: "Thư viện truyền thông | Trung tâm Cung ứng dịch vụ công phường Phú Thạnh" },
      {
        name: "description",
        content:
          "Thư viện hình ảnh, kho video tuyên truyền (YouTube, Vimeo, Facebook) và tài liệu, biểu mẫu của Trung tâm Cung ứng dịch vụ công phường Phú Thạnh.",
      },
      { property: "og:title", content: "Thư viện truyền thông phường Phú Thạnh" },
      {
        property: "og:description",
        content: "Hình ảnh, video tuyên truyền và tài liệu hướng dẫn phục vụ người dân.",
      },
    ],
  }),
  component: MediaLibrary,
});

type Tab = "images" | "videos" | "documents";

function MediaLibrary() {
  const [tab, setTab] = useState<Tab>("images");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const tabs: { id: Tab; label: string; icon: typeof Images }[] = [
    { id: "images", label: "Thư viện hình ảnh", icon: Images },
    { id: "videos", label: "Kho video", icon: PlayCircle },
    { id: "documents", label: "Tài liệu, biểu mẫu", icon: FileText },
  ];

  return (
    <>
      <PageHero
        title="Thư viện truyền thông"
        desc="Hình ảnh hiển thị dạng thư viện ảnh, video phát trực tiếp trên trang (nhúng từ YouTube, Vimeo, Facebook), tài liệu xem trực tuyến."
      />

      <div className="mx-auto w-full max-w-[1600px] px-3 py-6 sm:px-5">
        <div className="mb-5 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              aria-pressed={tab === t.id}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase ${
                tab === t.id
                  ? "border-brand bg-brand text-brand-foreground"
                  : "border-border hover:bg-accent"
              }`}
            >
              <t.icon className="size-4" aria-hidden />
              {t.label}
            </button>
          ))}
        </div>

        {tab === "images" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mediaImages.map((m) => (
              <button
                key={m.id}
                onClick={() => setLightbox(m.id)}
                className="hover-zoom group overflow-hidden rounded-xl border border-border bg-card text-left"
              >
                <img
                  src={m.image}
                  alt={m.title}
                  width={1024}
                  height={576}
                  loading="lazy"
                  className="aspect-[16/9] w-full object-cover"
                />
                <span className="block p-3">
                  <span className="block text-sm font-semibold group-hover:text-brand">
                    {m.title}
                  </span>
                  <span className="mt-1 block text-[11px] text-muted-foreground">{m.date}</span>
                </span>
              </button>
            ))}
          </div>
        )}

        {tab === "videos" && (
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {mediaVideos.map((v) => (
              <article key={v.id} className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="aspect-video w-full bg-muted">
                  <iframe
                    title={v.title}
                    src={v.embedUrl}
                    className="size-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="space-y-1 p-4">
                  <h2 className="text-sm font-bold">{v.title}</h2>
                  <p className="text-[11px] text-muted-foreground">
                    Nguồn: {v.source} · {v.date}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        {tab === "documents" && (
          <ul className="space-y-3">
            {mediaDocuments.map((d) => (
              <li
                key={d.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand text-brand-foreground">
                    <FileText className="size-5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">{d.title}</span>
                    <span className="block text-[11px] text-muted-foreground">
                      {d.type} · {d.size} · Đăng ngày {d.date}
                    </span>
                  </span>
                </span>
                <span className="flex gap-2 text-xs">
                  <button className="rounded-full bg-brand px-4 py-1.5 font-bold text-brand-foreground hover:bg-brand-dark">
                    Xem trực tuyến
                  </button>
                  <button className="rounded-full border border-border px-4 py-1.5 font-bold hover:bg-accent">
                    Tải về
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-foreground/80 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
        >
          <figure className="max-w-4xl">
            <img
              src={mediaImages.find((m) => m.id === lightbox)?.image}
              alt={mediaImages.find((m) => m.id === lightbox)?.title ?? ""}
              className="max-h-[80vh] w-full rounded-xl object-contain"
            />
            <figcaption className="mt-3 text-center text-sm font-semibold text-background">
              {mediaImages.find((m) => m.id === lightbox)?.title}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}