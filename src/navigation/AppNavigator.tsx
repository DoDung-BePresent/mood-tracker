import React from "react";
import { ActivityIndicator, View, TouchableOpacity, Alert } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Add } from "iconsax-react-nativejs";

import { useAuth } from "@/hooks/useAuth";
import Container from "@/components/Container";
import { RootStackParamList } from "@/types/navigation";

/**
 * Screens & Navigators
 */
import WelcomeScreen from "@/screens/auth/WelcomeScreen";
import SignUpScreen from "@/screens/auth/SignUpScreen";
import SignInScreen from "@/screens/auth/SignInScreen";
import WalkthroughScreen from "@/screens/walkthrough/WalkthroughScreen";
import AccountSetupNavigator from "./AccountSetupNavigator";
import { SetupProvider } from "@/contexts/SetupContext";
import MainTabNavigator from "./MainTabNavigator";
import DateOptionModal from "@/components/mood/DateOptionModal";
import MoodSelectorModal from "@/components/mood/MoodSelectorModal";
import CalendarModal from "@/components/mood/CalendarModal";
import { useMoodEntry } from "@/hooks/useMoodEntry";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { user, profile, isLoading } = useAuth();
  const {
    dateOptionModalVisible,
    moodSelectorModalVisible,
    calendarModalVisible,
    selectedDate,
    openDateOptionModal,
    closeAllModals,
    handleSelectToday,
    handleSelectDate,
    handleDateSelected,
    handleMoodSelected,
  } = useMoodEntry();

  if (isLoading) {
    return (
      <Container centered>
        <ActivityIndicator size="large" />
      </Container>
    );
  }

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          profile?.is_setup_complete ? (
            <Stack.Screen name="Home">
              {() => (
                <View className="flex-1 relative">
                  <MainTabNavigator />
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      bottom: 140,
                      right: 20,
                      height: 60,
                      width: 60,
                    }}
                    className="bg-primary rounded-full items-center justify-center shadow-lg shadow-black/20"
                    onPress={openDateOptionModal}
                  >
                    <Add size={32} color="white" />
                  </TouchableOpacity>
                </View>
              )}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="AccountSetup">
              {() => (
                <SetupProvider>
                  <AccountSetupNavigator />
                </SetupProvider>
              )}
            </Stack.Screen>
          )
        ) : (
          <>
            <Stack.Screen name="Walkthrough" component={WalkthroughScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
          </>
        )}
      </Stack.Navigator>

      {/* Mood Entry Modals */}
      <DateOptionModal
        visible={dateOptionModalVisible}
        onClose={closeAllModals}
        onSelectToday={handleSelectToday}
        onSelectDate={handleSelectDate}
      />

      <MoodSelectorModal
        visible={moodSelectorModalVisible}
        onClose={closeAllModals}
        onSelectMood={handleMoodSelected}
        selectedDate={selectedDate}
      />

      <CalendarModal
        visible={calendarModalVisible}
        onClose={closeAllModals}
        onSelectDate={handleDateSelected}
        selectedDate={selectedDate}
      />
    </>
  );
}
