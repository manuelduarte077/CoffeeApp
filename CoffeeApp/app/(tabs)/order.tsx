import { StyleSheet, FlatList } from "react-native";

import { Text, View } from "@/components/Themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

interface Order {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function OrderScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getOrders = async () => {
    const orders = await AsyncStorage.getItem("cart");
    if (orders) {
      setOrders(JSON.parse(orders));
    }
    setIsLoading(false);
  };

  console.log(orders);

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#63519f",
                }}
              >{item.name}</Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "medium",
                }}
              >{item.price}</Text>
            </View>

            <Ionicons
              name="trash"
              size={24}
              color="black"
              onPress={() => {
                const newOrders = orders.filter(
                  (order) => order.id !== item.id
                );
                setOrders(newOrders);
                AsyncStorage.setItem("cart", JSON.stringify(newOrders));
              }}
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  card: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
