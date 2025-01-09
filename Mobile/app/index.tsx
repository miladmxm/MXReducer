import { Text, View } from "react-native";
import UploadFile from "@/components/doc";
import "@/app/global.css";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UploadFile />
      <Text className="text-red-400">
        Edit app/index.tsx to edit this screen.
      </Text>
    </View>
  );
}
