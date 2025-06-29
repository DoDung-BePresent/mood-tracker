import React from "react";
import { Text, ActivityIndicator, Alert, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useAuth } from "@/hooks/useAuth";
import Container from "@/components/Container";
import { RootStackParamList } from "@/types/navigation";

/**
 * Screens
 */
import WelcomeScreen from "@/screens/auth/WelcomeScreen";
import SignUpScreen from "@/screens/auth/SignUpScreen";
import SignInScreen from "@/screens/auth/SignInScreen";
import WalkthroughScreen from "@/screens/walkthrough/WalkthroughScreen";
import { signOut } from "@/services/authService";
import Button from "@/components/ui/Button";
import AccountSetupNavigator from "./AccountSetupNavigator";
import { SetupProvider } from "@/contexts/SetupContext";

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen() {
  const handleLogout = async () => {
    try {
      await signOut();
      // AuthProvider sẽ tự động xử lý việc chuyển màn hình
    } catch (error: any) {
      Alert.alert("Logout Error", error.message);
    }
  };

  return (
    <Container centered padded>
      <View className="items-center">
        <Text className="text-2xl font-bold mb-3">
          Welcome to Mood Tracker!
        </Text>
        <Text className="text-center mb-8">Main app will be here</Text>
        <Button variant="secondary" onPress={handleLogout}>
          Sign Out
        </Button>
      </View>
    </Container>
  );
}

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
          <Stack.Screen name="Home" component={HomeScreen} />
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
