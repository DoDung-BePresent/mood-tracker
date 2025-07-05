import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { MOOD_OPTIONS } from "@/constants/moods";
import { MoodType } from "@/types/mood";

interface MoodSelectorModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectMood: (mood: MoodType) => void;
  selectedDate: string;
}

const MoodSelectorModal: React.FC<MoodSelectorModalProps> = ({
  visible,
  onClose,
  onSelectMood,
  selectedDate,
}) => {
  const isToday = selectedDate === new Date().toISOString().split("T")[0];
  const displayDate = isToday
    ? "Today"
    : new Date(selectedDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

  return (
    <Modal visible={visible} onClose={onClose}>
      <View className="items-center">
        <Text className="text-xl font-bold text-text mb-2">
          How do you feel {isToday ? "today" : `on ${displayDate}`}?
        </Text>

        <View className="flex-row justify-between w-full my-8">
          {MOOD_OPTIONS.map((mood) => (
            <TouchableOpacity
              key={mood.type}
              className="items-center"
              onPress={() => onSelectMood(mood.type)}
            >
              <View
                className="w-12 h-12 rounded-full items-center justify-center mb-2"
                style={{ backgroundColor: mood.color }}
              >
                <Text className="text-2xl">{mood.emoji}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View className="w-full">
          <Button variant="secondary" onPress={onClose}>
            Cancel
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default MoodSelectorModal;
