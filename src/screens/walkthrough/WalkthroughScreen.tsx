/**
 * Node modules
 */
import React, { useState, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

/**
 * Components
 */
import Container from "@/components/Container";
import WalkthroughItem from "./components/WalkthroughItem";
import WalkthroughPagination from "./components/WalkthroughPagination";

/**
 * Types
 */
import { RootStackParamList } from "@/types/navigation";

/**
 * Utils
 */
import { cn } from "@/utils/cn";
import Button from "@/components/ui/Button";

const walkthroughData = [
  {
    id: "1",
    image: require("../../assets/walkthrough/light_walkthrough_1.png"),
    title: "Welcome to Lumio - Track Your Daily Moods",
    subtitle:
      "Easily log your emotions and activities everyday to gain valuable insights into your mental wellbeing.",
  },
  {
    id: "2",
    image: require("../../assets/walkthrough/light_walkthrough_2.png"),
    title: "Gain Valuable & Detailed Mood Insights",
    subtitle:
      "Monitor your progress with detailed mood charts, mood count, activity counts, etc to enhance your mood.",
  },
  {
    id: "3",
    image: require("../../assets/walkthrough/light_walkthrough_3.png"),
    title: "Stay Motivated with Achievements",
    subtitle:
      "Earn badges as you track your mood, making your journey to better mental health fun and engaging.",
  },
];

type Props = NativeStackScreenProps<RootStackParamList, "Walkthrough">;

const WalkthroughScreen: React.FC<Props> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNext = () => {
    if (currentIndex < walkthroughData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.replace("Home");
    }
  };

  const handleSkip = () => {
    navigation.replace("Home");
  };

  const isLastSlide = currentIndex === walkthroughData.length - 1;

  return (
    <Container>
      {/* FlatList for walkthrough items */}
      <FlatList
        ref={flatListRef}
        data={walkthroughData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfig}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <WalkthroughItem item={item} />}
      />

      {/* Bottom section */}
      <View className="pb-5">
        {/* Pagination */}
        <WalkthroughPagination
          data={walkthroughData}
          currentIndex={currentIndex}
        />

        {/* Action buttons */}
        <View className="flex-row gap-5 px-5 justify-between items-center border-t border-border pt-5">
          <Button variant="secondary" onPress={handleSkip}>
            Skip
          </Button>

          <Button
            variant="primary"
            onPress={handleNext}
            className="min-w-[120px]"
          >
            {isLastSlide ? "Let's Get Started" : "Continue"}
          </Button>
        </View>
      </View>
    </Container>
  );
};

export default WalkthroughScreen;
