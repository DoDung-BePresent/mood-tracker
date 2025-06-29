import React, { useState, useCallback } from "react";
import { View, Text } from "react-native";
import SetupLayout from "./components/SetupLayout";
import AgePicker from "./components/AgePicker";
import { useSetup } from "@/contexts/SetupContext";
import { useFocusEffect } from "@react-navigation/native";

const AgeScreen = () => {
  const { setupData, updateData, finishSetup, setCurrentStep } = useSetup();
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setCurrentStep(3);
    }, [])
  );

  const handleContinue = async () => {
    setLoading(true);
    await finishSetup();
    // Không cần setLoading(false) vì AuthProvider sẽ chuyển màn hình
  };

  return (
    <SetupLayout
      onContinue={handleContinue}
      isContinueDisabled={!setupData.age || loading}
    >
      <View className="section">
        <Text className="title">How old are you?</Text>
        <Text className="sub-title">We'd like to know more about you.</Text>
      </View>
      <AgePicker
        selectedAge={setupData.age}
        onSelect={(age) => updateData({ age })}
      />
    </SetupLayout>
  );
};
export default AgeScreen;
