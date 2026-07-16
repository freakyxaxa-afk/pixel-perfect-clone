import { useEffect, useState } from "react";
import { Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { REVIEWS, COMPANY } from "@/lib/site-data";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/lib/admin-context";

type Review = { id?: string; name: string; text: string; stars: number };

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn("h-4 w-4", i < count ? "fill-gold text-gold" : "text-muted-foreground/40")}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, onDelete }: { review: Review; onDelete?: (id: string) => void }) {
  const { isAdmin } = useAdmin();
  return (
    <figure className="glass group relative flex w-[300px] shrink-0 flex-col gap-4 rounded-2xl p-6 shadow-[var(--shadow-glass)] sm:w-[360px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary font-display text-primary-foreground">
            {review.name.charAt(0)}
          </span>
          <figcaption className="font-medium">{review.name}</figcaption>
        </div>
        <Stars count={review.stars} />
      </div>
      <blockquote className="text-sm leading-relaxed text-muted-foreground">
        “{review.text}”
      </blockquote>
      {isAdmin && review.id && onDelete && (
        <button
          type="button"
          onClick={() => onDelete(review.id!)}
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-destructive opacity-0 shadow transition-opacity group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground"
          aria-label="Delete review"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </figure>
  );
}

export function ReviewsCarousel() {
  const { isAdmin } = useAdmin();
  const [reviews, setReviews] = useState<Review[]>(REVIEWS);

  const load = () => {
    supabase
      .from("reviews")
      .select("id, name, text, stars")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) setReviews(data as Review[]);
      });
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Review deleted.");
    setReviews((r) => r.filter((x) => x.id !== id));
  };

  // Don't loop when admin — makes delete simpler and avoids duplicates.
  const displayed = isAdmin ? reviews : [...reviews, ...reviews];

  return (
    <div className="text-center">
      <div className="mb-8 flex flex-col items-center gap-2">
        <Stars count={4} />
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{COMPANY.rating}</span> rating ·{" "}
          {COMPANY.reviewsCount} Google Reviews
        </p>
      </div>
      <div className={cn("relative overflow-hidden", !isAdmin && "marquee-pause")}>
        {!isAdmin && (
          <>
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-28" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-28" />
          </>
        )}
        <div
          className={cn(
            "flex gap-5",
            isAdmin ? "flex-wrap justify-center" : "w-max animate-marquee",
          )}
        >
          {displayed.map((r, i) => (
            <ReviewCard key={r.id ?? i} review={r} onDelete={onDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}
