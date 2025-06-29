// filepath: src/screens/main/AccountScreen.tsx
import React from "react";
import { View, Text } from "react-native";
import Container from "@/components/Container";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/services/authService";

const AccountScreen = () => {
  const { user } = useAuth();
  return (
    <Container centered>
      <Text className="mb-4">Account: {user?.email}</Text>
      <Button variant="secondary" onPress={() => signOut()}>
        Sign Out
      </Button>
    </Container>
  );
};

export default AccountScreen;
