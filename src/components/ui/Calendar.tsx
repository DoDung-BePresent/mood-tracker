import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react-nativejs";
import { cn } from "@/utils/cn";

interface CalendarProps {
  selectedDate?: string;
  onSelectDate: (date: string) => void;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
}

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onSelectDate,
  className,
  minDate,
  maxDate,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

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

    // Check date constraints
    const selectedDateObj = new Date(dateString);
    if (minDate && selectedDateObj < minDate) return;
    if (maxDate && selectedDateObj > maxDate) return;

    onSelectDate(dateString);
  };

  const isDateDisabled = (day: number) => {
    const dateObj = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    if (minDate && dateObj < minDate) return true;
    if (maxDate && dateObj > maxDate) return true;
    return false;
  };

  const days = getDaysInMonth(currentDate);
  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <View className={cn("w-full", className)}>
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
                  selectedDate ===
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      day
                    )
                      .toISOString()
                      .split("T")[0] && "bg-primary",
                  isDateDisabled(day) && "opacity-30"
                )}
                onPress={() => handleDayPress(day)}
                disabled={isDateDisabled(day)}
              >
                <Text
                  className={cn(
                    "text-base",
                    selectedDate ===
                      new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                        day
                      )
                        .toISOString()
                        .split("T")[0]
                      ? "text-white font-bold"
                      : "text-text",
                    isDateDisabled(day) && "text-muted-foreground"
                  )}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Calendar;
