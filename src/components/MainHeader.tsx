import React from "react";
import { View, Text, Image } from "react-native";
import { cn } from "@/utils/cn";

interface MainHeaderProps {
  title: string;
  rightAction?: React.ReactNode;
  className?: string;
}

const MainHeader: React.FC<MainHeaderProps> = ({
  title,
  rightAction,
  className,
}) => {
  return (
    <View
      className={cn(
        "flex-row justify-between items-center p-5 bg-background",
        className
      )}
    >
      <View className="flex-row flex-1 items-center gap-3">
        <Image source={require("@/assets/logo.png")} className="w-10 h-10" />
        <Text className="text-2xl text-center flex-1 font-bold text-text mr-5">
          {title}
        </Text>
      </View>
      {rightAction && <View>{rightAction}</View>}
    </View>
  );
};

export default MainHeader;
