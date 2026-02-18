import { FavouritesScreen } from "@/features/settings/screens/favourites.screen";
import { SettingsScreen } from "@/features/settings/screens/settings.screen";
import { CameraScreen } from "@/features/settings/screens/camera.screen";
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";

const SettingsStack = createStackNavigator();

export const SettingsNavigator = ({ route, navigation }) => {
  return (
    <SettingsStack.Navigator
      headerMode="none"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <SettingsStack.Screen
        options={{ header: () => null }}
        name="SettingsMain"
        component={SettingsScreen}
      />
      <SettingsStack.Screen name="Favourites" component={FavouritesScreen} />
      <SettingsStack.Screen name="Camera" component={CameraScreen} />
    </SettingsStack.Navigator>
  );
};
