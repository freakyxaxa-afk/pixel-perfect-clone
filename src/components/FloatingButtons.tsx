import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/site-data";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.16c-.24.68-1.42 1.31-1.95 1.36-.53.05-1.02.24-3.42-.71-2.88-1.14-4.72-4.09-4.86-4.28-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09.99-2.37.24-.28.53-.35.71-.35.18 0 .35 0 .5.01.16.01.38-.06.59.45.24.58.82 2 .89 2.14.07.14.12.31.02.5-.09.19-.14.31-.28.47-.14.16-.29.36-.42.48-.14.14-.28.29-.12.57.16.28.72 1.18 1.54 1.92 1.06.94 1.95 1.24 2.23 1.38.28.14.44.12.6-.07.16-.19.69-.8.87-1.08.18-.28.36-.23.61-.14.24.09 1.55.73 1.82.87.28.14.46.21.53.33.07.11.07.65-.17 1.33Z" />
    </svg>
  );
}

export function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const defaultMsg =
    "Hello Wood Lab Islamabad, I would like to book a consultation. Please contact me regarding my project.";

  return (
    <div
      className="fixed right-4 z-50 flex flex-col items-center gap-2.5 sm:right-7 sm:gap-3"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      {showTop && (
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="animate-fade-in grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:scale-110 sm:h-11 sm:w-11"
        >
          <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      )}
      <a
        href={buildWhatsAppUrl(defaultMsg)}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="wa-float grid h-12 w-12 place-items-center rounded-full bg-[oklch(0.65_0.17_155)] text-white shadow-[var(--shadow-soft)] transition-transform hover:scale-110 sm:h-14 sm:w-14"
      >
        <WhatsAppIcon className="h-6 w-6 sm:h-7 sm:w-7" />
      </a>
    </div>
  );
}
