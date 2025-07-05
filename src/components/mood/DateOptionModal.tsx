import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Calendar, Clock } from "iconsax-react-nativejs";

interface DateOptionPopoverProps {
  visible: boolean;
  onClose: () => void;
  onSelectToday: () => void;
  onSelectDate: () => void;
}

const DateOptionPopover: React.FC<DateOptionPopoverProps> = ({
  visible,
  onClose,
  onSelectToday,
  onSelectDate,
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white rounded-2xl p-4 m-5 min-w-[200px]">
          <Text className="text-lg font-bold mb-4 text-center">
            Select Option
          </Text>

          <TouchableOpacity
            className="flex-row items-center p-3 mb-2 bg-gray-50 rounded-lg"
            onPress={() => {
              console.log("Today pressed"); // DEBUG
              onSelectToday();
            }}
          >
            <Clock size={20} color="#5A8C3C" />
            <Text className="ml-3 text-base">Today</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center p-3 mb-4 bg-gray-50 rounded-lg"
            onPress={() => {
              console.log("Select Date pressed"); // DEBUG
              onSelectDate();
            }}
          >
            <Calendar size={20} color="#5A8C3C" />
            <Text className="ml-3 text-base">Select Date</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="p-3 bg-gray-200 rounded-lg"
            onPress={() => {
              console.log("Cancel pressed"); // DEBUG
              onClose();
            }}
          >
            <Text className="text-center">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DateOptionPopover;
