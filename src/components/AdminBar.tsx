import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { LogOut, Pencil } from "lucide-react";
import { useAdmin } from "@/lib/admin-context";
import { toast } from "sonner";

export function AdminBar() {
  const { isAdmin, signOut } = useAdmin();
  const [busy, setBusy] = useState(false);

  if (!isAdmin) return null;

  const handleSignOut = async () => {
    setBusy(true);
    try {
      await signOut();
      toast.success("Signed out.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex items-center gap-2 rounded-full border border-primary/30 bg-background/95 px-3 py-2 shadow-2xl backdrop-blur">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
        <Pencil className="h-3 w-3" />
        Edit Mode
      </span>
      <span className="hidden text-xs text-muted-foreground sm:inline">
        Hover any image to edit
      </span>
      <button
        type="button"
        onClick={handleSignOut}
        disabled={busy}
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-foreground hover:bg-accent"
      >
        <LogOut className="h-3.5 w-3.5" />
        Sign out
      </button>
    </div>
  );
}

// Small floating "Admin" link — visible to everyone at bottom-left so the
// owner can sign in from anywhere. Rendered by <AdminLoginTrigger />.
export function AdminLoginTrigger() {
  const { isAdmin, loading } = useAdmin();
  if (loading || isAdmin) return null;
  return (
    <Link
      to="/login"
      className="fixed bottom-3 left-3 z-[90] text-[10px] uppercase tracking-widest text-muted-foreground/40 opacity-50 transition hover:text-foreground hover:opacity-100"
    >
      Admin
    </Link>
  );
}
