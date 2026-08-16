import { BarChart3 } from "lucide-react";
import { useState } from "react";

import { pollOptions } from "@/lib/site-data";

export function PollBox() {
  const [voted, setVoted] = useState<string | null>(null);

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="section-title mb-1 text-sm">
        <BarChart3 className="size-4" aria-hidden />
        Thăm dò ý kiến
      </h3>
      <p className="mb-3 text-xs text-muted-foreground">
        Bạn đánh giá thế nào về chất lượng dịch vụ của Trung tâm?
      </p>

      <div className="space-y-2.5">
        {pollOptions.map((o) => (
          <button
            key={o.label}
            onClick={() => setVoted(o.label)}
            className="w-full text-left"
            aria-pressed={voted === o.label}
          >
            <span className="flex items-center justify-between text-xs font-semibold">
              <span className={voted === o.label ? "text-brand" : ""}>{o.label}</span>
              <span className="text-muted-foreground">{o.value}%</span>
            </span>
            <span className="mt-1 block h-2 w-full overflow-hidden rounded-full bg-muted">
              <span
                className="block h-full rounded-full transition-all"
                style={{ width: `${o.value}%`, backgroundColor: o.color }}
              />
            </span>
          </button>
        ))}
      </div>

      <p className="mt-3 text-[11px] text-muted-foreground">
        {voted
          ? `Cảm ơn bạn đã chọn "${voted}". Phiếu sẽ được ghi nhận khi hệ thống quản trị được kích hoạt.`
          : "Chọn một phương án để bình chọn."}
      </p>
    </div>
  );
}