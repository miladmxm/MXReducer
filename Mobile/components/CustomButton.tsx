import { View, Text, TouchableOpacity } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
const CustomButton = ({
  onPress,
  children,
}: {
  onPress: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Animated.View layout={LinearTransition}>
      <TouchableOpacity
        onPress={onPress}
        className="border-4 border-gray-2 flex flex-row items-center gap-2 p-3 rounded-lg bg-gray-3 w-fit"
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CustomButton;
