export type MoodType = "terrible" | "bad" | "okay" | "good" | "great";

export interface Mood {
  id: string;
  type: MoodType;
  date: string; // ISO date string
  created_at: string;
}

export interface MoodOption {
  type: MoodType;
  emoji: string;
  label: string;
  color: string;
}
