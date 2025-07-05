import React, { useState } from "react";
import { View, Text } from "react-native";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Calendar from "@/components/ui/Calendar";

interface CalendarModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectDate: (date: string) => void;
  selectedDate?: string;
}

const CalendarModal: React.FC<CalendarModalProps> = ({
  visible,
  onClose,
  onSelectDate,
  selectedDate,
}) => {
  const [tempSelectedDate, setTempSelectedDate] = useState(
    selectedDate || new Date().toISOString().split("T")[0]
  );

  const handleContinue = () => {
    onSelectDate(tempSelectedDate);
  };

  return (
    <Modal visible={visible} onClose={onClose} className="max-w-md">
      <View>
        <Text className="text-xl font-bold text-text text-center mb-4">
          Select Date
        </Text>

        <Calendar
          selectedDate={tempSelectedDate}
          onSelectDate={setTempSelectedDate}
          maxDate={new Date()} // Không cho chọn ngày tương lai
        />

        {/* Action Buttons */}
        <View className="flex-row gap-3 mt-6">
          <View className="flex-1">
            <Button variant="secondary" onPress={onClose}>
              Cancel
            </Button>
          </View>
          <View className="flex-1">
            <Button variant="primary" onPress={handleContinue}>
              Continue
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CalendarModal;
