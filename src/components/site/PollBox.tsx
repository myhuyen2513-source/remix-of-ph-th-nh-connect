import { BarChart3 } from "lucide-react";
import { useState } from "react";

import { usePollOptions, useVotePoll } from "@/lib/hooks";

export function PollBox() {
  const { data: options } = usePollOptions();
  const voteMutation = useVotePoll();
  const [voted, setVoted] = useState<number | null>(null);

  const list = options ?? [];
  const total = list.reduce((sum, o) => sum + o.value, 0) || 1;

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
        {list.map((o) => {
          const pct = Math.round((o.value / total) * 100);
          const isVoted = voted === o.id;
          return (
            <button
              key={o.id}
              onClick={() => {
                if (voted !== null) return;
                setVoted(o.id);
                voteMutation.mutate(o.id);
              }}
              className="w-full text-left"
              aria-pressed={isVoted}
              disabled={voted !== null}
            >
              <span className="flex items-center justify-between text-xs font-semibold">
                <span className={isVoted ? "text-brand" : ""}>{o.label}</span>
                <span className="text-muted-foreground">{pct}%</span>
              </span>
              <span className="mt-1 block h-2 w-full overflow-hidden rounded-full bg-muted">
                <span
                  className="block h-full rounded-full transition-all"
                  style={{ width: `${pct}%`, backgroundColor: o.color }}
                />
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-[11px] text-muted-foreground">
        {voted
          ? "Cảm ơn bạn đã tham gia đánh giá!"
          : "Chọn một phương án để bình chọn."}
      </p>
    </div>
  );
}
