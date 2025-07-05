import { MoodOption } from "@/types/mood";

export const MOOD_OPTIONS: MoodOption[] = [
  {
    type: "terrible",
    emoji: "😡",
    label: "Terrible",
    color: "#ef4444", // red-500
  },
  {
    type: "bad",
    emoji: "🙁",
    label: "Bad",
    color: "#f97316", // orange-500
  },
  {
    type: "okay",
    emoji: "😐",
    label: "Okay",
    color: "#eab308", // yellow-500
  },
  {
    type: "good",
    emoji: "🙂",
    label: "Good",
    color: "#84cc16", // lime-500
  },
  {
    type: "great",
    emoji: "😊",
    label: "Great",
    color: "#22c55e", // green-500
  },
];
