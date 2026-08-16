import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function PageHero({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="bg-gradient-to-r from-brand to-brand-light text-brand-foreground">
      <div className="mx-auto w-full max-w-[1600px] px-3 py-7 sm:px-5">
        <p className="flex items-center gap-1 text-xs font-medium text-brand-foreground/85">
          <Link to="/" className="hover:text-gold">
            Trang chủ
          </Link>
          <ChevronRight className="size-3.5" aria-hidden />
          <span>{title}</span>
        </p>
        <h1 className="mt-2 text-2xl font-extrabold uppercase lg:text-3xl">{title}</h1>
        {desc && <p className="mt-2 max-w-[70ch] text-sm text-brand-foreground/90">{desc}</p>}
      </div>
    </div>
  );
}