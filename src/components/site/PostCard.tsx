import { Link } from "@tanstack/react-router";
import { CalendarDays, MapPin } from "lucide-react";

import { categoryColor, type Post } from "@/lib/site-data";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg">
      <Link to="/tin-tuc/$slug" params={{ slug: post.slug }} className="block">
        <div className="hover-zoom relative">
          <img
            src={post.image}
            alt={post.title}
            width={1024}
            height={576}
            loading="lazy"
            className="aspect-[16/9] w-full object-cover"
          />
          <span
            className="absolute left-3 top-3 rounded-md px-2 py-1 text-[11px] font-bold uppercase text-brand-foreground"
            style={{ backgroundColor: categoryColor(post.category) }}
          >
            {post.category}
          </span>
        </div>
        <div className="space-y-2 p-4">
          <h3 className="line-clamp-3 font-bold leading-snug transition-colors group-hover:text-brand">
            {post.title}
          </h3>
          <p className="line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium text-muted-foreground">
            <span className="flex items-center gap-1">
              <CalendarDays className="size-3.5" aria-hidden />
              {post.date}
            </span>
            {post.location && (
              <span className="flex min-w-0 items-center gap-1">
                <MapPin className="size-3.5 shrink-0" aria-hidden />
                <span className="truncate">{post.location}</span>
              </span>
            )}
            <span className="rounded-full bg-accent px-2 py-0.5 text-accent-foreground">
              Đối tượng: {post.audience}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}