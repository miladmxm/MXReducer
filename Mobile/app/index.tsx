import { Text, View } from "react-native";
import UploadFile from "@/components/doc";

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
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
