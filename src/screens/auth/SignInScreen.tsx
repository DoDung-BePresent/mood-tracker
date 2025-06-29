import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Personalcard } from "iconsax-react-nativejs";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigation";
import { SignInSchema, SignInCredentials } from "@/schema/authSchema";
import { signInWithEmail } from "@/services/authService";

import Container from "@/components/Container";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

type Props = NativeStackScreenProps<RootStackParamList, "SignIn">;

const SignInScreen: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInCredentials>({
    resolver: zodResolver(SignInSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInCredentials) => {
    setLoading(true);
    try {
      await signInWithEmail(data);
    } catch (error: any) {
      Alert.alert("Sign In Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container padded withBackButton>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          showsVerticalScrollIndicator={false}
        >
          <View className="section">
            <Text className="title">Welcome Back! 👋</Text>
            <Text className="sub-title">
              Continue tracking your moods and earning badges.
            </Text>
          </View>

          <View className="section">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  prefix={<Personalcard size={20} />}
                  placeholder="Email"
                  label="Email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.email?.message}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  prefix={<Lock size={20} />}
                  placeholder="Password"
                  label="Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.password?.message}
                  secureTextEntry
                />
              )}
            />
          </View>

          <Button
            variant="primary"
            onPress={handleSubmit(onSubmit)}
            disabled={loading || !isValid}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          <TouchableOpacity
            className="mt-6"
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text className="text-center text-muted-foreground">
              Don't have an account?{" "}
              <Text className="text-primary font-semibold">Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default SignInScreen;
