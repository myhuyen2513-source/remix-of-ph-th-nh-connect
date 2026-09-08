import { Link, useNavigate } from "@tanstack/react-router";
import { Facebook, Home, LogIn, MapPin, Menu, MessageCircle, Phone, Search, X } from "lucide-react";
import { useState } from "react";

import logo from "@/assets/logo-ttcu.jpg.asset.json";
import { useSettings } from "@/lib/hooks";

export const navItems = [
  { to: "/gioi-thieu", label: "Giới thiệu" },
  { to: "/tin-tuc", label: "Tin tức - Sự kiện" },
  { to: "/dich-vu-cong", label: "Dịch vụ công" },
  { to: "/chuyen-de", label: "Chuyên đề" },
  { to: "/thu-vien", label: "Thư viện truyền thông" },
  { to: "/khong-gian-van-hoa-ho-chi-minh", label: "KG Văn hóa HCM" },
  { to: "/lien-he", label: "Liên hệ - Góp ý" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { data: settings } = useSettings();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: "/tim-kiem", search: { q: searchQuery.trim() } });
      setOpen(false);
    }
  };

  return (
    <header>
      <div className="bg-card">
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-3 py-3 sm:px-5 lg:grid-cols-[minmax(0,1fr)_auto]">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <img
              src={logo.url}
              alt="Logo Trung tâm Cung ứng dịch vụ công phường Phú Thạnh"
              width={112}
              height={112}
              className="size-14 shrink-0 rounded-full object-contain sm:size-20"
            />
            <div className="min-w-0">
              <p className="truncate text-[11px] font-bold uppercase tracking-wide text-brand sm:text-base">
                {settings?.org_name ?? ""}
              </p>
              <p className="truncate text-lg font-extrabold uppercase text-brand-dark sm:text-2xl">
                {settings?.org_name_2 ?? ""}
              </p>
              <p className="truncate text-[11px] font-semibold italic text-cat-dothi sm:text-sm">
                {settings?.slogan ?? ""}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-5">
            <div className="hidden items-start gap-2 text-xs xl:flex">
              <MapPin className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
              <span className="font-medium leading-snug">
                {settings?.address ?? ""}
                <br />
                {settings?.address_2 ?? ""}
              </span>
            </div>
            <div className="hidden items-start gap-2 text-xs xl:flex">
              <Phone className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
              <span className="font-medium leading-snug">
                {settings?.hotline ?? ""}
                <br />
                {settings?.hotline_note ?? ""}
              </span>
            </div>
            <Link
              to="/admin"
              className="hidden items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs font-bold text-brand-foreground transition-colors hover:bg-brand-dark sm:inline-flex"
            >
              <LogIn className="size-4" aria-hidden />
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>

      <nav className="bg-brand text-brand-foreground" aria-label="Điều hướng chính">
        <div className="mx-auto flex w-full max-w-[1600px] items-center gap-1 px-3 sm:px-5">
          <div className="hidden flex-1 flex-wrap items-center gap-1 lg:flex">
            <Link
              to="/"
              className="my-1.5 inline-flex size-9 items-center justify-center rounded-md bg-brand-foreground/15 transition-colors hover:bg-brand-foreground/25"
              activeProps={{ className: "bg-brand-foreground/30" }}
              activeOptions={{ exact: true }}
              aria-label="Trang chủ"
            >
              <Home className="size-4" aria-hidden />
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="whitespace-nowrap px-2.5 py-3.5 text-[13px] font-bold uppercase tracking-tight transition-colors hover:text-gold"
                activeProps={{ className: "text-gold" }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="ml-auto hidden items-center gap-2 py-1.5 lg:flex">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm..."
                className="h-8 w-44 rounded-full bg-brand-foreground/15 px-3 pr-8 text-xs text-brand-foreground placeholder:text-brand-foreground/60 outline-none focus:w-64 focus:bg-brand-foreground/25 transition-all"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-foreground/70 hover:text-brand-foreground">
                <Search className="size-3.5" />
              </button>
            </form>
            <a
              href={settings?.facebook_url ?? "#"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-foreground/15 px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-brand-foreground/25"
            >
              <Facebook className="size-4" aria-hidden />
              Fanpage Facebook
            </a>
            <a
              href={settings?.zalo_url ?? "#"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-foreground/15 px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-brand-foreground/25"
            >
              <MessageCircle className="size-4" aria-hidden />
              Zalo OA
            </a>
          </div>

          <span className="py-3 text-[13px] font-bold uppercase lg:hidden">Menu điều hướng</span>
          <button
            className="ml-auto py-3 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Đóng/mở menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-brand-foreground/20 lg:hidden">
            <div className="mx-auto flex w-full max-w-[1600px] flex-col px-3 pb-3 sm:px-5">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="border-b border-brand-foreground/15 py-2.5 text-sm font-bold uppercase"
              >
                Trang chủ
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-brand-foreground/15 py-2.5 text-sm font-bold uppercase"
                >
                  {item.label}
                </Link>
              ))}
              <form onSubmit={handleSearch} className="flex items-center gap-2 border-b border-brand-foreground/15 py-2.5">
                <Search className="size-4 shrink-0" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm tin tức..."
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-brand-foreground/60"
                />
              </form>
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm font-bold uppercase text-gold"
              >
                Đăng nhập cán bộ
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
