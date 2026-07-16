import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
};

export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before renovation",
  afterAlt = "After renovation",
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const demoRan = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      e.preventDefault();
      setFromClientX(e.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [setFromClientX]);

  // Demo animation on first view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !demoRan.current) {
            demoRan.current = true;
            const seq = [50, 20, 80, 50];
            seq.forEach((v, i) => {
              setTimeout(() => setPos(v), 500 + i * 900);
            });
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none overflow-hidden rounded-2xl shadow-[var(--shadow-luxe)] sm:rounded-3xl"
      style={{
        height: "clamp(260px, 60vw, 700px)",
        cursor: "ew-resize",
        touchAction: "none",
      }}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as Element).setPointerCapture?.(e.pointerId);
        setFromClientX(e.clientX);
      }}
    >
      {/* Before (bottom) */}
      <img
        src={beforeSrc}
        alt={beforeAlt}
        draggable={false}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* After (top, clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
          transition: dragging.current ? "none" : "clip-path 500ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <img
          src={afterSrc}
          alt={afterAlt}
          draggable={false}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>


      {/* Divider */}
      <div
        className="pointer-events-none absolute inset-y-0"
        style={{
          left: `${pos}%`,
          transform: "translateX(-50%)",
          transition: dragging.current ? "none" : "left 500ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div className="mx-auto h-full w-[2px] bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.35)]" />
        <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 bg-white/25 shadow-[0_8px_28px_rgba(0,0,0,0.35)] backdrop-blur-md transition-transform duration-300 hover:scale-110 sm:h-12 sm:w-12" />
      </div>
    </div>
  );
}
