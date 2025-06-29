import React, { useCallback } from "react";
import { View, Text } from "react-native";
import SetupLayout from "./components/SetupLayout";
import GenderSelector from "./components/GenderSelector";
import { useSetup, useSetupNavigation } from "@/contexts/SetupContext";
import { useFocusEffect } from "@react-navigation/native";

const GenderScreen = () => {
  const { setupData, updateData, setCurrentStep } = useSetup();
  const { nextStep } = useSetupNavigation();

  useFocusEffect(
    useCallback(() => {
      setCurrentStep(2);
    }, [])
  );

  const handleContinue = () => {
    nextStep();
  };

  return (
    <SetupLayout
      onContinue={handleContinue}
      isContinueDisabled={!setupData.gender}
    >
      <View className="section">
        <Text className="title text-center">What is your gender?</Text>
        <Text className="sub-title text-center">
          Help us tailor your experience.
        </Text>
      </View>
      <GenderSelector
        selectedGender={setupData.gender}
        onSelect={(gender) => updateData({ gender })}
        className="mt-20"
      />
    </SetupLayout>
  );
};
export default GenderScreen;
