import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import ProductCard from "./ProductCard";

export default function Carousel({ title, ctaLabel, ctaTo, items, autoplay = false }) {
  const scrollerRef = useRef(null);

  // autoplay (desligado por padrão)
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || !autoplay) return;
    let hover = false;
    const onEnter = () => (hover = true);
    const onLeave = () => (hover = false);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    const id = setInterval(() => {
      if (!el || hover) return;
      const firstCard = el.querySelector("[data-card]");
      const gap = parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap || "16");
      const step = (firstCard?.clientWidth || 320) + gap;
      const nearEnd = Math.abs(el.scrollLeft + el.clientWidth - el.scrollWidth) < 4;
      if (nearEnd) el.scrollTo({ left: 0, behavior: "smooth" });
      else el.scrollBy({ left: step, behavior: "smooth" });
    }, 3500);
    return () => {
      clearInterval(id);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [autoplay]);

  // drag-to-scroll (desktop)
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let isDown = false, startX = 0, startLeft = 0;
    const onDown = (e) => { isDown = true; startX = e.clientX; startLeft = el.scrollLeft; };
    const onMove = (e) => { if (!isDown) return; e.preventDefault(); el.scrollLeft = startLeft - (e.clientX - startX); };
    const onUp = () => { isDown = false; };
    el.addEventListener("mousedown", onDown);
    el.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const scrollByStep = (dir = 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.querySelector("[data-card]");
    const gap = parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap || "16");
    const step = (first?.clientWidth || 320) + gap;
    el.scrollBy({ left: dir * step * 1.8, behavior: "smooth" });
  };

  return (
    <section className="w-full py-16 md:py-20">
      <SectionHeader title={title} ctaLabel={ctaLabel} ctaTo={ctaTo} />
      <div className="relative page-x">
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-5 md:gap-6 overflow-x-auto scroll-smooth pb-2 scrollbar-hide cursor-grab active:cursor-grabbing select-none touch-pan-x"
        >
          {items.map((it, idx) => (
            <ProductCard key={`${it.title}-${idx}`} item={it} />
          ))}
        </div>

        {/* setas (desktop) */}
        <button
          aria-label="Previous"
          onClick={() => scrollByStep(-1)}
          className="absolute left-6 top-1/2 hidden -translate-y-1/2 rounded-full border border-neutral-200 bg-white/90 p-2 shadow-md backdrop-blur transition hover:bg-white md:inline-flex dark:border-neutral-800 dark:bg-neutral-900/80"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next"
          onClick={() => scrollByStep(1)}
          className="absolute right-6 top-1/2 hidden -translate-y-1/2 rounded-full border border-neutral-200 bg-white/90 p-2 shadow-md backdrop-blur transition hover:bg-white md:inline-flex dark:border-neutral-800 dark:bg-neutral-900/80"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
