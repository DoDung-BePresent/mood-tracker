import React, { useState, useCallback } from "react";
import { View, Text } from "react-native";
import Input from "@/components/ui/Input";
import SetupLayout from "./components/SetupLayout";
import { useSetup, useSetupNavigation } from "@/contexts/SetupContext";
import { useFocusEffect } from "@react-navigation/native";

const NameScreen = () => {
  const { setupData, updateData, setCurrentStep } = useSetup();
  const { nextStep } = useSetupNavigation();

  useFocusEffect(
    useCallback(() => {
      setCurrentStep(1);
    }, [])
  );

  const handleContinue = () => {
    nextStep();
  };

  return (
    <SetupLayout
      onContinue={handleContinue}
      isContinueDisabled={!setupData.username}
    >
      <View className="section">
        <Text className="title-sm text-center">What should we call you?</Text>
        <Text className="sub-title text-center">
          First things first, enter your nickname.
        </Text>
      </View>
      <Input
        placeholder="Andrew"
        size="lg"
        value={setupData.username || ""}
        textAlign="center"
        onChangeText={(name) => updateData({ username: name })}
      />
    </SetupLayout>
  );
};
export default NameScreen;
