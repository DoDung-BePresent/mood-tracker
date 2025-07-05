import React, { useMemo, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react-nativejs";
import Button from "@/components/ui/Button";
import { MOOD_OPTIONS } from "@/constants/moods";
import { MoodType } from "@/types/mood";
import { cn } from "@/utils/cn";

interface MoodEntryBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  mode: "mood" | "calendar";
  selectedDate: string;
  onSelectMood: (mood: MoodType) => void;
  onSelectDate: (date: string) => void;
}

const MoodEntryBottomSheet: React.FC<MoodEntryBottomSheetProps> = ({
  visible,
  onClose,
  mode,
  selectedDate,
  onSelectMood,
  onSelectDate,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["60%", "80%"], []);

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible]);

  const handleSheetChanges = (index: number) => {
    if (index === -1) {
      onClose();
    }
  };

  if (mode === "mood") {
    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={visible ? 0 : -1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
      >
        <BottomSheetView className="flex-1 p-6">
          <MoodSelector
            selectedDate={selectedDate}
            onSelectMood={onSelectMood}
            onClose={onClose}
          />
        </BottomSheetView>
      </BottomSheet>
    );
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={visible ? 1 : -1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose
    >
      <BottomSheetView className="flex-1 p-6">
        <CalendarPicker
          selectedDate={selectedDate}
          onSelectDate={onSelectDate}
          onClose={onClose}
        />
      </BottomSheetView>
    </BottomSheet>
  );
};

// Component con cho Mood Selector
const MoodSelector: React.FC<{
  selectedDate: string;
  onSelectMood: (mood: MoodType) => void;
  onClose: () => void;
}> = ({ selectedDate, onSelectMood, onClose }) => {
  const isToday = selectedDate === new Date().toISOString().split("T")[0];
  const displayDate = isToday
    ? "today"
    : new Date(selectedDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

  return (
    <View className="items-center">
      <Text className="text-2xl font-bold text-text mb-2 text-center">
        How do you feel {displayDate}?
      </Text>

      <View className="flex-row justify-between w-full my-8 px-4">
        {MOOD_OPTIONS.map((mood) => (
          <TouchableOpacity
            key={mood.type}
            className="items-center"
            onPress={() => onSelectMood(mood.type)}
          >
            <View
              className="w-16 h-16 rounded-full items-center justify-center mb-2"
              style={{ backgroundColor: mood.color }}
            >
              <Text className="text-3xl">{mood.emoji}</Text>
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
  );
};

// Component con cho Calendar Picker
const CalendarPicker: React.FC<{
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onClose: () => void;
}> = ({ selectedDate, onSelectDate, onClose }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [tempSelectedDate, setTempSelectedDate] = React.useState(
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

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

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
    <View>
      <Text className="text-2xl font-bold text-text text-center mb-6">
        Select Date
      </Text>

      {/* Month Navigation */}
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity onPress={() => navigateMonth("prev")}>
          <ArrowLeft2 size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-text">{monthYear}</Text>
        <TouchableOpacity onPress={() => navigateMonth("next")}>
          <ArrowRight2 size={24} color="#1f2937" />
        </TouchableOpacity>
      </View>

      {/* Days of Week Header */}
      <View className="flex-row mb-3">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
          <View key={day} className="flex-1 items-center py-2">
            <Text className="text-sm font-medium text-muted-foreground">
              {day}
            </Text>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      <View className="flex-row flex-wrap mb-6">
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
      <View className="flex-row gap-3">
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
  );
};

export default MoodEntryBottomSheet;
