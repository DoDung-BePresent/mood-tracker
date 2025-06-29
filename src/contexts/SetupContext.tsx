import React, { createContext, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AccountSetupStackParamList } from "@/types/navigation";
import { updateProfile } from "@/services/profileService";

type SetupData = {
  username: string;
  gender: "male" | "female" | "other" | null;
  age: number | null;
};

interface SetupContextType {
  currentStep: number;
  totalSteps: number;
  setupData: SetupData;
  updateData: (data: Partial<SetupData>) => void;
  setCurrentStep: (step: number) => void;
  finishSetup: () => Promise<void>;
}

const SetupContext = createContext<SetupContextType | undefined>(undefined);

export const useSetup = () => {
  const context = useContext(SetupContext);
  if (!context) {
    throw new Error("useSetup must be used within a SetupProvider");
  }
  return context;
};

export const SetupProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [setupData, setSetupData] = useState<SetupData>({
    username: "",
    gender: null,
    age: 25,
  });

  const totalSteps = 3;

  const updateData = (data: Partial<SetupData>) => {
    setSetupData((prev) => ({ ...prev, ...data }));
  };

  const finishSetup = async () => {
    try {
      await updateProfile({ ...setupData, is_setup_complete: true });
    } catch (error) {
      console.error("Failed to finish setup:", error);
    }
  };

  return (
    <SetupContext.Provider
      value={{
        currentStep,
        totalSteps,
        setupData,
        updateData,
        setCurrentStep,
        finishSetup,
      }}
    >
      {children}
    </SetupContext.Provider>
  );
};

export const useSetupNavigation = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AccountSetupStackParamList>>();
  const { currentStep, setCurrentStep, updateData } = useSetup();

  const nextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
      navigation.navigate("Gender");
    } else if (currentStep === 2) {
      setCurrentStep(3);
      navigation.navigate("Age");
    }
  };

  const goBack = () => {
    if (currentStep === 3) {
      updateData({ age: null });
      setCurrentStep(2);
    } else if (currentStep === 2) {
      updateData({ gender: null });
      setCurrentStep(1);
    }
    navigation.goBack();
  };

  return { nextStep, goBack };
};
