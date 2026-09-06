import { createFileRoute } from "@tanstack/react-router";
import { Facebook, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";

import { PageHero } from "@/components/site/PageHero";
import { useCreateContact, useSettings } from "@/lib/hooks";

export const Route = createFileRoute("/lien-he")({
  head: () => ({
    meta: [
      { title: "Liên hệ - Góp ý | Trung tâm Cung ứng dịch vụ công phường Phú Thạnh" },
      {
        name: "description",
        content:
          "Tiếp nhận ý kiến phản ánh, góp ý của người dân và thông tin liên hệ của Trung tâm Cung ứng dịch vụ công phường Phú Thạnh: 151 Lũy Bán Bích, TP.HCM.",
      },
      { property: "og:title", content: "Liên hệ - Góp ý với Trung tâm phường Phú Thạnh" },
      {
        property: "og:description",
        content: "Gửi phản ánh, kiến nghị trực tuyến và tra cứu thông tin liên hệ của Trung tâm.",
      },
    ],
  }),
  component: Contact,
});

const topics = [
  "Văn hóa - Văn nghệ",
  "Thể dục thể thao",
  "Môi trường",
  "Đô thị văn minh",
  "Chợ Hiệp Tân",
  "Thư viện",
  "Nội dung khác",
];

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", topic: topics[0], message: "" });
  const createMutation = useCreateContact();
  const { data: settings } = useSettings();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(form, {
      onSuccess: () => setSent(true),
    });
  };

  return (
    <>
      <PageHero
        title="Liên hệ - Góp ý"
        desc="Trung tâm tiếp nhận ý kiến phản ánh, góp ý của người dân, tổ chức và doanh nghiệp qua Website."
      />

      <div className="mx-auto grid w-full max-w-[1600px] gap-5 px-3 py-6 sm:px-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <section className="rounded-xl border border-border bg-card p-5">
          <h2 className="section-title mb-4 text-base">
            <Send className="size-5" aria-hidden />
            Gửi phản ánh, góp ý
          </h2>

          {sent ? (
            <div className="rounded-lg border border-brand bg-accent p-4 text-sm">
              <p className="font-bold text-brand">Đã ghi nhận nội dung của bạn.</p>
              <p className="mt-1 text-muted-foreground">
                Nội dung sẽ được chuyển đến bộ phận phụ trách xử lý theo Quy trình tiếp nhận, xử lý
                phản ánh, kiến nghị của Trung tâm.
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setForm({ name: "", phone: "", email: "", topic: topics[0], message: "" });
                }}
                className="mt-3 rounded-full bg-brand px-4 py-1.5 text-xs font-bold text-brand-foreground hover:bg-brand-dark"
              >
                Gửi nội dung khác
              </button>
            </div>
          ) : (
            <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
              <label className="space-y-1.5 text-xs font-bold uppercase text-muted-foreground">
                Họ và tên
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm font-normal normal-case text-foreground outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Nguyễn Văn A"
                />
              </label>
              <label className="space-y-1.5 text-xs font-bold uppercase text-muted-foreground">
                Số điện thoại
                <input
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm font-normal normal-case text-foreground outline-none focus:ring-2 focus:ring-ring"
                  placeholder="0901 234 567"
                />
              </label>
              <label className="space-y-1.5 text-xs font-bold uppercase text-muted-foreground">
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm font-normal normal-case text-foreground outline-none focus:ring-2 focus:ring-ring"
                  placeholder="email@example.com"
                />
              </label>
              <label className="space-y-1.5 text-xs font-bold uppercase text-muted-foreground">
                Lĩnh vực phản ánh
                <select
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm font-normal normal-case text-foreground outline-none focus:ring-2 focus:ring-ring"
                >
                  {topics.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <label className="space-y-1.5 text-xs font-bold uppercase text-muted-foreground sm:col-span-2">
                Nội dung phản ánh, góp ý
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background p-3 text-sm font-normal normal-case text-foreground outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Mô tả cụ thể nội dung, địa điểm và thời gian xảy ra sự việc..."
                />
              </label>
              {createMutation.isError && (
                <p className="text-xs text-destructive sm:col-span-2">
                  Có lỗi khi gửi. Vui lòng thử lại.
                </p>
              )}
              <button
                type="submit"
                disabled={createMutation.isPending}
                className="h-11 rounded-lg bg-brand px-6 text-sm font-bold text-brand-foreground hover:bg-brand-dark disabled:opacity-50 sm:col-span-2"
              >
                {createMutation.isPending ? "Đang gửi..." : "Gửi ý kiến"}
              </button>
            </form>
          )}
        </section>

        <section className="space-y-4">
          <div className="space-y-3 rounded-xl border border-border bg-card p-5 text-sm">
            <h2 className="section-title text-base">Thông tin liên hệ</h2>
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
              <span>
                {settings?.address ?? ""}, {settings?.address_2 ?? ""}
              </span>
            </p>
            <p className="flex items-start gap-2">
              <Phone className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
              <span>
                {settings?.hotline ?? ""} {settings?.hotline_note ?? ""}
              </span>
            </p>
            <p className="flex items-start gap-2">
              <Mail className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
              <a href={`mailto:${settings?.email ?? ""}`} className="text-brand hover:underline">
                {settings?.email ?? ""}
              </a>
            </p>
            <div className="flex gap-2 pt-1">
              <a
                href={settings?.facebook_url ?? "#"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-xs font-bold text-brand-foreground hover:bg-brand-dark"
              >
                <Facebook className="size-4" aria-hidden />
                Fanpage
              </a>
              <a
                href={settings?.zalo_url ?? "#"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:bg-accent"
              >
                <MessageCircle className="size-4" aria-hidden />
                Zalo OA
              </a>
            </div>
          </div>

          <iframe
            title="Bản đồ trụ sở Trung tâm Cung ứng dịch vụ công phường Phú Thạnh"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              `${settings?.address ?? ""}, ${settings?.address_2 ?? ""}`,
            )}&output=embed`}
            className="h-80 w-full rounded-xl border border-border"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      </div>
    </>
  );
}
