import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react-nativejs";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";

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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tempSelectedDate, setTempSelectedDate] = useState(
    selectedDate || new Date().toISOString().split("T")[0]
  );

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDayPress = (day: number) => {
    const dateString = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    )
      .toISOString()
      .split("T")[0];
    setTempSelectedDate(dateString);
  };

  const handleContinue = () => {
    onSelectDate(tempSelectedDate);
  };

  const days = getDaysInMonth(currentDate);
  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <Modal visible={visible} onClose={onClose} className="max-w-md">
      <View>
        <Text className="text-xl font-bold text-text text-center mb-4">
          Select Date
        </Text>

        {/* Month Navigation */}
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => navigateMonth("prev")}>
            <ArrowLeft2 size={24} color="#1f2937" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-text">{monthYear}</Text>
          <TouchableOpacity onPress={() => navigateMonth("next")}>
            <ArrowRight2 size={24} color="#1f2937" />
          </TouchableOpacity>
        </View>

        {/* Days of Week Header */}
        <View className="flex-row mb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <View key={day} className="flex-1 items-center py-2">
              <Text className="text-sm font-medium text-muted-foreground">
                {day}
              </Text>
            </View>
          ))}
        </View>

        {/* Calendar Grid */}
        <View className="flex-row flex-wrap">
          {days.map((day, index) => (
            <View key={index} className="w-[14.28%] aspect-square p-1">
              {day && (
                <TouchableOpacity
                  className={cn(
                    "flex-1 items-center justify-center rounded-lg",
                    tempSelectedDate ===
                      new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                        day
                      )
                        .toISOString()
                        .split("T")[0] && "bg-primary"
                  )}
                  onPress={() => handleDayPress(day)}
                >
                  <Text
                    className={cn(
                      "text-base",
                      tempSelectedDate ===
                        new Date(
                          currentDate.getFullYear(),
                          currentDate.getMonth(),
                          day
                        )
                          .toISOString()
                          .split("T")[0]
                        ? "text-white font-bold"
                        : "text-text"
                    )}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

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
