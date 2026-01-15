import { RestaurantsScreen } from "@/features/restaurants/screens/restaurants.screen";
import { theme } from "@/infrastructure/theme";
import { SafeArea } from "@/utils/safe-area.component";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Text } from "react-native";

import { Lato_400Regular, useFonts as useLato } from "@expo-google-fonts/lato";
import {
  Oswald_400Regular,
  useFonts as useOswald,
} from "@expo-google-fonts/oswald";

import React from "react";
import { ThemeProvider } from "styled-components/native";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: "restaurant-outline",
  Settings: "settings-outline",
  Map: "map-outline",
};

const createScreenOptions = ({ route }: { route: { name: string } }) => {
  const iconName = TAB_ICON[route.name as keyof typeof TAB_ICON];
  return {
    tabBarIcon: ({ size, color }: { size: number; color: string }) => (
      <Ionicons name={iconName as any} size={size} color={color} />
    ),
    tabBarActiveTintColor: "tomato",
    tabBarInactiveTintColor: "gray",
    headerShown: false,
  };
};

const SettingsScreen = () => (
  <SafeArea>
    <Text>Settings!</Text>
  </SafeArea>
);
const MapScreen = () => (
  <SafeArea>
    <Text>Map!</Text>
  </SafeArea>
);

export default function HomeScreen() {
  const [oswoldLoaded] = useOswald({
    Oswald_400Regular: Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular: Lato_400Regular,
  });

  if (!oswoldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Tab.Navigator screenOptions={createScreenOptions}>
        <Tab.Screen name="Restaurants" component={RestaurantsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
      </Tab.Navigator>
      <ExpoStatusBar style="auto" />
    </ThemeProvider>
  );
}
