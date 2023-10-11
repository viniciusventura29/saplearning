import { ReactNode, useState } from "react";
import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { ProfileUser, SessionUser } from "../src/types";

export const supabase = createClient(
  "https://sangyhnhodvxmkicjlnb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhbmd5aG5ob2R2eG1raWNqbG5iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NjMzMDAwMSwiZXhwIjoyMDExOTA2MDAxfQ.UGaKQaxhgVN02Q_bUy8ic_oa0knmGTRbVbxXY2cnT7Q"
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
