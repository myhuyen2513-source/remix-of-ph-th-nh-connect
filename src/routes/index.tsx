import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  Facebook,
  FileText,
  Flame,
  Grid3x3,
  Image as ImageIcon,
  Landmark,
  Layers,
  Link2,
  MessageCircle,
  PlayCircle,
  QrCode,
} from "lucide-react";

import { HonorSlider } from "@/components/site/HonorSlider";
import { MiniCalendar } from "@/components/site/MiniCalendar";
import { PollBox } from "@/components/site/PollBox";
import { PostCard } from "@/components/site/PostCard";
import { categories, events, posts, systemSettings } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trung tâm Cung ứng dịch vụ công phường Phú Thạnh | Tận tâm phục vụ" },
      {
        name: "description",
        content:
          "Trang chủ Website Trung tâm Cung ứng dịch vụ công phường Phú Thạnh: tin tức - sự kiện, dịch vụ công, chuyên đề truyền thông, lịch hoạt động và tiếp nhận góp ý của người dân.",
      },
      { property: "og:title", content: "Trung tâm Cung ứng dịch vụ công phường Phú Thạnh" },
      {
        property: "og:description",
        content:
          "Kênh thông tin chính thức: tin tức - sự kiện, dịch vụ công, thư viện truyền thông và góp ý trực tuyến.",
      },
    ],
  }),
  component: Index,
});

const mediaShortcuts = [
  { icon: ImageIcon, title: "Poster", desc: "Áp phích, hình ảnh", color: "var(--color-cat-vanhoa)" },
  { icon: Layers, title: "Infographic", desc: "Thông tin trực quan", color: "var(--color-brand)" },
  {
    icon: PlayCircle,
    title: "Video tuyên truyền",
    desc: "Clip, phóng sự",
    color: "var(--color-cat-thongbao)",
  },
  {
    icon: FileText,
    title: "Tài liệu hướng dẫn",
    desc: "Tài liệu, biểu mẫu",
    color: "var(--color-cat-dothi)",
  },
];

function Index() {
  const featured = posts.filter((p) => p.featured);
  const latest = posts.slice(0, 4);

  return (
    <>
      <HonorSlider />

      <div className="mx-auto grid w-full max-w-[1600px] gap-5 px-3 py-6 sm:px-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
        <div className="space-y-6">
          {/* Tin nổi bật + Danh mục hoạt động */}
          <div className="grid gap-5 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <section className="rounded-xl border border-border bg-card p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="section-title text-base">
                  <Flame className="size-5" aria-hidden />
                  Tin nổi bật
                </h2>
                <Link to="/tin-tuc" className="text-xs font-semibold text-brand hover:underline">
                  Xem tất cả
                </Link>
              </div>
              <ul className="divide-y divide-border">
                {featured.map((p) => (
                  <li key={p.id} className="py-3 first:pt-0 last:pb-0">
                    <Link
                      to="/tin-tuc/$slug"
                      params={{ slug: p.slug }}
                      className="group flex gap-3"
                    >
                      <div className="hover-zoom w-28 shrink-0 rounded-lg">
                        <img
                          src={p.image}
                          alt={p.title}
                          width={224}
                          height={144}
                          loading="lazy"
                          className="aspect-[14/9] w-full rounded-lg object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="line-clamp-3 text-sm font-semibold leading-snug group-hover:text-brand">
                          {p.title}
                        </h3>
                        <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                          <CalendarDays className="size-3.5" aria-hidden />
                          {p.date}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border border-border bg-card p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="section-title text-base">
                  <Grid3x3 className="size-5" aria-hidden />
                  Danh mục hoạt động
                </h2>
                <Link
                  to="/dich-vu-cong"
                  className="text-xs font-semibold text-brand hover:underline"
                >
                  Xem tất cả
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {categories.slice(0, 4).map((c) => (
                  <article
                    key={c.id}
                    className="flex flex-col gap-2 rounded-lg border border-border p-3"
                  >
                    <h3
                      className="flex items-center gap-2 text-xs font-bold uppercase"
                      style={{ color: c.colorVar }}
                    >
                      <span
                        className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg text-brand-foreground"
                        style={{ backgroundColor: c.colorVar }}
                      >
                        <Landmark className="size-4" aria-hidden />
                      </span>
                      <span className="truncate">{c.name}</span>
                    </h3>
                    <div className="hover-zoom rounded-lg">
                      <img
                        src={c.image}
                        alt={c.name}
                        width={640}
                        height={360}
                        loading="lazy"
                        className="aspect-[16/9] w-full rounded-lg object-cover"
                      />
                    </div>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {c.bullets.map((b) => (
                        <li key={b} className="flex gap-1.5">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/tin-tuc"
                      search={{ danh_muc: c.name }}
                      className="mt-auto inline-flex w-fit items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold text-brand-foreground"
                      style={{ backgroundColor: c.colorVar }}
                    >
                      Xem thêm
                      <ArrowRight className="size-3" aria-hidden />
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* Tin mới nhất */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="section-title text-base">
                <Flame className="size-5" aria-hidden />
                Tin tức - Sự kiện mới nhất
              </h2>
              <Link to="/tin-tuc" className="text-xs font-semibold text-brand hover:underline">
                Xem tất cả
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {latest.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </section>

          {/* Thư viện truyền thông + Liên kết nhanh */}
          <div className="grid gap-5 xl:grid-cols-2">
            <section className="rounded-xl border border-border bg-card p-4">
              <h2 className="section-title mb-3 text-base">
                <Layers className="size-5" aria-hidden />
                Thư viện truyền thông
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {mediaShortcuts.map((m) => (
                  <Link
                    key={m.title}
                    to="/thu-vien"
                    className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent"
                  >
                    <span
                      className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-brand-foreground"
                      style={{ backgroundColor: m.color }}
                    >
                      <m.icon className="size-5" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span
                        className="block truncate text-xs font-bold uppercase"
                        style={{ color: m.color }}
                      >
                        {m.title}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {m.desc}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-border bg-card p-4">
              <h2 className="section-title mb-3 text-base">
                <Link2 className="size-5" aria-hidden />
                Liên kết nhanh
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href={systemSettings.facebook_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent"
                >
                  <Facebook className="size-8 shrink-0 text-brand" aria-hidden />
                  <span className="min-w-0 text-xs">
                    <span className="block font-bold text-brand">Fanpage Facebook</span>
                    <span className="block text-muted-foreground">
                      Kết nối, cập nhật thông tin nhanh chóng
                    </span>
                  </span>
                </a>
                <a
                  href={systemSettings.zalo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent"
                >
                  <MessageCircle className="size-8 shrink-0 text-brand" aria-hidden />
                  <span className="min-w-0 text-xs">
                    <span className="block font-bold text-brand">Zalo OA</span>
                    <span className="block text-muted-foreground">
                      Quan tâm Zalo OA để nhận tin tức
                    </span>
                  </span>
                </a>
                <a
                  href={systemSettings.dvc_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent"
                >
                  <Landmark className="size-8 shrink-0 text-brand" aria-hidden />
                  <span className="min-w-0 text-xs">
                    <span className="block font-bold text-brand">Cổng Dịch vụ công</span>
                    <span className="block text-muted-foreground">Trực tuyến dành cho người dân</span>
                  </span>
                </a>
                <a
                  href={systemSettings.ubnd_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent"
                >
                  <Landmark className="size-8 shrink-0 text-cat-thongbao" aria-hidden />
                  <span className="min-w-0 text-xs">
                    <span className="block font-bold text-cat-thongbao">UBND Phường Phú Thạnh</span>
                    <span className="block text-muted-foreground">Thông tin chính thức</span>
                  </span>
                </a>
              </div>
            </section>
          </div>
        </div>

        {/* Cột phụ tiện ích */}
        <aside className="space-y-5">
          <section className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="section-title text-sm">
                <CalendarDays className="size-4" aria-hidden />
                Sự kiện sắp diễn ra
              </h2>
              <Link to="/tin-tuc" className="text-xs font-semibold text-brand hover:underline">
                Xem tất cả
              </Link>
            </div>
            <ul className="space-y-3">
              {events.map((e) => (
                <li key={e.id} className="flex gap-3 rounded-lg border border-border p-2.5">
                  <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-lg bg-brand text-brand-foreground">
                    <span className="text-lg font-extrabold leading-none">{e.day}</span>
                    <span className="text-[10px] font-semibold uppercase">Tháng {e.month}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-xs font-semibold leading-snug">{e.title}</p>
                    <p className="mt-1 truncate text-[11px] text-muted-foreground">
                      {e.time} - {e.place}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <MiniCalendar />

          <section className="rounded-xl border border-border bg-card p-4">
            <h2 className="section-title mb-3 text-sm">
              <QrCode className="size-4" aria-hidden />
              Mạng xã hội của Trung tâm
            </h2>
            <div className="flex items-center gap-3">
              <div className="grid size-24 shrink-0 place-items-center rounded-lg border border-border bg-muted text-center text-[10px] font-semibold text-muted-foreground">
                Mã QR
                <br />
                Zalo OA
              </div>
              <div className="min-w-0 space-y-2 text-xs">
                <p className="text-muted-foreground">
                  Quét mã QR để quan tâm Zalo OA, hoặc truy cập nhanh Fanpage của phường.
                </p>
                <a
                  href={systemSettings.facebook_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 font-bold text-brand-foreground hover:bg-brand-dark"
                >
                  <Facebook className="size-4" aria-hidden />
                  Fanpage Facebook
                </a>
              </div>
            </div>
          </section>

          <PollBox />
        </aside>
      </div>
    </>
  );
}
