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
  ImageBackground,
} from "react-native";

interface WalkthroughItemProps {
  item: {
    id: string;
    image: ImageSourcePropType;
    title: string;
    subtitle: string;
  };
}

const { width, height } = Dimensions.get("window");

const WalkthroughItem: React.FC<WalkthroughItemProps> = ({ item }) => {
  return (
    <View className="items-center px-2" style={{ width: width }}>
      <View
        className="mb-10 overflow-hidden rounded-b-3xl"
        style={{
          height: height * 0.6,
        }}
      >
        <ImageBackground
          source={item.image}
          style={{
            width: width,
            height: height * 0.9,
          }}
          resizeMode="cover"
        />
      </View>
      <View className="items-center px-4">
        <Text className="title text-center !text-3xl">{item.title}</Text>
        <Text className="sub-title text-center">{item.subtitle}</Text>
      </View>
    </View>
  );
};

export default WalkthroughItem;
