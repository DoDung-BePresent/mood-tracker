import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Man, Woman } from "iconsax-react-nativejs";
import { cn } from "@/utils/cn";
import Button from "@/components/ui/Button";

type Gender = "male" | "female" | "other";

interface GenderSelectorProps {
  selectedGender: Gender | null;
  onSelect: (gender: Gender) => void;
  className?: string;
}

const GenderSelector: React.FC<GenderSelectorProps> = ({
  selectedGender,
  onSelect,
  className,
}) => {
  const options = [
    {
      id: "male",
      label: "Male",
      icon: (
        <Man
          size={48}
          color={selectedGender === "male" ? "white" : "#000000"}
        />
      ),
    },
    {
      id: "female",
      label: "Female",
      icon: (
        <Woman
          size={48}
          color={selectedGender === "female" ? "white" : "#000000"}
        />
      ),
    },
  ] as const;

  return (
    <View className={cn("items-center", className)}>
      <View className="flex-row justify-center gap-8 mb-8">
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            onPress={() => onSelect(option.id)}
            className="flex-col items-center gap-4"
          >
            <View
              className={cn(
                "items-center justify-center w-32 h-32 rounded-full border-2 transition-colors",
                selectedGender === option.id
                  ? "bg-primary border-primary"
                  : "bg-background border-gray-200"
              )}
            >
              {option.icon}
            </View>
            <Text
              className={cn(
                "mt-2 font-medium text-xl",
                selectedGender === option.id && "text-primary"
              )}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button
        variant={selectedGender === "other" ? "primary" : "outline"}
        onPress={() => onSelect("other")}
      >
        Prefer not to say
      </Button>
    </View>
  );
};

export default GenderSelector;
