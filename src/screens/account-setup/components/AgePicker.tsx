import React, { useRef } from "react";
import {
  View,
  Text,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { cn } from "@/utils/cn";

interface AgePickerProps {
  selectedAge: number | null;
  onSelect: (age: number) => void;
}

const ages = Array.from({ length: 83 }, (_, i) => i + 18);
const ITEM_HEIGHT = 60;
const CONTAINER_HEIGHT = ITEM_HEIGHT * 5;

// Tính toán trước các điểm snap để có độ chính xác tuyệt đối
const snapToOffsets = ages.map((_, index) => index * ITEM_HEIGHT);

const AgePicker: React.FC<AgePickerProps> = ({ selectedAge, onSelect }) => {
  const flatListRef = useRef<FlatList>(null);

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    const age = ages[index];
    if (age) {
      onSelect(age);
    }
  };

  return (
    <View
      style={{ height: CONTAINER_HEIGHT }}
      className="relative justify-center"
    >
      {/* Lớp phủ để tạo hiệu ứng mờ và đường kẻ trung tâm */}
      <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center pointer-events-none">
        <View
          style={{ height: ITEM_HEIGHT }}
          className="w-full border-y-2 border-primary/50 rounded-lg"
        />
      </View>

      <FlatList
        ref={flatListRef}
        data={ages}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
        snapToOffsets={snapToOffsets}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingVertical: (CONTAINER_HEIGHT - ITEM_HEIGHT) / 2,
        }}
        initialScrollIndex={selectedAge ? ages.indexOf(selectedAge) : 7}
        // THÊM LẠI getItemLayout ĐỂ SỬA LỖI
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={({ item }) => (
          <View
            style={{ height: ITEM_HEIGHT }}
            className="items-center justify-center"
          >
            <Text
              className={cn(
                "text-3xl",
                selectedAge === item
                  ? "font-bold text-primary text-5xl pl-16"
                  : "font-normal text-muted-foreground"
              )}
            >
              {item}
              {selectedAge === item && <Text className="text-xl"> years</Text>}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default AgePicker;
