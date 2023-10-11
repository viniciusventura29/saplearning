import { AuthError, Session, User } from "@supabase/supabase-js";

export type AllUsersType = [
  {
    profile: { name: String; user_id: String; role: String; id: Number };
    users: User;
  }
];

export enum UserRoles{
    'ADMIN' = "ADMIN",
    'USER' = "USER"
}

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