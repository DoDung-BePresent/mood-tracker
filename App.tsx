import "./global.css";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "@/navigation/AppNavigator";
import { AuthProvider } from "@/hooks/useAuth";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
