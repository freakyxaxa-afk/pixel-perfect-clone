import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

// Serves images from the private "site-images" bucket using the publishable
// (anon) key. The storage RLS policy "public read site-images" permits anon
// SELECT on that bucket, so this endpoint works without any service-role key.
export const Route = createFileRoute("/api/public/site-image/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const path = (params as { _splat?: string })._splat;
        if (!path) return new Response("Not found", { status: 404 });

        const url = process.env.SUPABASE_URL!;
        const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
        const supabase = createClient(url, key, {
          auth: { persistSession: false, autoRefreshToken: false },
          global: {
            fetch: (input, init) => {
              const h = new Headers(init?.headers);
              if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
                h.delete("Authorization");
              }
              h.set("apikey", key);
              return fetch(input, { ...init, headers: h });
            },
          },
        });

        const { data, error } = await supabase.storage.from("site-images").download(path);
        if (error || !data) return new Response("Not found", { status: 404 });

        const buffer = await data.arrayBuffer();
        return new Response(buffer, {
          headers: {
            "content-type": data.type || "image/jpeg",
            "cache-control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
