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
import { SignUpSchema, SignUpCredentials } from "@/schema/authSchema";
import { signUpWithEmail } from "@/services/authService";

import Container from "@/components/Container";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Checkbox from "@/components/ui/Checkbox";

type Props = NativeStackScreenProps<RootStackParamList, "SignUp">;

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpCredentials>({
    resolver: zodResolver(SignUpSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      agreedToTerms: false,
    },
  });

  const onSubmit = async (data: SignUpCredentials) => {
    setLoading(true);
    try {
      await signUpWithEmail(data);
    } catch (error: any) {
      Alert.alert("Sign Up Error", error.message);
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
          {/* Heading Section */}
          <View className="section">
            <Text className="title">Join Lumio Today ✨</Text>
            <Text className="sub-title">
              Start tracking your moods and earn achievement badges.
            </Text>
          </View>

          {/* Form Section */}
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
                  description="Password must be at least 6 characters"
                />
              )}
            />
            <Controller
              control={control}
              name="agreedToTerms"
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  checked={value}
                  onCheckedChange={onChange}
                  className="mb-4"
                  label={
                    <Text className="text-muted-foreground">
                      I agree to Lumio{" "}
                      <Text className="text-primary font-semibold">
                        Terms & Conditions.
                      </Text>
                    </Text>
                  }
                />
              )}
            />
          </View>

          {/* Button Section */}
          <View className="section">
            <Button
              variant="primary"
              onPress={handleSubmit(onSubmit)}
              disabled={loading || !isValid}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </View>

          {/* Link Section */}
          <View className="section">
            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
              <Text className="text-center text-muted-foreground">
                Already have an account?{" "}
                <Text className="text-primary font-semibold">Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default SignUpScreen;
