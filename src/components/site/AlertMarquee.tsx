import { Megaphone } from "lucide-react";

import { systemSettings } from "@/lib/site-data";

export function AlertMarquee() {
  if (!systemSettings.is_alert_active) return null;

  return (
    <div className="flex items-center gap-2 overflow-hidden bg-alert px-3 py-1.5 text-alert-foreground sm:px-5">
      <span className="flex shrink-0 items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide">
        <Megaphone className="size-4" aria-hidden />
        Khẩn
      </span>
      <div className="relative flex-1 overflow-hidden">
        <p className="animate-marquee whitespace-nowrap text-xs font-semibold">
          {systemSettings.alert_text}
        </p>
      </div>
    </div>
  );
}