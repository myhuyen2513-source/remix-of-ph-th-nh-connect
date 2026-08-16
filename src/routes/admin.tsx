import { createFileRoute } from "@tanstack/react-router";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { useState } from "react";

import logo from "@/assets/logo-ttcu.jpg.asset.json";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Đăng nhập quản trị | Trung tâm Cung ứng dịch vụ công phường Phú Thạnh" },
      {
        name: "description",
        content:
          "Khu vực đăng nhập dành cho cán bộ được phân quyền quản trị, biên tập và nhập liệu nội dung Website của Trung tâm.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Đăng nhập quản trị Website Trung tâm" },
      { property: "og:description", content: "Khu vực bảo mật dành cho cán bộ được phân quyền." },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const [note, setNote] = useState(false);

  return (
    <div className="mx-auto w-full max-w-md px-3 py-10 sm:px-5">
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <img
            src={logo.url}
            alt="Logo Trung tâm Cung ứng dịch vụ công phường Phú Thạnh"
            width={96}
            height={96}
            className="size-16 rounded-full object-contain"
          />
          <h1 className="text-lg font-extrabold uppercase text-brand">Đăng nhập quản trị</h1>
          <p className="text-xs text-muted-foreground">
            Khu vực bảo mật dành cho Quản trị viên, Biên tập viên và Cộng tác viên của Trung tâm.
          </p>
        </div>

        <form
          className="mt-5 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            setNote(true);
          }}
        >
          <label className="block space-y-1.5 text-xs font-bold uppercase text-muted-foreground">
            Tên đăng nhập
            <input
              required
              className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm font-normal normal-case text-foreground outline-none focus:ring-2 focus:ring-ring"
              placeholder="canbo.phuthanh"
            />
          </label>
          <label className="block space-y-1.5 text-xs font-bold uppercase text-muted-foreground">
            Mật khẩu
            <input
              required
              type="password"
              className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm font-normal normal-case text-foreground outline-none focus:ring-2 focus:ring-ring"
              placeholder="••••••••"
            />
          </label>
          <button className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand text-sm font-bold text-brand-foreground hover:bg-brand-dark">
            <LockKeyhole className="size-4" aria-hidden />
            Đăng nhập
          </button>
        </form>

        {note && (
          <p className="mt-4 rounded-lg border border-brand bg-accent p-3 text-xs">
            Hệ thống xác thực và phân quyền (Quản trị viên / Biên tập viên / Cộng tác viên) sẽ hoạt
            động sau khi kích hoạt cơ sở dữ liệu và máy chủ cho Website.
          </p>
        )}

        <p className="mt-4 flex items-start gap-2 text-[11px] text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
          Mọi truy cập đều được ghi nhận. Nghiêm cấm sử dụng tài khoản của người khác để đăng tải nội
          dung trên Website.
        </p>
      </div>
    </div>
  );
}