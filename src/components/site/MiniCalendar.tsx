import { CalendarDays } from "lucide-react";

import { events } from "@/lib/site-data";

const MONTH = 6;
const YEAR = 2026;
const WEEK = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

export function MiniCalendar() {
  const firstDay = new Date(YEAR, MONTH - 1, 1).getDay(); // 0 = CN
  const lead = (firstDay + 6) % 7;
  const daysInMonth = new Date(YEAR, MONTH, 0).getDate();
  const cells = [
    ...Array.from({ length: lead }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="section-title mb-3 text-sm">
        <CalendarDays className="size-4" aria-hidden />
        Lịch hoạt động tháng {MONTH}/{YEAR}
      </h3>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-muted-foreground">
        {WEEK.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1 text-center text-xs">
        {cells.map((day, i) => {
          const ev = events.find((e) => e.day === day && e.month === MONTH);
          if (day === null) return <span key={`e-${i}`} />;
          return (
            <span
              key={day}
              title={ev ? `${ev.title} — ${ev.time}, ${ev.place}` : undefined}
              className={`relative flex h-8 items-center justify-center rounded-md ${
                ev ? "cursor-help bg-accent font-bold text-brand" : "text-foreground"
              }`}
            >
              {day}
              {ev && (
                <span className="absolute bottom-1 size-1.5 rounded-full bg-cat-thongbao" />
              )}
            </span>
          );
        })}
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">
        Ngày có dấu chấm đỏ là ngày có sự kiện. Rà chuột vào ngày để xem nhanh tên sự kiện.
      </p>
    </div>
  );
}