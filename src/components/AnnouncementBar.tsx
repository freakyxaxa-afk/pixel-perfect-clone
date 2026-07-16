import { Phone } from "lucide-react";
import { COMPANY } from "@/lib/site-data";

const message = `DELIVERY ALL OVER THE PAKISTAN CALL AT ${COMPANY.phone}`;

export function AnnouncementBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-[60] overflow-hidden border-b border-white/10 bg-primary py-2 text-primary-foreground shadow-sm sm:py-2.5">
      <div className="animate-ticker flex whitespace-nowrap">
        {[...Array(8)].map((_, i) => (
          <a
            key={i}
            href={`tel:${COMPANY.phoneIntl}`}
            className="mx-5 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-wider transition-colors hover:text-gold sm:mx-8 sm:text-base"
          >
            <Phone className="h-3.5 w-3.5 shrink-0 fill-current sm:h-4 sm:w-4" />
            <span>{message}</span>
            <span className="mx-2 text-gold">•</span>
          </a>
        ))}
      </div>
    </div>
  );
}
