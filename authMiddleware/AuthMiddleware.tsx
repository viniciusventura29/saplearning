import { ReactNode, useState } from "react";
import { AuthError, Session } from "@supabase/supabase-js";
import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

export type SessionUser = {
  user:
    | {
        data: { session: Session };
        error: null;
      }
    | { data: { session: null }; error: AuthError }
    | { data: { session: null }; error: null };
};

export type ProfileUser = any

export const supabase = createClient(
  "https://sangyhnhodvxmkicjlnb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhbmd5aG5ob2R2eG1raWNqbG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzMzAwMDEsImV4cCI6MjAxMTkwNjAwMX0.aTmjA5pP_UvGT-WQdhrAUhQJ-I9PMSWEbDhG-5tdty0"
);

const getUser = async () => {
  const user = await supabase.auth.getSession();

  const profile = await supabase
    .from("profile")
    .select("*")
    .eq("user_id", user.data.session?.user.id);
  return { user, profile };
};

const AuthMiddleware = ({
  children,
}: {
  children: (session: any) => ReactNode;
}) => {
  const [session, setSession] = useState<SessionUser & ProfileUser>();

  useEffect(() => {
    getUser().then((r) => {
      setSession({
        user: r.user,
        profile: r.profile,
      });
    });
  }, []);

  return <div>{children(session)}</div>;
};

export default AuthMiddleware;
