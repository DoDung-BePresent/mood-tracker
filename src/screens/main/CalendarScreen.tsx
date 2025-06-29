// filepath: src/screens/main/CalendarScreen.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Container from "@/components/Container";
import MainHeader from "@/components/MainHeader";
import { More } from "iconsax-react-nativejs";

const CalendarScreen = () => (
  <Container centered>
    <MainHeader
      title="Calendar"
      rightAction={
        <TouchableOpacity onPress={() => alert("More options!")}>
          <More size={24} color="#1f2937" />
        </TouchableOpacity>
      }
    />
    <View className="flex-1 justify-center items-center">
      <Text>Calendar Screen</Text>
    </View>
  </Container>
);

export default CalendarScreen;
