import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/hero.jpg";
import mediaWall from "@/assets/hero-media-wall.webp";
import wardrobe from "@/assets/hero-wardrobe.jpeg";
import kitchen from "@/assets/hero-kitchen.jpg";

const SLIDES = [
  { src: heroImg, alt: "Luxury modern living space with custom wood interiors" },
  { src: mediaWall, alt: "Custom media wall with linear fireplace and wood panelling" },
  { src: wardrobe, alt: "Premium walk-in wardrobe with glass doors" },
  { src: kitchen, alt: "Modern grey modular kitchen with island" },
];

const DISPLAY_MS = 3500;
const FADE_MS = 1200;

export function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    SLIDES.forEach((s) => {
      const img = new Image();
      img.src = s.src;
    });
  }, []);

  useEffect(() => {
    timer.current = setTimeout(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, DISPLAY_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [active]);

  const goTo = (i: number) => {
    if (timer.current) clearTimeout(timer.current);
    setActive(i);
  };

  return (
    <>
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 overflow-hidden"
          style={{
            opacity: i === active ? 1 : 0,
            transition: `opacity ${FADE_MS}ms ease-in-out`,
            willChange: "opacity",
          }}
          aria-hidden={i !== active}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            width={1920}
            height={1280}
            className="h-full w-full object-cover"
            style={{
              animation: "hero-kenburns 12s ease-out infinite alternate",
            }}
          />
        </div>
      ))}

      <div className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Show slide ${i + 1}`}
            aria-current={i === active}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              i === active ? "w-8 bg-gold" : "w-2.5 bg-primary-foreground/50 hover:bg-primary-foreground/80"
            }`}
          />
        ))}
      </div>
    </>
  );
}
