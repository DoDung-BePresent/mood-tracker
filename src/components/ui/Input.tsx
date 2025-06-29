import React, { useState } from "react";
import {
  TextInput,
  TextInputProps,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { cn } from "@/utils/cn";
import { Eye, EyeSlash } from "iconsax-react-nativejs";

interface InputProps extends TextInputProps {
  label?: string;
  className?: string;
  error?: string;
  description?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const Input: React.FC<InputProps> = ({
  label,
  className,
  error,
  secureTextEntry,
  prefix,
  suffix,
  size = "md",
  description,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPasswordInput = secureTextEntry;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <View className="w-full my-2">
      {label && <Text className="font-semibold mb-2">{label}</Text>}
      <View
        className={cn(
          "flex-row items-center h-14 px-4 bg-gray-50 rounded-lg border-2 focus-within:border-primary",
          error ? "border-destructive" : "border-transparent",
          size === "lg" && "h-24",
          className
        )}
      >
        {prefix ? <View className="mr-2">{prefix}</View> : null}
        <TextInput
          className={cn("flex-1 h-full text-text", size === "lg" && "text-4xl")}
          secureTextEntry={isPasswordInput && !isPasswordVisible}
          placeholderTextColor="#A9A9A9"
          cursorColor="#16a34a"
          {...props}
        />
        {isPasswordInput && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            className="pl-2"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {isPasswordVisible ? <Eye size={20} /> : <EyeSlash size={20} />}
          </TouchableOpacity>
        )}
        {!isPasswordInput && suffix ? (
          <View className="ml-2">{suffix}</View>
        ) : null}
      </View>
      {description && !error && (
        <Text className="text-sm text-muted-foreground mt-1">
          {description}
        </Text>
      )}
      {error && <Text className="text-sm text-destructive mt-1">{error}</Text>}
    </View>
  );
};

export default Input;
