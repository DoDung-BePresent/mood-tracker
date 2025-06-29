import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AccountSetupStackParamList } from "@/types/navigation";

import NameScreen from "@/screens/account-setup/NameScreen";
import GenderScreen from "@/screens/account-setup/GenderScreen";
import AgeScreen from "@/screens/account-setup/AgeScreen";

const Stack = createNativeStackNavigator<AccountSetupStackParamList>();

const AccountSetupNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Name" component={NameScreen} />
      <Stack.Screen name="Gender" component={GenderScreen} />
      <Stack.Screen name="Age" component={AgeScreen} />
    </Stack.Navigator>
  );
};

export default AccountSetupNavigator;
