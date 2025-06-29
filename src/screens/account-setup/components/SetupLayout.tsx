// filepath: src/screens/account-setup/components/SetupLayout.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Container from "@/components/Container";
import Button from "@/components/ui/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSetup, useSetupNavigation } from "@/contexts/SetupContext";
import { ArrowLeft2 } from "iconsax-react-nativejs";

const SetupLayout = ({
  children,
  onContinue,
  isContinueDisabled = false,
}: {
  children: React.ReactNode;
  onContinue: () => void;
  isContinueDisabled?: boolean;
}) => {
  const insets = useSafeAreaInsets();
  const { currentStep, totalSteps } = useSetup();
  const { goBack } = useSetupNavigation();

  return (
    // Thay thế Container mặc định để ghi đè hành vi nút back
    <View className="flex-1 bg-background">
      <View className="h-14 flex-row items-center px-4 mt-10">
        <TouchableOpacity
          onPress={goBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeft2 size={24} color="#1f2937" />
        </TouchableOpacity>
      </View>
      <View className="flex-1 px-5">
        {/* Progress Bar */}
        <View className="flex-row items-center my-4">
          <Text className="text-muted-foreground font-bold text-lg mr-4">{`${currentStep} / ${totalSteps}`}</Text>
          <View className="flex-1 h-3 bg-gray-200 rounded-full">
            <View
              className="h-3 bg-primary rounded-full"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </View>
        </View>

        {/* Content */}
        <View className="flex-1 justify-start py-5">{children}</View>

        {/* Continue Button */}
        <View style={{ paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }}>
          <Button
            variant="primary"
            onPress={onContinue}
            disabled={isContinueDisabled}
          >
            Continue
          </Button>
        </View>
      </View>
    </View>
  );
};
export default SetupLayout;
