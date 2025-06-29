import React from "react";
import { ActivityIndicator, View, TouchableOpacity } from "react-native";
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

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { user, profile, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Container centered>
        <ActivityIndicator size="large" />
      </Container>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        profile?.is_setup_complete ? (
          <Stack.Screen name="Home">
            {() => (
              <View
                className="flex-1"
                style={{
                  position: "relative",
                }}
              >
                <MainTabNavigator />
                <TouchableOpacity
                  className="bg-primary rounded-full items-center justify-center shadow-lg shadow-black/20"
                  onPress={() => alert("Add new mood!")}
                  style={{
                    position: "absolute",
                    right: 20,
                    bottom: 140,
                    width: 50,
                    height: 50,
                  }}
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
  );
}
