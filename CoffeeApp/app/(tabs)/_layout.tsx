import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { View , Text} from "react-native";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  color: string;
}) {
  return <MaterialIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].secondary,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].background,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].tint,
          height: 60,
          paddingBottom: 5,
        },  
        headerShown: useClientOnlyValue(false, true),
        headerTintColor: Colors[colorScheme ?? "light"].background,
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].tint,          
        },
       
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Menu",
          tabBarIcon: ({ color }) => <TabBarIcon name="coffee" color={color} />,
        }}
      />
      <Tabs.Screen
        name="offers"
        options={{
          title: "Offers",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="local-offer" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: "Order",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="shopping-cart-checkout" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
