import { Clock, Contrast, Monitor, Search, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";

import { systemSettings } from "@/lib/site-data";
import { useUiPrefs } from "./ui-prefs";

const WEEKDAYS = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  if (!now) return "";
  const d = String(now.getDate()).padStart(2, "0");
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  return `${WEEKDAYS[now.getDay()]}, ${d}/${m}/${now.getFullYear()} | ${hh}:${mm}`;
}

export function TopBar() {
  const clock = useClock();
  const { fontStep, setFontStep, highContrast, toggleContrast, viewMode, setViewMode } =
    useUiPrefs();

  const btn =
    "inline-flex h-7 items-center justify-center gap-1 rounded-md border border-brand-foreground/30 px-2 text-[11px] font-semibold transition-colors hover:bg-brand-foreground/15";

  return (
    <div className="bg-brand text-brand-foreground">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-2 px-3 py-2 text-xs sm:px-5 lg:flex-row lg:items-center lg:justify-between">
        <p className="font-semibold leading-snug">{systemSettings.welcome_text}</p>

        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 whitespace-nowrap font-medium">
            <Clock className="size-3.5 shrink-0" aria-hidden />
            {clock}
          </span>

          <div className="flex items-center gap-1" aria-label="Bộ hỗ trợ tiếp cận">
            <button className={btn} onClick={() => setFontStep(fontStep - 1)} title="Giảm cỡ chữ">
              A-
            </button>
            <button className={btn} onClick={() => setFontStep(1)} title="Cỡ chữ mặc định">
              A
            </button>
            <button className={btn} onClick={() => setFontStep(fontStep + 1)} title="Tăng cỡ chữ">
              A+
            </button>
            <button
              className={btn}
              onClick={toggleContrast}
              aria-pressed={highContrast}
              title="Chế độ tương phản cao"
            >
              <Contrast className="size-3.5" aria-hidden />
              Tương phản
            </button>
          </div>

          <div className="hidden items-center gap-1 lg:flex" aria-label="Giả lập giao diện">
            <button
              className={btn}
              onClick={() => setViewMode("desktop")}
              aria-pressed={viewMode === "desktop"}
              title="Xem giao diện máy tính"
            >
              <Monitor className="size-3.5" aria-hidden />
              Máy tính
            </button>
            <button
              className={btn}
              onClick={() => setViewMode("mobile")}
              aria-pressed={viewMode === "mobile"}
              title="Giả lập giao diện điện thoại"
            >
              <Smartphone className="size-3.5" aria-hidden />
              Điện thoại
            </button>
          </div>

          <form
            className="relative"
            onSubmit={(e) => e.preventDefault()}
            role="search"
            aria-label="Tìm kiếm trên website"
          >
            <input
              type="search"
              placeholder="Tìm kiếm..."
              className="h-7 w-40 rounded-full bg-card px-3 pr-8 text-xs text-foreground outline-none ring-1 ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-gold"
            />
            <Search
              className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-brand"
              aria-hidden
            />
          </form>
        </div>
      </div>
    </div>
  );
}