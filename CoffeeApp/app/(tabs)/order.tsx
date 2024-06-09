import { StyleSheet, FlatList } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";


export default function OrderScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={[{ key: "1" }]}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Order</Text>
            <EditScreenInfo path="app/(tabs)/order.tsx" />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    margin: 10,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },
});
