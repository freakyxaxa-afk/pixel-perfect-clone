import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

type AdminState = {
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AdminContext = createContext<AdminState>({
  isAdmin: false,
  loading: true,
  signOut: async () => {},
});

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    const check = async (userId: string | null) => {
      if (!userId) {
        if (alive) {
          setIsAdmin(false);
          setLoading(false);
        }
        return;
      }
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();
      if (!alive) return;
      setIsAdmin(!!data);
      setLoading(false);
    };

    supabase.auth.getUser().then(({ data }) => check(data.user?.id ?? null));

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "USER_UPDATED") {
        check(session?.user?.id ?? null);
      }
    });

    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, loading, signOut }}>{children}</AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
