import { useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
import { useAdmin } from "@/lib/admin-context";
import { setSingletonImage, useCoverUrl, useCategoryImages, deleteImage } from "@/lib/site-images";
import { ImageCropper } from "@/components/ImageCropper";

type Props = {
  /**
   * Category slug this image is tied to. When admin replaces the image, the
   * new file is stored in Supabase Storage and the DB row is updated. When no
   * DB row exists yet, the fallback `src` is used.
   */
  slug: string;
  /** Fallback image used when the DB has no override for this slug. */
  src: string;
  alt?: string;
  className?: string;
  /** Optional wrapper — the component only renders an <img>. */
  children?: never;
  /** If true, also allow admins to delete the override (returns to fallback). */
  allowDelete?: boolean;
  /** Extra elements to overlay (e.g. gradient/title). */
  overlay?: ReactNode;
  imgClassName?: string;
  imgStyle?: React.CSSProperties;
  loading?: "eager" | "lazy";
  width?: number;
  height?: number;
};

/**
 * A single editable image (banner / cover). When the admin is signed in, tiny
 * floating "Replace" (and optional "Delete") controls appear on hover.
 * Non-admins see the image exactly as before.
 */
export function EditableImage({
  slug,
  src,
  alt = "",
  className = "",
  allowDelete = false,
  overlay,
  imgClassName = "h-full w-full object-cover",
  imgStyle,
  loading,
  width,
  height,
}: Props) {
  const { isAdmin } = useAdmin();
  const dbCover = useCoverUrl(slug);
  const { reload } = useCategoryImages(slug);
  const displaySrc = dbCover ?? src;
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [cropFile, setCropFile] = useState<File | null>(null);

  const onReplace = (file: File | undefined) => {
    if (!file) return;
    setCropFile(file);
    if (fileRef.current) fileRef.current.value = "";
  };

  const doUpload = async (file: File) => {
    setBusy(true);
    try {
      await setSingletonImage(slug, file);
      toast.success("Image updated.");
      await reload();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
      setCropFile(null);
    }
  };

  const onDelete = async () => {
    if (!confirm("Remove this image?")) return;
    setBusy(true);
    try {
      // Find the row via useCoverUrl trickery — refetch via reload after delete.
      const { data } = await import("@/integrations/supabase/client").then((m) =>
        m.supabase
          .from("category_images")
          .select("id")
          .eq("category_slug", slug)
          .order("sort_order", { ascending: true })
          .limit(1)
          .maybeSingle(),
      );
      if (data?.id) {
        await deleteImage(data.id);
        toast.success("Image removed.");
        await reload();
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Delete failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={`group relative ${className}`}>
      <img
        src={displaySrc}
        alt={alt}
        loading={loading}
        width={width}
        height={height}
        className={imgClassName}
        style={imgStyle}
      />
      {overlay}
      {isAdmin && (
        <>
          <div className="pointer-events-none absolute inset-0 opacity-0 ring-2 ring-inset ring-primary/70 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100" />
          <div className="absolute right-3 top-3 z-30 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              type="button"
              disabled={busy}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                fileRef.current?.click();
              }}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-foreground shadow-lg backdrop-blur hover:bg-primary hover:text-primary-foreground"
            >
              <Pencil className="h-3.5 w-3.5" />
              Replace
            </button>
            {allowDelete && dbCover && (
              <button
                type="button"
                disabled={busy}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete();
                }}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-foreground shadow-lg backdrop-blur hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </button>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onReplace(e.target.files?.[0])}
          />
        </>
      )}
      {cropFile && (
        <ImageCropper
          file={cropFile}
          onCancel={() => setCropFile(null)}
          onCropped={doUpload}
        />
      )}
    </div>
  );
}
