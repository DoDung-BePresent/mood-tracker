import { supabase } from "@/lib/supabase";
import { Profile } from "@/types/profile";

export const getProfile = async () => {
  const { data, error } = await supabase.from("profiles").select("*").single();

  if (error && error.code !== "PGRST116") {
    // PGRST116: no rows found
    throw new Error(error.message);
  }
  return data as Profile | null;
};

export const updateProfile = async (profileData: Partial<Profile>) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not found");

  const { data, error } = await supabase
    .from("profiles")
    .update(profileData)
    .eq("id", user.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data as Profile;
};
