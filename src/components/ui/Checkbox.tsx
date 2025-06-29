import React from "react";
import { TouchableOpacity, Text, TouchableWithoutFeedback } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { TickSquare } from "iconsax-react-nativejs";
import { cn } from "@/utils/cn";

interface CheckboxProps {
  label: React.ReactNode;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onCheckedChange,
  className,
}) => {
  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(checked ? "transparent" : "transparent", {
        duration: 200,
      }),
      borderColor: withTiming(checked ? "#16a34a" : "#16a34a", {
        duration: 200,
      }),
    };
  });

  const animatedGlyphStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(checked ? 1 : 0.9) }],
      opacity: withTiming(checked ? 1 : 0),
    };
  });

  return (
    <TouchableOpacity
      className={cn("flex-row gap-3 items-center space-x-3 my-2", className)}
      onPress={() => onCheckedChange(!checked)}
      activeOpacity={1}
    >
      <Animated.View
        className="h-6 w-6 rounded-md justify-center items-center border-2 !border-primary"
        style={animatedContainerStyle}
      >
        <Animated.View style={animatedGlyphStyle}>
          <TickSquare size={24} color="#16a34a" variant="Bold" />
        </Animated.View>
      </Animated.View>

      {typeof label === "string" ? (
        <Text className="text-base text-muted-foreground flex-1">{label}</Text>
      ) : (
        label
      )}
    </TouchableOpacity>
  );
};

export default Checkbox;
