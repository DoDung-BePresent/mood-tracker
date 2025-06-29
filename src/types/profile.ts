export interface Profile {
  username: string | null;
  gender: "male" | "female" | "other" | null;
  age: number | null;
  is_setup_complete: boolean;
}
