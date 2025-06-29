// filepath: src/screens/main/HomeScreen.tsx
import React from "react";
import { View, Text, Image } from "react-native";
import Container from "@/components/Container";
import { useAuth } from "@/hooks/useAuth";

const HomeScreen = () => {
  const { profile } = useAuth();

  return (
    <Container>
      {/* Header */}
      <View className="flex-row justify-between items-center p-5">
        <View>
          <Text className="text-2xl font-bold text-text">
            Hi, {profile?.username || "User"}!
          </Text>
          <Text className="text-muted-foreground">Let's check in</Text>
        </View>
        <Image source={require("@/assets/logo.png")} className="w-12 h-12" />
      </View>

      {/* Empty State Content */}
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl font-bold text-text mb-2">No Entries Yet</Text>
        <Text className="text-muted-foreground text-center px-10">
          Tap the big plus button to log your first mood and start your journey!
        </Text>
      </View>
    </Container>
  );
};

export default HomeScreen;
