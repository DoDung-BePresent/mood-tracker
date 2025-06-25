import "./global.css";

/**
 * Node modules
 */
import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/**
 * Components
 */
import Container from "@/components/Container";

/**
 * Types
 */
import { RootStackParamList } from "@/types/navigation";

/**
 * Screens
 */
import WalkthroughScreen from "@/screens/walkthrough/WalkthroughScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen() {
  return (
    <Container centered padded>
      <Text className="text-2xl font-bold text-textPrimary mb-3">
        Welcome to Mood Tracker!
      </Text>
      <Text className="text-base text-textSecondary text-center">
        Main app will be here
      </Text>
    </Container>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Walkthrough"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Walkthrough" component={WalkthroughScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
