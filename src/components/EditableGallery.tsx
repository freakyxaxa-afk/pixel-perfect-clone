import { useRef, useState } from "react";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, GripVertical, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import {
  addImage,
  deleteImage,
  replaceImage,
  reorderImages,
  MAX_IMAGES_PER_SLUG,
  type CategoryImage,
} from "@/lib/site-images";
import { ImageLightbox } from "@/components/ImageLightbox";
import { ImageCropper } from "@/components/ImageCropper";

type Props = {
  slug: string;
  images: CategoryImage[];
  onChange: () => void | Promise<void>;
};

export function EditableGallery({ slug, images, onChange }: Props) {
  const addRef = useRef<HTMLInputElement>(null);
  const replaceRef = useRef<HTMLInputElement>(null);
  const [replaceId, setReplaceId] = useState<string | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [cropQueue, setCropQueue] = useState<File[]>([]);
  const [cropMode, setCropMode] = useState<"add" | "replace" | null>(null);

  const handleAddFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const arr = Array.from(files);
    if (images.length + arr.length > MAX_IMAGES_PER_SLUG) {
      toast.error(`Maximum ${MAX_IMAGES_PER_SLUG} images per page.`);
      if (addRef.current) addRef.current.value = "";
      return;
    }
    setCropMode("add");
    setCropQueue(arr);
    if (addRef.current) addRef.current.value = "";
  };

  const handleReplaceFile = (file: File | undefined) => {
    if (!file || !replaceId) return;
    setCropMode("replace");
    setCropQueue([file]);
    if (replaceRef.current) replaceRef.current.value = "";
  };

  const handleCropped = async (file: File) => {
    const rest = cropQueue.slice(1);
    setBusy(true);
    try {
      if (cropMode === "replace" && replaceId) {
        await replaceImage(replaceId, slug, file);
        toast.success("Image replaced.");
        setReplaceId(null);
      } else {
        await addImage(slug, file);
        toast.success("Image added.");
      }
      await onChange();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
      setCropQueue(rest);
      if (rest.length === 0) setCropMode(null);
    }
  };

  const handleCropCancel = () => {
    setCropQueue([]);
    setCropMode(null);
    setReplaceId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    setBusy(true);
    try {
      await deleteImage(id);
      toast.success("Image deleted.");
      await onChange();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Delete failed.");
    } finally {
      setBusy(false);
    }
  };

  const handleDrop = async (targetId: string) => {
    if (!dragId || dragId === targetId) return;
    const ids = images.map((i) => i.id);
    const from = ids.indexOf(dragId);
    const to = ids.indexOf(targetId);
    if (from < 0 || to < 0) return;
    const next = [...ids];
    next.splice(from, 1);
    next.splice(to, 0, dragId);
    setDragId(null);
    setBusy(true);
    try {
      await reorderImages(slug, next);
      await onChange();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Reorder failed.");
    } finally {
      setBusy(false);
    }
  };

  const canAdd = images.length < MAX_IMAGES_PER_SLUG;
  const lightboxImages = images.map((i) => ({ src: i.public_url, alt: "" }));

  return (
    <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/[0.02] p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-primary/70">
          Edit mode · Gallery ({images.length}/{MAX_IMAGES_PER_SLUG})
        </p>
        <p className="hidden text-xs text-muted-foreground sm:block">
          Drag to reorder. First image is the cover.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {images.map((img, i) => (
          <div
            key={img.id}
            draggable
            onDragStart={() => setDragId(img.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(img.id)}
            className={`group relative aspect-square overflow-hidden rounded-xl border bg-muted transition ${
              dragId === img.id ? "opacity-40" : ""
            } ${i === 0 ? "ring-2 ring-primary/60" : ""}`}
          >
            <img
              src={img.public_url}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
            {i === 0 && (
              <span className="absolute left-1.5 top-1.5 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                Cover
              </span>
            )}
            <span className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100">
              <GripVertical className="h-3.5 w-3.5" />
            </span>
            <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1.5 p-2 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                type="button"
                onClick={() => setLightboxIdx(i)}
                className="grid h-8 w-8 place-items-center rounded-full bg-white text-foreground shadow hover:bg-primary hover:text-primary-foreground"
                aria-label="Zoom"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => {
                  setReplaceId(img.id);
                  replaceRef.current?.click();
                }}
                className="grid h-8 w-8 place-items-center rounded-full bg-white text-foreground shadow hover:bg-primary hover:text-primary-foreground"
                aria-label="Replace"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => handleDelete(img.id)}
                className="grid h-8 w-8 place-items-center rounded-full bg-white text-foreground shadow hover:bg-destructive hover:text-destructive-foreground"
                aria-label="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {canAdd && (
          <button
            type="button"
            disabled={busy}
            onClick={() => addRef.current?.click()}
            className="grid aspect-square place-items-center rounded-xl border-2 border-dashed border-primary/40 text-primary transition hover:border-primary hover:bg-primary/5"
          >
            <div className="flex flex-col items-center gap-1">
              <Plus className="h-6 w-6" />
              <span className="text-xs font-medium">Add Image</span>
            </div>
          </button>
        )}
      </div>

      <input
        ref={addRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleAddFiles(e.target.files)}
      />
      <input
        ref={replaceRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleReplaceFile(e.target.files?.[0])}
      />

      {lightboxIdx !== null && lightboxImages.length > 0 && (
        <ImageLightbox
          images={lightboxImages}
          index={lightboxIdx}
          onIndexChange={setLightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
      {cropMode !== null && cropQueue[0] && (
        <ImageCropper
          file={cropQueue[0]}
          onCancel={handleCropCancel}
          onCropped={handleCropped}
        />
      )}
    </div>
  );
}

// Small icon-only helpers exported for convenience elsewhere.
export const GalleryNavIcons = { ChevronLeft, ChevronRight };
