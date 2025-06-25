/**
 * Node modules
 */
import React from "react";
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  Dimensions,
} from "react-native";

interface WalkthroughItemProps {
  item: {
    id: string;
    image: ImageSourcePropType;
    title: string;
    subtitle: string;
  };
}

const { width } = Dimensions.get("window");

const WalkthroughItem: React.FC<WalkthroughItemProps> = ({ item }) => {
  return (
    <View className="items-center px-5 pt-15" style={{ width: width }}>
      <View className="flex-1 justify-center items-center mb-10">
        <Image
          source={item.image}
          className="max-h-[400px]"
          style={{
            width: width * 0.8,
            height: width * 0.8,
          }}
          resizeMode="contain"
        />
      </View>
      <View className="items-center pb-25 px-5">
        <Text className="text-2xl font-bold text-textPrimary text-center mb-4 leading-8">
          {item.title}
        </Text>
        <Text className="text-base text-textSecondary text-center leading-6">
          {item.subtitle}
        </Text>
      </View>
    </View>
  );
};

export default WalkthroughItem;
