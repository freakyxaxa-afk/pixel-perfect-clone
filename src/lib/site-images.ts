import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { optimizeImage } from "@/lib/image-optimize";

export type CategoryImage = {
  id: string;
  category_slug: string;
  storage_path: string;
  public_url: string;
  is_cover: boolean;
  sort_order: number;
};

export const MAX_IMAGES_PER_SLUG = 20;

// Storage folder for a given category slug.
export function folderForSlug(slug: string): string {
  if (slug.startsWith("home:")) return "homepage";
  const [parent] = slug.split("/");
  return parent;
}

// Resolve a browser-accessible URL for a storage path. Works for both public
// and private buckets: `getPublicUrl` returns a URL for public buckets, and
// `createSignedUrl` returns an authenticated URL when the bucket is private.
// The site-images bucket has an anon SELECT policy so signed URLs succeed
// without a user session. We fall back to the public URL shape if signing
// fails (e.g. offline dev).
const SIGNED_URL_TTL_SECONDS = 60 * 60 * 24 * 365; // 1 year

export function publicUrlFor(storagePath: string): string {
  return supabase.storage.from("site-images").getPublicUrl(storagePath).data.publicUrl;
}

async function resolveUrls(paths: string[]): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  if (paths.length === 0) return map;
  const { data, error } = await supabase.storage
    .from("site-images")
    .createSignedUrls(paths, SIGNED_URL_TTL_SECONDS);
  if (!error && data) {
    for (const row of data) {
      if (row.path && row.signedUrl) map.set(row.path, row.signedUrl);
    }
  }
  // Fallback for any path we couldn't sign.
  for (const p of paths) {
    if (!map.has(p)) map.set(p, publicUrlFor(p));
  }
  return map;
}

// In-memory cache of resolved images per slug. Persisted to sessionStorage so
// navigating between pages (or a full reload) shows images instantly instead
// of waiting on two sequential round trips (DB select + createSignedUrls).
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const memCache = new Map<string, { at: number; images: CategoryImage[] }>();

function cacheKey(slug: string) {
  return `site-images:${slug}`;
}

function readCache(slug: string): CategoryImage[] | null {
  const mem = memCache.get(slug);
  if (mem && Date.now() - mem.at < CACHE_TTL_MS) return mem.images;
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(cacheKey(slug));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { at: number; images: CategoryImage[] };
    if (Date.now() - parsed.at > CACHE_TTL_MS) return null;
    memCache.set(slug, parsed);
    return parsed.images;
  } catch {
    return null;
  }
}

function writeCache(slug: string, images: CategoryImage[]) {
  const entry = { at: Date.now(), images };
  memCache.set(slug, entry);
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(cacheKey(slug), JSON.stringify(entry));
  } catch {
    /* quota — ignore */
  }
}

function invalidateCache(slug: string) {
  memCache.delete(slug);
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(cacheKey(slug));
  } catch {
    /* ignore */
  }
}

export async function fetchImagesForSlug(slug: string): Promise<CategoryImage[]> {
  const { data, error } = await supabase
    .from("category_images")
    .select("*")
    .eq("category_slug", slug)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error || !data) return [];
  const urls = await resolveUrls(data.map((r) => r.storage_path));
  const images = data.map((r) => ({
    ...r,
    public_url: urls.get(r.storage_path) ?? r.public_url,
  })) as CategoryImage[];
  writeCache(slug, images);
  return images;
}

export function useCategoryImages(slug: string) {
  const cached = readCache(slug);
  const [images, setImages] = useState<CategoryImage[] | null>(cached);

  const reload = useCallback(async () => {
    invalidateCache(slug);
    const fresh = await fetchImagesForSlug(slug);
    setImages(fresh);
  }, [slug]);

  useEffect(() => {
    let alive = true;
    const c = readCache(slug);
    if (c) setImages(c);
    fetchImagesForSlug(slug).then((imgs) => {
      if (alive) setImages(imgs);
    });
    return () => {
      alive = false;
    };
  }, [slug]);

  return { images, reload };
}


// Returns the cover URL (first image) for a slug plus loading state.
// `loading` is true until the DB has been queried at least once, so callers
// can render a skeleton instead of flashing a stale fallback image.
export function useCoverUrl(slug: string): { url: string | null; loading: boolean } {
  const { images } = useCategoryImages(slug);
  if (images === null) return { url: null, loading: true };
  if (images.length === 0) return { url: null, loading: false };
  return { url: images[0].public_url, loading: false };
}

async function uploadFileToFolder(folder: string, file: File): Promise<string> {
  const optimized = await optimizeImage(file);
  const ext = optimized.name.split(".").pop()?.toLowerCase() || "webp";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from("site-images")
    .upload(path, optimized, { contentType: optimized.type, upsert: false });
  if (error) throw new Error(error.message);
  return path;
}

export async function addImage(slug: string, file: File): Promise<CategoryImage> {
  const folder = folderForSlug(slug);
  const path = await uploadFileToFolder(folder, file);

  const existing = await fetchImagesForSlug(slug);
  const nextSort = existing.length === 0 ? 0 : (existing[existing.length - 1].sort_order ?? 0) + 1;
  const { data, error } = await supabase
    .from("category_images")
    .insert({
      category_slug: slug,
      storage_path: path,
      public_url: publicUrlFor(path),
      is_cover: existing.length === 0,
      sort_order: nextSort,
    })
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  invalidateCache(slug);
  return data as CategoryImage;
}

export async function replaceImage(id: string, slug: string, file: File): Promise<void> {
  const folder = folderForSlug(slug);
  // Load the existing row to find the previous storage path.
  const { data: row } = await supabase
    .from("category_images")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  const newPath = await uploadFileToFolder(folder, file);
  const { error } = await supabase
    .from("category_images")
    .update({ storage_path: newPath, public_url: publicUrlFor(newPath) })
    .eq("id", id);
  if (error) throw new Error(error.message);
  invalidateCache(slug);
  if (row?.storage_path) {
    await supabase.storage.from("site-images").remove([row.storage_path]);
  }
}

// Replace-or-create for a "singleton" slug (e.g. homepage banner). If no row
// exists for the slug, insert one; otherwise update the first row in place.
export async function setSingletonImage(slug: string, file: File): Promise<void> {
  const existing = await fetchImagesForSlug(slug);
  if (existing.length === 0) {
    await addImage(slug, file);
    return;
  }
  await replaceImage(existing[0].id, slug, file);
}

export async function deleteImage(id: string): Promise<void> {
  const { data: row } = await supabase
    .from("category_images")
    .select("storage_path, category_slug, sort_order, is_cover")
    .eq("id", id)
    .maybeSingle();
  const { error } = await supabase.from("category_images").delete().eq("id", id);
  if (error) throw new Error(error.message);
  if (row?.category_slug) invalidateCache(row.category_slug);
  if (row?.storage_path) {
    await supabase.storage.from("site-images").remove([row.storage_path]);
  }
  // Re-cover: ensure the first remaining row is the cover.
  if (row?.category_slug) {
    const remaining = await fetchImagesForSlug(row.category_slug);
    if (remaining.length > 0 && !remaining[0].is_cover) {
      await supabase.from("category_images").update({ is_cover: true }).eq("id", remaining[0].id);
      // Clear cover flag on the rest just in case.
      const others = remaining.slice(1).filter((r) => r.is_cover);
      for (const o of others) {
        await supabase.from("category_images").update({ is_cover: false }).eq("id", o.id);
      }
    }
  }
}

// Persist a new ordering (array of image ids in the desired order).
export async function reorderImages(slug: string, ids: string[]): Promise<void> {
  await Promise.all(
    ids.map((id, i) =>
      supabase
        .from("category_images")
        .update({ sort_order: i, is_cover: i === 0 })
        .eq("id", id),
    ),
  );
  // Clear cover from anything not first.
  await supabase
    .from("category_images")
    .update({ is_cover: false })
    .eq("category_slug", slug)
    .neq("id", ids[0] ?? "00000000-0000-0000-0000-000000000000");
  if (ids[0]) {
    await supabase.from("category_images").update({ is_cover: true }).eq("id", ids[0]);
  }
}
