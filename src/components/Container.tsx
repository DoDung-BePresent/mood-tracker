/**
 * Node modules
 */
import React from "react";
import { View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Utils
 */
import { cn } from "@/utils/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle;
  useSafeArea?: boolean;
  centered?: boolean;
  padded?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  style,
  useSafeArea = true,
  centered = false,
  padded = false,
}) => {
  const Wrapper = useSafeArea ? SafeAreaView : View;

  return (
    <Wrapper
      className={cn(
        "flex-1 bg-background",
        centered && "justify-center items-center",
        padded && "p-5",
        className
      )}
      style={style}
    >
      {children}
    </Wrapper>
  );
};

export default Container;
