import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in" }, { name: "robots", content: "noindex" }] }),
  component: LoginPage,
});

const ADMIN_ID = "rehman007";
const ADMIN_EMAIL = "rehman007@woodlab.local";

function LoginPage() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // Ensure the admin auth user exists (idempotent).
    fetch("/api/public/admin-bootstrap", { method: "POST" }).catch(() => {});
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/" });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id.trim().toLowerCase() !== ADMIN_ID) {
      toast.error("Incorrect ID or password.");
      return;
    }
    setBusy(true);
    try {
      await fetch("/api/public/admin-bootstrap", { method: "POST" });
    } catch {}
    const { error } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password,
    });
    setBusy(false);
    if (error) {
      toast.error("Incorrect ID or password.");
      return;
    }
    toast.success("Signed in — Edit Mode enabled.");
    navigate({ to: "/" });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-24">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-2xl border bg-card p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
            <Lock className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-xl font-semibold">Admin sign in</h1>
            <p className="text-xs text-muted-foreground">Authorised staff only.</p>
          </div>
        </div>

        <label className="block">
          <span className="text-sm font-medium">User ID</span>
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            autoComplete="username"
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            required
          />
        </label>
        <label className="mt-4 block">
          <span className="text-sm font-medium">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            required
          />
        </label>
        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow hover:opacity-90 disabled:opacity-60"
        >
          {busy ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
