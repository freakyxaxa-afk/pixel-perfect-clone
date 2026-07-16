import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  zoom?: number;
};

function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    (navigator.maxTouchPoints ?? 0) > 0 ||
    window.matchMedia("(hover: none), (pointer: coarse)").matches
  );
}

export function ProductImageZoom({ src, alt, className, zoom = 2.2 }: Props) {
  const [open, setOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(isTouchDevice());
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (touch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <>
      <div
        className={
          "relative overflow-hidden rounded-xl bg-muted cursor-zoom-in " +
          (className ?? "")
        }
        onMouseEnter={() => !touch && setHovering(true)}
        onMouseLeave={() => {
          setHovering(false);
          setOrigin("50% 50%");
        }}
        onMouseMove={onMove}
        onClick={() => setOpen(true)}
        role="button"
        aria-label="Open image"
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="aspect-[4/3] w-full object-cover will-change-transform transition-transform duration-200 ease-out"
          style={{
            transformOrigin: origin,
            transform: hovering ? `scale(${zoom})` : "scale(1)",
          }}
        />
      </div>
      {open && (
        <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} touch={touch} />
      )}
    </>
  );
}

function Lightbox({
  src,
  alt,
  onClose,
  touch,
}: {
  src: string;
  alt: string;
  onClose: () => void;
  touch: boolean;
}) {
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const stateRef = useRef({ scale: 1, tx: 0, ty: 0 });
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchRef = useRef<{
    dist: number;
    scale: number;
    cx: number;
    cy: number;
    tx: number;
    ty: number;
  } | null>(null);
  const panRef = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);
  const lastTapRef = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  useEffect(() => {
    stateRef.current = { scale, tx, ty };
  }, [scale, tx, ty]);

  const clampScale = (s: number) => Math.max(1, Math.min(4, s));

  const setTransform = useCallback((s: number, x: number, y: number) => {
    const cs = clampScale(s);
    if (cs === 1) {
      setScale(1);
      setTx(0);
      setTy(0);
    } else {
      setScale(cs);
      setTx(x);
      setTy(y);
    }
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    (e.target as Element).setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2) {
      const pts = Array.from(pointers.current.values());
      const dx = pts[0].x - pts[1].x;
      const dy = pts[0].y - pts[1].y;
      pinchRef.current = {
        dist: Math.hypot(dx, dy),
        scale: stateRef.current.scale,
        cx: (pts[0].x + pts[1].x) / 2,
        cy: (pts[0].y + pts[1].y) / 2,
        tx: stateRef.current.tx,
        ty: stateRef.current.ty,
      };
      panRef.current = null;
    } else if (pointers.current.size === 1 && stateRef.current.scale > 1) {
      panRef.current = {
        x: e.clientX,
        y: e.clientY,
        tx: stateRef.current.tx,
        ty: stateRef.current.ty,
      };
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLImageElement>) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2 && pinchRef.current) {
      const pts = Array.from(pointers.current.values());
      const dx = pts[0].x - pts[1].x;
      const dy = pts[0].y - pts[1].y;
      const dist = Math.hypot(dx, dy);
      const ratio = dist / pinchRef.current.dist;
      setTransform(pinchRef.current.scale * ratio, pinchRef.current.tx, pinchRef.current.ty);
    } else if (pointers.current.size === 1 && panRef.current) {
      const nx = panRef.current.tx + (e.clientX - panRef.current.x);
      const ny = panRef.current.ty + (e.clientY - panRef.current.y);
      setTransform(stateRef.current.scale, nx, ny);
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLImageElement>) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinchRef.current = null;
    if (pointers.current.size === 0) panRef.current = null;
  };

  const onImgClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!touch) return;
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      setTransform(stateRef.current.scale > 1 ? 1 : 2, 0, 0);
    }
    lastTapRef.current = now;
  };

  return (
    <div
      className={
        "fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-2 sm:p-4 transition-opacity duration-200 " +
        (mounted ? "opacity-100" : "opacity-0")
      }
      style={{ height: "100dvh" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
      >
        <X className="h-6 w-6" />
      </button>
      <img
        src={src}
        alt={alt}
        draggable={false}
        onClick={onImgClick}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="max-h-[95dvh] max-w-[95vw] object-contain select-none touch-none will-change-transform"
        style={{
          transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
          transition: pointers.current.size === 0 ? "transform 0.2s ease-out" : "none",
          cursor: scale > 1 ? "grab" : "zoom-out",
        }}
      />
    </div>
  );
}
