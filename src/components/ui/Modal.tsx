import React from "react";
import {
  View,
  Modal as RNModal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { cn } from "@/utils/cn";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
  className,
}) => {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/50 justify-center items-center p-5">
          <TouchableWithoutFeedback>
            <View
              className={cn(
                "bg-white rounded-2xl p-6 w-full max-w-sm",
                className
              )}
            >
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

export default Modal;
