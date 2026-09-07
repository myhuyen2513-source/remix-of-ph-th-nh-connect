import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarDays,
  ChevronRight,
  FileText,
  Images,
  Landmark,
  Layers,
  Megaphone,
  Plus,
  Settings,
  Star,
  Trash2,
  Users,
  Video,
  X,
} from "lucide-react";
import { useState } from "react";

import {
  useCategories,
  useContacts,
  useCreateCategory,
  useCreateEvent,
  useCreateHonorSlide,
  useCreateMediaDocument,
  useCreateMediaImage,
  useCreateMediaVideo,
  useCreatePollOption,
  useCreatePost,
  useCreatePublicService,
  useCreateThematic,
  useDeleteCategory,
  useDeleteContact,
  useDeleteEvent,
  useDeleteHonorSlide,
  useDeleteMediaDocument,
  useDeleteMediaImage,
  useDeleteMediaVideo,
  useDeletePollOption,
  useDeletePost,
  useDeletePublicService,
  useDeleteThematic,
  useEvents,
  useHonorSlides,
  useMediaDocuments,
  useMediaImages,
  useMediaVideos,
  usePollOptions,
  usePosts,
  usePublicServices,
  useSettings,
  useThematics,
  useUpdateSettings,
} from "@/lib/hooks";
import { resolveImage } from "@/lib/images";
import type { Attachment } from "@/lib/types";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Quản trị nội dung | Trung tâm Cung ứng dịch vụ công phường Phú Thạnh" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPanel,
});

type Tab =
  | "settings"
  | "posts"
  | "categories"
  | "events"
  | "honor"
  | "services"
  | "thematics"
  | "mediaImages"
  | "mediaVideos"
  | "mediaDocs"
  | "polls"
  | "contacts";

const tabs: { id: Tab; label: string; icon: typeof Settings }[] = [
  { id: "settings", label: "Cài đặt chung", icon: Settings },
  { id: "posts", label: "Tin tức", icon: FileText },
  { id: "categories", label: "Danh mục", icon: Layers },
  { id: "events", label: "Sự kiện", icon: CalendarDays },
  { id: "honor", label: "Bảng Vàng", icon: Star },
  { id: "services", label: "Dịch vụ công", icon: Landmark },
  { id: "thematics", label: "Chuyên đề", icon: Layers },
  { id: "mediaImages", label: "Thư viện ảnh", icon: Images },
  { id: "mediaVideos", label: "Kho video", icon: Video },
  { id: "mediaDocs", label: "Tài liệu", icon: FileText },
  { id: "polls", label: "Thăm dò", icon: Megaphone },
  { id: "contacts", label: "Góp ý", icon: Users },
];

function LoginGate({ onSuccess }: { onSuccess: () => void }) {
  const { data: settings } = useSettings();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (settings && password === settings.admin_password) {
      sessionStorage.setItem("ttcudvc_admin", "1");
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-xl border border-border bg-card p-6"
      >
        <div className="text-center">
          <h1 className="text-xl font-extrabold text-brand">Đăng nhập quản trị</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Vui lòng nhập mật khẩu để truy cập trang quản trị nội dung.
          </p>
        </div>
        <Label>
          Mật khẩu
          <Input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            autoFocus
            placeholder="••••••••"
          />
        </Label>
        {error && (
          <p className="text-xs font-bold text-destructive">
            Mật khẩu không đúng. Vui lòng thử lại.
          </p>
        )}
        <BtnPrimary type="submit" className="w-full" disabled={!settings}>
          {settings ? "Đăng nhập" : "Đang tải..."}
        </BtnPrimary>
        <Link to="/" className="block text-center text-xs text-muted-foreground hover:underline">
          ← Quay lại trang chủ
        </Link>
      </form>
    </div>
  );
}

function AdminPanel() {
  const [tab, setTab] = useState<Tab>("settings");
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("ttcudvc_admin") === "1");

  if (!authed) {
    return <LoginGate onSuccess={() => setAuthed(true)} />;
  }

  return (
    <div className="mx-auto w-full max-w-[1600px] px-3 py-6 sm:px-5">
      <div className="mb-4 flex items-center gap-2 text-xs">
        <Link to="/" className="text-brand hover:underline">
          Trang chủ
        </Link>
        <ChevronRight className="size-3.5" aria-hidden />
        <span className="font-bold">Quản trị nội dung</span>
        <button
          onClick={() => {
            sessionStorage.removeItem("ttcudvc_admin");
            setAuthed(false);
          }}
          className="ml-auto text-xs font-bold text-muted-foreground hover:text-destructive"
        >
          Đăng xuất
        </button>
      </div>

      <h1 className="mb-4 text-2xl font-extrabold text-brand">Bảng điều khiển quản trị</h1>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,200px)_minmax(0,1fr)]">
        <nav className="flex flex-wrap gap-1 lg:flex-col">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold uppercase transition-colors ${
                tab === t.id
                  ? "bg-brand text-brand-foreground"
                  : "border border-border bg-card hover:bg-accent"
              }`}
            >
              <t.icon className="size-4" aria-hidden />
              {t.label}
            </button>
          ))}
        </nav>

        <div className="min-w-0">
          {tab === "settings" && <SettingsPanel />}
          {tab === "posts" && <PostsPanel />}
          {tab === "categories" && <CategoriesPanel />}
          {tab === "events" && <EventsPanel />}
          {tab === "honor" && <HonorPanel />}
          {tab === "services" && <ServicesPanel />}
          {tab === "thematics" && <ThematicsPanel />}
          {tab === "mediaImages" && <MediaImagesPanel />}
          {tab === "mediaVideos" && <MediaVideosPanel />}
          {tab === "mediaDocs" && <MediaDocsPanel />}
          {tab === "polls" && <PollsPanel />}
          {tab === "contacts" && <ContactsPanel />}
        </div>
      </div>
    </div>
  );
}

// ── Shared UI helpers ──────────────────────────────────────────
function PanelCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card p-4">
      <h2 className="section-title mb-3 text-base">{title}</h2>
      {children}
    </section>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring ${props.className ?? ""}`}
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-lg border border-border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring ${props.className ?? ""}`}
    />
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block space-y-1 text-xs font-bold uppercase text-muted-foreground">
      {children}
    </label>
  );
}

function BtnPrimary({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-brand px-4 text-sm font-bold text-brand-foreground transition-colors hover:bg-brand-dark disabled:opacity-50 ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
}

function BtnDanger({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex size-9 items-center justify-center rounded-lg border border-border text-destructive transition-colors hover:bg-destructive/10 ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-foreground/80 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-border bg-card p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-brand">{title}</h2>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-accent">
            <X className="size-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── Settings Panel ─────────────────────────────────────────────
function SettingsPanel() {
  const { data: settings } = useSettings();
  const updateMutation = useUpdateSettings();
  const [form, setForm] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  if (!settings) return <p className="text-sm text-muted-foreground">Đang tải...</p>;
  const val = (key: string) => form[key] ?? String((settings as Record<string, unknown>)[key] ?? "");

  const fields: { key: string; label: string; type?: string }[] = [
    { key: "org_name", label: "Tên cơ quan" },
    { key: "org_name_2", label: "Tên đơn vị" },
    { key: "slogan", label: "Khẩu hiệu" },
    { key: "welcome_text", label: "Lời chào" },
    { key: "hotline", label: "Đường dây nóng" },
    { key: "hotline_note", label: "Ghi chú hotline" },
    { key: "email", label: "Email" },
    { key: "website", label: "Website" },
    { key: "address", label: "Địa chỉ" },
    { key: "address_2", label: "Địa chỉ (phần 2)" },
    { key: "facebook_url", label: "Facebook URL" },
    { key: "zalo_url", label: "Zalo URL" },
    { key: "dvc_url", label: "Cổng DVC URL" },
    { key: "ubnd_url", label: "UBND URL" },
    { key: "alert_text", label: "Nội dung thông báo khẩn" },
  ];

  return (
    <PanelCard title="Cài đặt chung">
      <div className="grid gap-3 sm:grid-cols-2">
        {fields.map((f) => (
          <Label key={f.key}>
            {f.label}
            <Input value={val(f.key)} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
          </Label>
        ))}
        <Label>
          Hiển thị thông báo khẩn
          <select
            value={val("is_alert_active")}
            onChange={(e) => setForm({ ...form, is_alert_active: e.target.value })}
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
          >
            <option value="true">Bật</option>
            <option value="false">Tắt</option>
          </select>
        </Label>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <BtnPrimary
          onClick={() => {
            const patch: Record<string, unknown> = {};
            for (const k of Object.keys(form)) {
              if (k === "is_alert_active") patch[k] = form[k] === "true";
              else patch[k] = form[k];
            }
            updateMutation.mutate(patch, { onSuccess: () => setSaved(true) });
          }}
          disabled={updateMutation.isPending}
        >
          {updateMutation.isPending ? "Đang lưu..." : "Lưu thay đổi"}
        </BtnPrimary>
        {saved && <span className="text-xs font-semibold text-cat-moitruong">Đã lưu!</span>}
      </div>

      <div className="mt-6 border-t border-border pt-4">
        <h3 className="mb-2 text-sm font-bold text-brand">Đổi mật khẩu quản trị</h3>
        <div className="flex flex-wrap items-end gap-3">
          <Label>
            Mật khẩu mới
            <Input
              type="password"
              value={form.admin_password ?? ""}
              onChange={(e) => setForm({ ...form, admin_password: e.target.value })}
              placeholder="••••••••"
            />
          </Label>
          <BtnPrimary
            onClick={() => {
              if (!form.admin_password) return;
              updateMutation.mutate({ admin_password: form.admin_password }, { onSuccess: () => setSaved(true) });
            }}
            disabled={updateMutation.isPending || !form.admin_password}
          >
            Đổi mật khẩu
          </BtnPrimary>
        </div>
      </div>
    </PanelCard>
  );
}

// ── Posts Panel ───────────────────────────────────────────────
function PostsPanel() {
  const { data: posts } = usePosts();
  const deleteMutation = useDeletePost();
  const [editing, setEditing] = useState<number | "new" | null>(null);
  const list = posts ?? [];

  return (
    <PanelCard title="Quản lý tin tức">
      <button
        onClick={() => setEditing("new")}
        className="mb-3 inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-xs font-bold text-brand-foreground hover:bg-brand-dark"
      >
        <Plus className="size-4" />
        Thêm bài viết
      </button>
      <ul className="space-y-2">
        {list.map((p) => (
          <li key={p.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
            <img
              src={resolveImage(p.image)}
              alt={p.title}
              className="size-12 shrink-0 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{p.title}</p>
              <p className="text-xs text-muted-foreground">
                {p.category} · {p.date} {p.featured ? "· Tin nổi bật" : ""}
              </p>
            </div>
            <button
              onClick={() => setEditing(p.id)}
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-bold hover:bg-accent"
            >
              Sửa
            </button>
            <BtnDanger onClick={() => deleteMutation.mutate(p.id)}>
              <Trash2 className="size-4" />
            </BtnDanger>
          </li>
        ))}
      </ul>
      {editing !== null && (
        <PostEditModal postId={editing === "new" ? null : editing} onClose={() => setEditing(null)} />
      )}
    </PanelCard>
  );
}

function PostEditModal({ postId, onClose }: { postId: number | null; onClose: () => void }) {
  const { data: posts } = usePosts();
  const { data: categories } = useCategories();
  const createMutation = useCreatePost();
  const updateMutation = useUpdatePost();
  const existing = postId !== null ? posts?.find((p) => p.id === postId) : null;
  const cats = categories ?? [];

  const [form, setForm] = useState({
    slug: existing?.slug ?? "",
    title: existing?.title ?? "",
    excerpt: existing?.excerpt ?? "",
    body: (existing?.body ?? []).join("\n\n"),
    category: existing?.category ?? (cats[0]?.name ?? ""),
    audience: existing?.audience ?? "Tất cả",
    date: existing?.date ?? new Date().toLocaleDateString("vi-VN"),
    image: existing?.image ?? "",
    location: existing?.location ?? "",
    featured: existing?.featured ?? false,
    attachments: JSON.stringify(existing?.attachments ?? [], null, 2),
  });

  const handleSubmit = () => {
    const data = {
      slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      title: form.title,
      excerpt: form.excerpt,
      body: form.body.split("\n\n").filter(Boolean),
      category: form.category,
      audience: form.audience,
      date: form.date,
      image: form.image,
      location: form.location,
      featured: form.featured,
      attachments: JSON.parse(form.attachments || "[]") as Attachment[],
    };
    if (postId !== null) {
      updateMutation.mutate({ id: postId, data }, { onSuccess: onClose });
    } else {
      createMutation.mutate(data, { onSuccess: onClose });
    }
  };

  return (
    <Modal title={postId !== null ? "Sửa bài viết" : "Thêm bài viết"} onClose={onClose}>
      <div className="grid gap-3 sm:grid-cols-2">
        <Label>
          Tiêu đề
          <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </Label>
        <Label>
          Đường dẫn (slug)
          <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        </Label>
        <Label>
          Danh mục
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
          >
            {cats.map((c) => (
              <option key={c.id}>{c.name}</option>
            ))}
          </select>
        </Label>
        <Label>
          Đối tượng
          <select
            value={form.audience}
            onChange={(e) => setForm({ ...form, audience: e.target.value })}
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
          >
            <option>Tất cả</option>
            <option>Thiếu nhi</option>
            <option>Thanh niên</option>
            <option>Người cao tuổi</option>
          </select>
        </Label>
        <Label>
          Ngày (dd/mm/yyyy)
          <Input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        </Label>
        <Label>
          Đường dẫn ảnh
          <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        </Label>
        <Label>
          Vị trí
          <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        </Label>
        <Label>
          Tin nổi bật
          <select
            value={String(form.featured)}
            onChange={(e) => setForm({ ...form, featured: e.target.value === "true" })}
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
          >
            <option value="false">Không</option>
            <option value="true">Có</option>
          </select>
        </Label>
        <div className="sm:col-span-2">
          <Label>
            Mô tả ngắn
            <TextArea rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
          </Label>
        </div>
        <div className="sm:col-span-2">
          <Label>
            Nội dung (ngăn cách đoạn bằng dòng trống)
            <TextArea rows={5} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
          </Label>
        </div>
        <div className="sm:col-span-2">
          <Label>
            Tài liệu đính kèm (JSON)
            <TextArea rows={3} value={form.attachments} onChange={(e) => setForm({ ...form, attachments: e.target.value })} />
          </Label>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <BtnPrimary onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending}>
          {createMutation.isPending || updateMutation.isPending ? "Đang lưu..." : "Lưu"}
        </BtnPrimary>
        <button onClick={onClose} className="rounded-lg border border-border px-4 text-sm font-bold hover:bg-accent">
          Hủy
        </button>
      </div>
    </Modal>
  );
}

// ── Categories Panel ──────────────────────────────────────────
function CategoriesPanel() {
  const { data: categories } = useCategories();
  const deleteMutation = useDeleteCategory();
  const [editing, setEditing] = useState<number | "new" | null>(null);
  const list = categories ?? [];

  return (
    <PanelCard title="Quản lý danh mục">
      <button
        onClick={() => setEditing("new")}
        className="mb-3 inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-xs font-bold text-brand-foreground hover:bg-brand-dark"
      >
        <Plus className="size-4" />
        Thêm danh mục
      </button>
      <ul className="space-y-2">
        {list.map((c) => (
          <li key={c.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
            <span className="size-6 rounded-full" style={{ backgroundColor: c.color_var }} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{c.name}</p>
              <p className="truncate text-xs text-muted-foreground">{c.slug}</p>
            </div>
            <button onClick={() => setEditing(c.id)} className="rounded-lg border border-border px-3 py-1.5 text-xs font-bold hover:bg-accent">
              Sửa
            </button>
            <BtnDanger onClick={() => deleteMutation.mutate(c.id)}>
              <Trash2 className="size-4" />
            </BtnDanger>
          </li>
        ))}
      </ul>
      {editing !== null && (
        <CategoryEditModal categoryId={editing === "new" ? null : editing} onClose={() => setEditing(null)} />
      )}
    </PanelCard>
  );
}

function CategoryEditModal({ categoryId, onClose }: { categoryId: number | null; onClose: () => void }) {
  const { data: categories } = useCategories();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const existing = categoryId !== null ? categories?.find((c) => c.id === categoryId) : null;

  const [form, setForm] = useState({
    slug: existing?.slug ?? "",
    name: existing?.name ?? "",
    color_var: existing?.color_var ?? "var(--color-brand)",
    bullets: (existing?.bullets ?? []).join("\n"),
    image: existing?.image ?? "",
  });

  const handleSubmit = () => {
    const data = {
      slug: form.slug,
      name: form.name,
      color_var: form.color_var,
      bullets: form.bullets.split("\n").filter(Boolean),
      image: form.image,
    };
    if (categoryId !== null) {
      updateMutation.mutate({ id: categoryId, data }, { onSuccess: onClose });
    } else {
      createMutation.mutate(data, { onSuccess: onClose });
    }
  };

  return (
    <Modal title={categoryId !== null ? "Sửa danh mục" : "Thêm danh mục"} onClose={onClose}>
      <div className="grid gap-3">
        <Label>
          Tên danh mục
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </Label>
        <Label>
          Đường dẫn (slug)
          <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        </Label>
        <Label>
          Màu (CSS variable)
          <Input value={form.color_var} onChange={(e) => setForm({ ...form, color_var: e.target.value })} />
        </Label>
        <Label>
          Đường dẫn ảnh
          <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        </Label>
        <Label>
          Gạch đầu dòng (mỗi dòng một mục)
          <TextArea rows={4} value={form.bullets} onChange={(e) => setForm({ ...form, bullets: e.target.value })} />
        </Label>
      </div>
      <div className="mt-4 flex gap-2">
        <BtnPrimary onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending}>
          {createMutation.isPending || updateMutation.isPending ? "Đang lưu..." : "Lưu"}
        </BtnPrimary>
        <button onClick={onClose} className="rounded-lg border border-border px-4 text-sm font-bold hover:bg-accent">
          Hủy
        </button>
      </div>
    </Modal>
  );
}

// ── Events Panel ──────────────────────────────────────────────
function EventsPanel() {
  const { data: events } = useEvents();
  const deleteMutation = useDeleteEvent();
  const [editing, setEditing] = useState<number | "new" | null>(null);
  const list = events ?? [];

  return (
    <PanelCard title="Quản lý sự kiện">
      <button
        onClick={() => setEditing("new")}
        className="mb-3 inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-xs font-bold text-brand-foreground hover:bg-brand-dark"
      >
        <Plus className="size-4" />
        Thêm sự kiện
      </button>
      <ul className="space-y-2">
        {list.map((e) => (
          <li key={e.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
            <div className="flex size-10 shrink-0 flex-col items-center justify-center rounded-lg bg-brand text-brand-foreground">
              <span className="text-sm font-extrabold">{e.day}</span>
              <span className="text-[9px]">T{e.month}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{e.title}</p>
              <p className="text-xs text-muted-foreground">{e.time} - {e.place}</p>
            </div>
            <button onClick={() => setEditing(e.id)} className="rounded-lg border border-border px-3 py-1.5 text-xs font-bold hover:bg-accent">
              Sửa
            </button>
            <BtnDanger onClick={() => deleteMutation.mutate(e.id)}>
              <Trash2 className="size-4" />
            </BtnDanger>
          </li>
        ))}
      </ul>
      {editing !== null && (
        <EventEditModal eventId={editing === "new" ? null : editing} onClose={() => setEditing(null)} />
      )}
    </PanelCard>
  );
}

function EventEditModal({ eventId, onClose }: { eventId: number | null; onClose: () => void }) {
  const { data: events } = useEvents();
  const createMutation = useCreateEvent();
  const updateMutation = useUpdateEvent();
  const existing = eventId !== null ? events?.find((e) => e.id === eventId) : null;

  const [form, setForm] = useState({
    day: String(existing?.day ?? 1),
    month: String(existing?.month ?? 6),
    title: existing?.title ?? "",
    time: existing?.time ?? "",
    place: existing?.place ?? "",
  });

  const handleSubmit = () => {
    const data = {
      day: parseInt(form.day),
      month: parseInt(form.month),
      title: form.title,
      time: form.time,
      place: form.place,
    };
    if (eventId !== null) {
      updateMutation.mutate({ id: eventId, data }, { onSuccess: onClose });
    } else {
      createMutation.mutate(data, { onSuccess: onClose });
    }
  };

  return (
    <Modal title={eventId !== null ? "Sửa sự kiện" : "Thêm sự kiện"} onClose={onClose}>
      <div className="grid gap-3 sm:grid-cols-2">
        <Label>
          Ngày
          <Input type="number" value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })} />
        </Label>
        <Label>
          Tháng
          <Input type="number" value={form.month} onChange={(e) => setForm({ ...form, month: e.target.value })} />
        </Label>
        <div className="sm:col-span-2">
          <Label>
            Tên sự kiện
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </Label>
        </div>
        <Label>
          Giờ
          <Input value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
        </Label>
        <Label>
          Địa điểm
          <Input value={form.place} onChange={(e) => setForm({ ...form, place: e.target.value })} />
        </Label>
      </div>
      <div className="mt-4 flex gap-2">
        <BtnPrimary onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending}>
          {createMutation.isPending || updateMutation.isPending ? "Đang lưu..." : "Lưu"}
        </BtnPrimary>
        <button onClick={onClose} className="rounded-lg border border-border px-4 text-sm font-bold hover:bg-accent">
          Hủy
        </button>
      </div>
    </Modal>
  );
}

// ── Honor Slides Panel ────────────────────────────────────────
function HonorPanel() {
  const { data: slides } = useHonorSlides();
  const deleteMutation = useDeleteHonorSlide();
  const [editing, setEditing] = useState<number | "new" | null>(null);
  const list = slides ?? [];

  return (
    <PanelCard title="Quản lý Bảng Vàng Danh Dự">
      <button
        onClick={() => setEditing("new")}
        className="mb-3 inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-xs font-bold text-brand-foreground hover:bg-brand-dark"
      >
        <Plus className="size-4" />
        Thêm gương điển hình
      </button>
      <ul className="space-y-2">
        {list.map((s) => (
          <li key={s.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
            <img src={resolveImage(s.image)} alt={s.title} className="size-12 shrink-0 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{s.title}</p>
              <p className="truncate text-xs text-muted-foreground">{s.subtitle}</p>
            </div>
            <button onClick={() => setEditing(s.id)} className="rounded-lg border border-border px-3 py-1.5 text-xs font-bold hover:bg-accent">
              Sửa
            </button>
            <BtnDanger onClick={() => deleteMutation.mutate(s.id)}>
              <Trash2 className="size-4" />
            </BtnDanger>
          </li>
        ))}
      </ul>
      {editing !== null && (
        <HonorEditModal slideId={editing === "new" ? null : editing} onClose={() => setEditing(null)} />
      )}
    </PanelCard>
  );
}

function HonorEditModal({ slideId, onClose }: { slideId: number | null; onClose: () => void }) {
  const { data: slides } = useHonorSlides();
  const createMutation = useCreateHonorSlide();
  const updateMutation = useUpdateHonorSlide();
  const existing = slideId !== null ? slides?.find((s) => s.id === slideId) : null;

  const [form, setForm] = useState({
    title: existing?.title ?? "",
    subtitle: existing?.subtitle ?? "",
    image: existing?.image ?? "",
  });

  const handleSubmit = () => {
    if (slideId !== null) {
      updateMutation.mutate({ id: slideId, data: form }, { onSuccess: onClose });
    } else {
      createMutation.mutate(form, { onSuccess: onClose });
    }
  };

  return (
    <Modal title={slideId !== null ? "Sửa gương điển hình" : "Thêm gương điển hình"} onClose={onClose}>
      <div className="grid gap-3">
        <Label>
          Tiêu đề
          <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </Label>
        <Label>
          Mô tả
          <Input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
        </Label>
        <Label>
          Đường dẫn ảnh
          <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        </Label>
      </div>
      <div className="mt-4 flex gap-2">
        <BtnPrimary onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending}>
          {createMutation.isPending || updateMutation.isPending ? "Đang lưu..." : "Lưu"}
        </BtnPrimary>
        <button onClick={onClose} className="rounded-lg border border-border px-4 text-sm font-bold hover:bg-accent">
          Hủy
        </button>
      </div>
    </Modal>
  );
}

// ── Services Panel ────────────────────────────────────────────
function ServicesPanel() {
  const { data: services } = usePublicServices();
  const deleteMutation = useDeletePublicService();
  const [editing, setEditing] = useState<number | "new" | null>(null);
  const list = services ?? [];

  return (
    <PanelCard title="Quản lý dịch vụ công">
      <button
        onClick={() => setEditing("new")}
        className="mb-3 inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-xs font-bold text-brand-foreground hover:bg-brand-dark"
      >
        <Plus className="size-4" />
        Thêm dịch vụ
      </button>
      <ul className="space-y-2">
        {list.map((s) => (
          <li key={s.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{s.name}</p>
              <p className="truncate text-xs text-muted-foreground">{s.description}</p>
            </div>
            <button onClick={() => setEditing(s.id)} className="rounded-lg border border-border px-3 py-1.5 text-xs font-bold hover:bg-accent">
              Sửa
            </button>
            <BtnDanger onClick={() => deleteMutation.mutate(s.id)}>
              <Trash2 className="size-4" />
            </BtnDanger>
          </li>
        ))}
      </ul>
      {editing !== null && (
        <ServiceEditModal serviceId={editing === "new" ? null : editing} onClose={() => setEditing(null)} />
      )}
    </PanelCard>
  );
}

function ServiceEditModal({ serviceId, onClose }: { serviceId: number | null; onClose: () => void }) {
  const { data: services } = usePublicServices();
  const createMutation = useCreatePublicService();
  const updateMutation = useUpdatePublicService();
  const existing = serviceId !== null ? services?.find((s) => s.id === serviceId) : null;

  const [form, setForm] = useState({
    slug: existing?.slug ?? "",
    name: existing?.name ?? "",
    description: existing?.description ?? "",
  });

  const handleSubmit = () => {
    if (serviceId !== null) {
      updateMutation.mutate({ id: serviceId, data: form }, { onSuccess: onClose });
    } else {
      createMutation.mutate(form, { onSuccess: onClose });
    }
  };

  return (
    <Modal title={serviceId !== null ? "Sửa dịch vụ" : "Thêm dịch vụ"} onClose={onClose}>
      <div className="grid gap-3">
        <Label>
          Tên dịch vụ
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </Label>
        <Label>
          Đường dẫn (slug)
          <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        </Label>
        <Label>
          Mô tả
          <TextArea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </Label>
      </div>
      <div className="mt-4 flex gap-2">
        <BtnPrimary onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending}>
          {createMutation.isPending || updateMutation.isPending ? "Đang lưu..." : "Lưu"}
        </BtnPrimary>
        <button onClick={onClose} className="rounded-lg border border-border px-4 text-sm font-bold hover:bg-accent">
          Hủy
        </button>
      </div>
    </Modal>
  );
}

// ── Thematics Panel ───────────────────────────────────────────
function ThematicsPanel() {
  const { data: thematics } = useThematics();
  const deleteMutation = useDeleteThematic();
  const [editing, setEditing] = useState<number | "new" | null>(null);
  const list = thematics ?? [];

  return (
    <PanelCard title="Quản lý chuyên đề">
      <button
        onClick={() => setEditing("new")}
        className="mb-3 inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-xs font-bold text-brand-foreground hover:bg-brand-dark"
      >
        <Plus className="size-4" />
        Thêm chuyên đề
      </button>
      <ul className="space-y-2">
        {list.map((t) => (
          <li key={t.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
            <img src={resolveImage(t.image)} alt={t.name} className="size-12 shrink-0 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{t.name}</p>
              <p className="truncate text-xs text-muted-foreground">{t.description}</p>
            </div>
            <button onClick={() => setEditing(t.id)} className="rounded-lg border border-border px-3 py-1.5 text-xs font-bold hover:bg-accent">
              Sửa
            </button>
            <BtnDanger onClick={() => deleteMutation.mutate(t.id)}>
              <Trash2 className="size-4" />
            </BtnDanger>
          </li>
        ))}
      </ul>
      {editing !== null && (
        <ThematicEditModal thematicId={editing === "new" ? null : editing} onClose={() => setEditing(null)} />
      )}
    </PanelCard>
  );
}

function ThematicEditModal({ thematicId, onClose }: { thematicId: number | null; onClose: () => void }) {
  const { data: thematics } = useThematics();
  const createMutation = useCreateThematic();
  const updateMutation = useUpdateThematic();
  const existing = thematicId !== null ? thematics?.find((t) => t.id === thematicId) : null;

  const [form, setForm] = useState({
    slug: existing?.slug ?? "",
    name: existing?.name ?? "",
    description: existing?.description ?? "",
    image: existing?.image ?? "",
  });

  const handleSubmit = () => {
    if (thematicId !== null) {
      updateMutation.mutate({ id: thematicId, data: form }, { onSuccess: onClose });
    } else {
      createMutation.mutate(form, { onSuccess: onClose });
    }
  };

  return (
    <Modal title={thematicId !== null ? "Sửa chuyên đề" : "Thêm chuyên đề"} onClose={onClose}>
      <div className="grid gap-3">
        <Label>
          Tên chuyên đề
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </Label>
        <Label>
          Đường dẫn (slug)
          <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        </Label>
        <Label>
          Đường dẫn ảnh
          <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        </Label>
        <Label>
          Mô tả
          <TextArea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </Label>
      </div>
      <div className="mt-4 flex gap-2">
        <BtnPrimary onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending}>
          {createMutation.isPending || updateMutation.isPending ? "Đang lưu..." : "Lưu"}
        </BtnPrimary>
        <button onClick={onClose} className="rounded-lg border border-border px-4 text-sm font-bold hover:bg-accent">
          Hủy
        </button>
      </div>
    </Modal>
  );
}

// ── Media Images Panel ────────────────────────────────────────
function MediaImagesPanel() {
  const { data: images } = useMediaImages();
  const deleteMutation = useDeleteMediaImage();
  const [editing, setEditing] = useState<number | "new" | null>(null);
  const list = images ?? [];

  return (
    <PanelCard title="Quản lý thư viện ảnh">
      <button
        onClick={() => setEditing("new")}
        className="mb-3 inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-xs font-bold text-brand-foreground hover:bg-brand-dark"
      >
        <Plus className="size-4" />
        Thêm ảnh
      </button>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((m) => (
          <div key={m.id} className="rounded-lg border border-border p-3">
            <img src={resolveImage(m.image)} alt={m.title} className="mb-2 aspect-[16/9] w-full rounded-lg object-cover" />
            <p className="truncate text-sm font-semibold">{m.title}</p>
            <p className="text-xs text-muted-foreground">{m.date}</p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => setEditing(m.id)} className="rounded-lg border border-border px-3 py-1 text-xs font-bold hover:bg-accent">
                Sửa
              </button>
              <BtnDanger onClick={() => deleteMutation.mutate(m.id)}>
                <Trash2 className="size-4" />
              </BtnDanger>
            </div>
          </div>
        ))}
      </div>
      {editing !== null && (
        <MediaImageEditModal imageId={editing === "new" ? null : editing} onClose={() => setEditing(null)} />
      )}
    </PanelCard>
  );
}

function MediaImageEditModal({ imageId, onClose }: { imageId: number | null; onClose: () => void }) {
  const { data: images } = useMediaImages();
  const createMutation = useCreateMediaImage();
  const updateMutation = useUpdateMediaImage();
  const existing = imageId !== null ? images?.find((m) => m.id === imageId) : null;

  const [form, setForm] = useState({
    title: existing?.title ?? "",
    image: existing?.image ?? "",
    date: existing?.date ?? new Date().toLocaleDateString("vi-VN"),
  });

  const handleSubmit = () => {
    if (imageId !== null) {
      updateMutation.mutate({ id: imageId, data: form }, { onSuccess: onClose });
    } else {
      createMutation.mutate(form, { onSuccess: onClose });
    }
  };

  return (
    <Modal title={imageId !== null ? "Sửa ảnh" : "Thêm ảnh"} onClose={onClose}>
      <div className="grid gap-3">
        <Label>
          Tiêu đề
          <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </Label>
        <Label>
          Đường dẫn ảnh
          <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        </Label>
        <Label>
          Ngày
          <Input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        </Label>
      </div>
      <div className="mt-4 flex gap-2">
        <BtnPrimary onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending}>
          {createMutation.isPending || updateMutation.isPending ? "Đang lưu..." : "Lưu"}
        </BtnPrimary>
        <button onClick={onClose} className="rounded-lg border border-border px-4 text-sm font-bold hover:bg-accent">
          Hủy
        </button>
      </div>
    </Modal>
  );
}

// ── Media Videos Panel ────────────────────────────────────────
function MediaVideosPanel() {
  const { data: videos } = useMediaVideos();
  const deleteMutation = useDeleteMediaVideo();
  const [editing, setEditing] = useState<number | "new" | null>(null);
  const list = videos ?? [];

  return (
    <PanelCard title="Quản lý kho video">
      <button
        onClick={() => setEditing("new")}
        className="mb-3 inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-xs font-bold text-brand-foreground hover:bg-brand-dark"
      >
        <Plus className="size-4" />
        Thêm video
      </button>
      <ul className="space-y-2">
        {list.map((v) => (
          <li key={v.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{v.title}</p>
              <p className="text-xs text-muted-foreground">{v.source} · {v.date}</p>
            </div>
            <button onClick={() => setEditing(v.id)} className="rounded-lg border border-border px-3 py-1.5 text-xs font-bold hover:bg-accent">
              Sửa
            </button>
            <BtnDanger onClick={() => deleteMutation.mutate(v.id)}>
              <Trash2 className="size-4" />
            </BtnDanger>
          </li>
        ))}
      </ul>
      {editing !== null && (
        <MediaVideoEditModal videoId={editing === "new" ? null : editing} onClose={() => setEditing(null)} />
      )}
    </PanelCard>
  );
}

function MediaVideoEditModal({ videoId, onClose }: { videoId: number | null; onClose: () => void }) {
  const { data: videos } = useMediaVideos();
  const createMutation = useCreateMediaVideo();
  const updateMutation = useUpdateMediaVideo();
  const existing = videoId !== null ? videos?.find((v) => v.id === videoId) : null;

  const [form, setForm] = useState({
    title: existing?.title ?? "",
    source: existing?.source ?? "YouTube",
    embed_url: existing?.embed_url ?? "",
    date: existing?.date ?? new Date().toLocaleDateString("vi-VN"),
  });

  const handleSubmit = () => {
    if (videoId !== null) {
      updateMutation.mutate({ id: videoId, data: form }, { onSuccess: onClose });
    } else {
      createMutation.mutate(form, { onSuccess: onClose });
    }
  };

  return (
    <Modal title={videoId !== null ? "Sửa video" : "Thêm video"} onClose={onClose}>
      <div className="grid gap-3">
        <Label>
          Tiêu đề
          <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </Label>
        <Label>
          Nguồn
          <Input value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} />
        </Label>
        <Label>
          Embed URL
          <Input value={form.embed_url} onChange={(e) => setForm({ ...form, embed_url: e.target.value })} />
        </Label>
        <Label>
          Ngày
          <Input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        </Label>
      </div>
      <div className="mt-4 flex gap-2">
        <BtnPrimary onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending}>
          {createMutation.isPending || updateMutation.isPending ? "Đang lưu..." : "Lưu"}
        </BtnPrimary>
        <button onClick={onClose} className="rounded-lg border border-border px-4 text-sm font-bold hover:bg-accent">
          Hủy
        </button>
      </div>
    </Modal>
  );
}

// ── Media Documents Panel ─────────────────────────────────────
function MediaDocsPanel() {
  const { data: documents } = useMediaDocuments();
  const deleteMutation = useDeleteMediaDocument();
  const [editing, setEditing] = useState<number | "new" | null>(null);
  const list = documents ?? [];

  return (
    <PanelCard title="Quản lý tài liệu">
      <button
        onClick={() => setEditing("new")}
        className="mb-3 inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-xs font-bold text-brand-foreground hover:bg-brand-dark"
      >
        <Plus className="size-4" />
        Thêm tài liệu
      </button>
      <ul className="space-y-2">
        {list.map((d) => (
          <li key={d.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{d.title}</p>
              <p className="text-xs text-muted-foreground">{d.type} · {d.size} · {d.date}</p>
            </div>
            <button onClick={() => setEditing(d.id)} className="rounded-lg border border-border px-3 py-1.5 text-xs font-bold hover:bg-accent">
              Sửa
            </button>
            <BtnDanger onClick={() => deleteMutation.mutate(d.id)}>
              <Trash2 className="size-4" />
            </BtnDanger>
          </li>
        ))}
      </ul>
      {editing !== null && (
        <MediaDocEditModal docId={editing === "new" ? null : editing} onClose={() => setEditing(null)} />
      )}
    </PanelCard>
  );
}

function MediaDocEditModal({ docId, onClose }: { docId: number | null; onClose: () => void }) {
  const { data: documents } = useMediaDocuments();
  const createMutation = useCreateMediaDocument();
  const updateMutation = useUpdateMediaDocument();
  const existing = docId !== null ? documents?.find((d) => d.id === docId) : null;

  const [form, setForm] = useState({
    title: existing?.title ?? "",
    type: existing?.type ?? "PDF",
    size: existing?.size ?? "",
    date: existing?.date ?? new Date().toLocaleDateString("vi-VN"),
  });

  const handleSubmit = () => {
    if (docId !== null) {
      updateMutation.mutate({ id: docId, data: form }, { onSuccess: onClose });
    } else {
      createMutation.mutate(form, { onSuccess: onClose });
    }
  };

  return (
    <Modal title={docId !== null ? "Sửa tài liệu" : "Thêm tài liệu"} onClose={onClose}>
      <div className="grid gap-3">
        <Label>
          Tiêu đề
          <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </Label>
        <Label>
          Loại
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
          >
            <option>PDF</option>
            <option>Word</option>
          </select>
        </Label>
        <Label>
          Dung lượng
          <Input value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} />
        </Label>
        <Label>
          Ngày
          <Input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        </Label>
      </div>
      <div className="mt-4 flex gap-2">
        <BtnPrimary onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending}>
          {createMutation.isPending || updateMutation.isPending ? "Đang lưu..." : "Lưu"}
        </BtnPrimary>
        <button onClick={onClose} className="rounded-lg border border-border px-4 text-sm font-bold hover:bg-accent">
          Hủy
        </button>
      </div>
    </Modal>
  );
}

// ── Polls Panel ───────────────────────────────────────────────
function PollsPanel() {
  const { data: options } = usePollOptions();
  const deleteMutation = useDeletePollOption();
  const [editing, setEditing] = useState<number | "new" | null>(null);
  const list = options ?? [];

  return (
    <PanelCard title="Quản lý thăm dò ý kiến">
      <button
        onClick={() => setEditing("new")}
        className="mb-3 inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-xs font-bold text-brand-foreground hover:bg-brand-dark"
      >
        <Plus className="size-4" />
        Thêm phương án
      </button>
      <ul className="space-y-2">
        {list.map((o) => (
          <li key={o.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
            <span className="size-6 rounded-full" style={{ backgroundColor: o.color }} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{o.label}</p>
              <p className="text-xs text-muted-foreground">{o.value} lượt bình chọn</p>
            </div>
            <button onClick={() => setEditing(o.id)} className="rounded-lg border border-border px-3 py-1.5 text-xs font-bold hover:bg-accent">
              Sửa
            </button>
            <BtnDanger onClick={() => deleteMutation.mutate(o.id)}>
              <Trash2 className="size-4" />
            </BtnDanger>
          </li>
        ))}
      </ul>
      {editing !== null && (
        <PollEditModal pollId={editing === "new" ? null : editing} onClose={() => setEditing(null)} />
      )}
    </PanelCard>
  );
}

function PollEditModal({ pollId, onClose }: { pollId: number | null; onClose: () => void }) {
  const { data: options } = usePollOptions();
  const createMutation = useCreatePollOption();
  const updateMutation = useUpdatePollOption();
  const existing = pollId !== null ? options?.find((o) => o.id === pollId) : null;

  const [form, setForm] = useState({
    label: existing?.label ?? "",
    value: String(existing?.value ?? 0),
    color: existing?.color ?? "var(--color-brand)",
  });

  const handleSubmit = () => {
    const data = { label: form.label, value: parseInt(form.value) || 0, color: form.color };
    if (pollId !== null) {
      updateMutation.mutate({ id: pollId, data }, { onSuccess: onClose });
    } else {
      createMutation.mutate(data, { onSuccess: onClose });
    }
  };

  return (
    <Modal title={pollId !== null ? "Sửa phương án" : "Thêm phương án"} onClose={onClose}>
      <div className="grid gap-3">
        <Label>
          Nhãn
          <Input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} />
        </Label>
        <Label>
          Số lượt
          <Input type="number" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} />
        </Label>
        <Label>
          Màu (CSS variable)
          <Input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} />
        </Label>
      </div>
      <div className="mt-4 flex gap-2">
        <BtnPrimary onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending}>
          {createMutation.isPending || updateMutation.isPending ? "Đang lưu..." : "Lưu"}
        </BtnPrimary>
        <button onClick={onClose} className="rounded-lg border border-border px-4 text-sm font-bold hover:bg-accent">
          Hủy
        </button>
      </div>
    </Modal>
  );
}

// ── Contacts Panel ────────────────────────────────────────────
function ContactsPanel() {
  const { data: contacts } = useContacts();
  const deleteMutation = useDeleteContact();
  const list = contacts ?? [];

  return (
    <PanelCard title="Danh sách góp ý, phản ánh">
      {list.length === 0 ? (
        <p className="py-4 text-sm text-muted-foreground">Chưa có góp ý nào.</p>
      ) : (
        <ul className="space-y-2">
          {list.map((c) => (
            <li key={c.id} className="rounded-lg border border-border p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{c.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.phone} · {c.email} · {c.topic}
                  </p>
                </div>
                <BtnDanger onClick={() => deleteMutation.mutate(c.id)}>
                  <Trash2 className="size-4" />
                </BtnDanger>
              </div>
              <p className="mt-2 text-sm text-foreground">{c.message}</p>
            </li>
          ))}
        </ul>
      )}
    </PanelCard>
  );
}
