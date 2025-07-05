import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Calendar, Clock } from "iconsax-react-nativejs";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { MoodType } from "@/types/mood";

export const useMoodEntry = () => {
  const [dateOptionModalVisible, setDateOptionModalVisible] = useState(false);
  const [moodSelectorModalVisible, setMoodSelectorModalVisible] =
    useState(false);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const openDateOptionModal = () => {
    setDateOptionModalVisible(true);
  };

  const closeAllModals = () => {
    setDateOptionModalVisible(false);
    setMoodSelectorModalVisible(false);
    setCalendarModalVisible(false);
  };

  const handleSelectToday = () => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
    setDateOptionModalVisible(false);
    setMoodSelectorModalVisible(true);
  };

  const handleSelectDate = () => {
    setDateOptionModalVisible(false);
    setCalendarModalVisible(true);
  };

  const handleDateSelected = (date: string) => {
    setSelectedDate(date);
    setCalendarModalVisible(false);
    setMoodSelectorModalVisible(true);
  };

  const handleMoodSelected = async (mood: MoodType) => {
    try {
      // TODO: Save mood to database
      console.log("Saving mood:", { mood, date: selectedDate });
      closeAllModals();
      // Show success message or navigate
    } catch (error) {
      console.error("Error saving mood:", error);
    }
  };

  return {
    dateOptionModalVisible,
    moodSelectorModalVisible,
    calendarModalVisible,
    selectedDate,
    openDateOptionModal,
    closeAllModals,
    handleSelectToday,
    handleSelectDate,
    handleDateSelected,
    handleMoodSelected,
  };
};

interface DateOptionModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectToday: () => void;
  onSelectDate: () => void;
}

const DateOptionModal: React.FC<DateOptionModalProps> = ({
  visible,
  onClose,
  onSelectToday,
  onSelectDate,
}) => {
  const [dateOptionVisible, setDateOptionVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  return (
    <Modal visible={visible} onClose={onClose}>
      <View className="items-center">
        <Text className="text-xl font-bold text-text mb-6">Select Date</Text>
        <View className="w-full space-y-3">
          <TouchableOpacity
            className="flex-row items-center p-4 bg-gray-50 rounded-xl"
            onPress={onSelectToday}
          >
            <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-3">
              <Clock size={20} color="#5A8C3C" />
            </View>
            <Text className="text-lg font-medium text-text">Today</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center p-4 bg-gray-50 rounded-xl"
            onPress={onSelectDate}
          >
            <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-3">
              <Calendar size={20} color="#5A8C3C" />
            </View>
            <Text className="text-lg font-medium text-text">Select Date</Text>
          </TouchableOpacity>
        </View>
        <View className="w-full mt-6">
          <Button variant="secondary" onPress={onClose}>
            Cancel
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default DateOptionModal;
