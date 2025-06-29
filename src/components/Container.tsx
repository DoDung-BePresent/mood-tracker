/**
 * Node modules
 */
import React from "react";
import { View, ViewStyle, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft2 } from "iconsax-react-nativejs";

/**
 * Utils
 */
import { cn } from "@/utils/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  useSafeArea?: boolean;
  centered?: boolean;
  padded?: boolean;
  withBackButton?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  useSafeArea = true,
  centered = false,
  padded = false,
  withBackButton = false,
}) => {
  const Wrapper = useSafeArea ? SafeAreaView : View;
  const navigation = useNavigation();

  return (
    <Wrapper className={cn("flex-1 bg-background", className)}>
      {withBackButton && (
        <View className="h-14 flex-row items-center px-4">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ArrowLeft2 size={24} color="#1f2937" />
          </TouchableOpacity>
        </View>
      )}

      {/* Main Content Section */}
      <View
        className={cn(
          "flex-1",
          centered && "justify-center items-center",
          padded && "p-5"
        )}
      >
        {children}
      </View>
    </Wrapper>
  );
};

export default Container;
