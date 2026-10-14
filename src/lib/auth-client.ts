import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://bazardor-web-app.vercel.app/",
});

export const { signIn, signUp, signOut, useSession, updateUser } = authClient;
