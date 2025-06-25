/**
 * Node modules
 */
import React from "react";
import { View } from "react-native";

/**
 * Utils
 */
import { cn } from "@/utils/cn";

interface WalkthroughPaginationProps {
  data: any[];
  currentIndex: number;
}

const WalkthroughPagination: React.FC<WalkthroughPaginationProps> = ({
  data,
  currentIndex,
}) => {
  return (
    <View className="flex-row justify-center items-center mb-10">
      {data.map((_, index) => (
        <View
          key={index}
          className={cn(
            "h-2 rounded mx-1",
            index === currentIndex ? "w-6 bg-primary" : "w-2 bg-border"
          )}
        />
      ))}
    </View>
  );
};

export default WalkthroughPagination;
