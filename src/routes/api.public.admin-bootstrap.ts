import { createFileRoute } from "@tanstack/react-router";

// One-shot idempotent bootstrap: ensures the admin auth user + role row exist.
// Uses server-side ADMIN_EMAIL / ADMIN_PASSWORD env vars (never sent to client).
export const Route = createFileRoute("/api/public/admin-bootstrap")({
  server: {
    handlers: {
      POST: async () => {
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;
        if (!email || !password) {
          return new Response(JSON.stringify({ ok: false, error: "not_configured" }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        // Try to find the user by listing (small user set).
        const list = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 });
        let user = list.data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());

        if (!user) {
          const created = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
          });
          if (created.error || !created.data.user) {
            return new Response(
              JSON.stringify({ ok: false, error: created.error?.message ?? "create_failed" }),

              { status: 500, headers: { "content-type": "application/json" } },
            );
          }
          user = created.data.user;
        }

        // Ensure admin role row exists.
        const { data: existingRole } = await supabaseAdmin
          .from("user_roles")
          .select("id")
          .eq("user_id", user.id)
          .eq("role", "admin")
          .maybeSingle();
        if (!existingRole) {
          await supabaseAdmin.from("user_roles").insert({ user_id: user.id, role: "admin" });
        }

        return new Response(JSON.stringify({ ok: true }), {
          headers: { "content-type": "application/json" },
        });
      },
    },
  },
});
