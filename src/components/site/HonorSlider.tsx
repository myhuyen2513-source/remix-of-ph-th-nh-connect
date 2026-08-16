import { Award, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import { honorSlides } from "@/lib/site-data";

export function HonorSlider() {
  const [index, setIndex] = useState(0);
  const total = honorSlides.length;

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 5000);
    return () => clearInterval(id);
  }, [total]);

  const go = (dir: number) => setIndex((i) => (i + dir + total) % total);

  return (
    <section
      aria-label="Bảng Vàng Danh Dự"
      className="relative overflow-hidden bg-brand-dark text-brand-foreground"
    >
      <div className="relative mx-auto grid w-full max-w-[1600px] items-stretch gap-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="flex flex-col justify-center gap-4 px-5 py-8 lg:px-10 lg:py-14">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase text-foreground">
            <Award className="size-4" aria-hidden />
            Bảng Vàng Danh Dự
          </span>
          <h2 className="text-2xl font-extrabold leading-tight lg:text-4xl">
            {honorSlides[index]?.title}
          </h2>
          <p className="max-w-[52ch] text-sm text-brand-foreground/85 lg:text-base">
            {honorSlides[index]?.subtitle}
          </p>
          <div className="flex items-center gap-2">
            {honorSlides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setIndex(i)}
                aria-label={`Xem gương điển hình ${i + 1}`}
                aria-current={i === index}
                className={
                  i === index
                    ? "h-2 w-8 rounded-full bg-gold"
                    : "h-2 w-4 rounded-full bg-brand-foreground/40"
                }
              />
            ))}
          </div>
        </div>

        <div className="relative min-h-[220px] lg:min-h-[380px]">
          {honorSlides.map((s, i) => (
            <img
              key={s.id}
              src={s.image}
              alt={s.title}
              width={1280}
              height={720}
              loading={i === 0 ? "eager" : "lazy"}
              className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/30 to-transparent" />
        </div>

        <button
          onClick={() => go(-1)}
          aria-label="Gương điển hình trước"
          className="absolute left-2 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-card text-brand shadow-md transition-transform hover:scale-105"
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Gương điển hình tiếp theo"
          className="absolute right-2 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-card text-brand shadow-md transition-transform hover:scale-105"
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
    </section>
  );
}