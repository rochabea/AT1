import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#000000ff",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: { backgroundColor: "#fff", paddingBottom: 5, height: 60 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/home.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#000000ff" : "#999", 
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Busca"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/lupa.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#000000ff" : "#999",
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Pedidos"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/pedido.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#000000ff" : "#999",
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Perfil"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/perfil.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#000000ff" : "#999",
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}
