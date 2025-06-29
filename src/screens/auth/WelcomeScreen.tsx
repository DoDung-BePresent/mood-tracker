import React from "react";
import { View, Text, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigation";
import Container from "@/components/Container";
import Button from "@/components/ui/Button";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Container centered padded>
      <View className="items-center w-full">
        <Image
          source={require("@/assets/logo.png")}
          className="w-24 h-24 mb-8"
        />
        <View className="section">
          <Text className="title text-center">Let's Get Started!</Text>
          <Text className="sub-title text-center">
            Let's dive in into your account
          </Text>
        </View>

        <View className="flex-col gap-4 w-full">
          <Button
            variant="primary"
            onPress={() => navigation.navigate("SignUp")}
          >
            Sign up
          </Button>
          <Button
            variant="secondary"
            onPress={() => navigation.navigate("SignIn")}
          >
            Sign in
          </Button>
        </View>
      </View>
    </Container>
  );
};

export default WelcomeScreen;
