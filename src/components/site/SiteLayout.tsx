import type { ReactNode } from "react";

import { AlertMarquee } from "./AlertMarquee";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { TopBar } from "./TopBar";
import { useUiPrefs } from "./ui-prefs";

export function SiteLayout({ children }: { children: ReactNode }) {
  const { viewMode } = useUiPrefs();

  const shell = (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AlertMarquee />
      <TopBar />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );

  if (viewMode === "mobile") {
    return (
      <div className="min-h-screen w-full bg-brand-dark py-6">
        <div className="mx-auto w-[375px] max-w-full overflow-hidden rounded-[2rem] border-8 border-foreground/80 bg-background shadow-2xl">
          {shell}
        </div>
        <p className="mt-4 text-center text-xs font-semibold text-brand-foreground">
          Đang giả lập giao diện điện thoại (375px) — bấm [Máy tính] trên thanh công cụ để trở về.
        </p>
      </div>
    );
  }

  return shell;
}