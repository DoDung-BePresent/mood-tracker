import { supabase } from "@/lib/supabase";
import {
  SignUpCredentials,
  SignInCredentials,
  SignUpSchema,
  SignInSchema,
} from "@/schema/authSchema";

export const signUpWithEmail = async (credentials: SignUpCredentials) => {
  const { email, password } = SignUpSchema.parse(credentials);
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    throw new Error(error.message);
  }
  if (!data.user) {
    throw new Error("Sign up failed: No user data returned.");
  }
  return data.user;
};

export const signInWithEmail = async (credentials: SignInCredentials) => {
  const { email, password } = SignInSchema.parse(credentials);
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  if (!data.user) {
    throw new Error("Sign in failed: No user data returned.");
  }
  return data.user;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};
