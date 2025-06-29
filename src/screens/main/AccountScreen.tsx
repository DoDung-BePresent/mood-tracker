// filepath: src/screens/main/AccountScreen.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Container from "@/components/Container";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/services/authService";
import MainHeader from "@/components/MainHeader";
import { More } from "iconsax-react-nativejs";

const AccountScreen = () => {
  const { user } = useAuth();
  return (
    <Container centered>
      <MainHeader
        title="Account"
        rightAction={
          <TouchableOpacity onPress={() => alert("More options!")}>
            <More size={24} color="#1f2937" />
          </TouchableOpacity>
        }
      />
      <View className="flex-1 justify-center items-center">
        <Text className="mb-4">Account: {user?.email}</Text>
        <Button variant="secondary" onPress={() => signOut()}>
          Sign Out
        </Button>
      </View>
    </Container>
  );
};

export default AccountScreen;
