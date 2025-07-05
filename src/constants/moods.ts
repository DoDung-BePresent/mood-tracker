import { MoodOption } from "@/types/mood";

export const MOOD_OPTIONS: MoodOption[] = [
  {
    type: "terrible",
    emoji: require("@/assets/icons/terrible-emoji.png"), // Thay đổi từ string thành require
    label: "Terrible",
  },
  {
    type: "bad",
    emoji: require("@/assets/icons/bad-emoji.png"),
    label: "Bad",
  },
  {
    type: "okay",
    emoji: require("@/assets/icons/okay-emoji.png"),
    label: "Okay",
  },
  {
    type: "good",
    emoji: require("@/assets/icons/good-emoji.png"),
    label: "Good",
  },
  {
    type: "great",
    emoji: require("@/assets/icons/great-emoji.png"),
    label: "Great",
  },
];
