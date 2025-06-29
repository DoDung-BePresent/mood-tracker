import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home2, Diagram, Calendar, Profile } from "iconsax-react-nativejs";

// Screens
import HomeScreen from "@/screens/main/HomeScreen";
import InsightsScreen from "@/screens/main/InsightsScreen";
import CalendarScreen from "@/screens/main/CalendarScreen";
import AccountScreen from "@/screens/main/AccountScreen";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#5A8C3C", // primary color
        tabBarInactiveTintColor: "#94a3b8", // gray-400
        tabBarStyle: {
          height: 120,
          position: "absolute",
          borderTopWidth: 1,
          borderTopColor: "#f1f5f9",
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Home2
              size={28}
              color={color}
              variant={focused ? "Bold" : "Outline"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Insights"
        component={InsightsScreen}
        options={{
          tabBarLabel: "Insights",
          tabBarIcon: ({ color, focused }) => (
            <Diagram
              size={28}
              color={color}
              variant={focused ? "Bold" : "Outline"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarLabel: "Calendar",
          tabBarIcon: ({ color, focused }) => (
            <Calendar
              size={28}
              color={color}
              variant={focused ? "Bold" : "Outline"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color, focused }) => (
            <Profile
              size={28}
              color={color}
              variant={focused ? "Bold" : "Outline"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
