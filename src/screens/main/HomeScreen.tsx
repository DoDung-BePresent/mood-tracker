// filepath: src/screens/main/HomeScreen.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Container from "@/components/Container";
import MainHeader from "@/components/MainHeader";
import { SearchNormal1 } from "iconsax-react-nativejs";

const HomeScreen = () => {
  return (
    <Container>
      <MainHeader
        title="Home"
        rightAction={
          <TouchableOpacity onPress={() => alert("Search!")}>
            <SearchNormal1 size={24} color="#1f2937" />
          </TouchableOpacity>
        }
      />

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
