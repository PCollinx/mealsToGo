import { MapScreen } from "@/features/map/screens/map.screen";
import { RestaurantdetailScreen } from "@/features/restaurants/screens/restaurant-detail.screen";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";

const MapStack = createStackNavigator();

export const MapNavigator = () => {
  return (
    <MapStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <MapStack.Screen name="MapMain" component={MapScreen} />
      <MapStack.Screen
        name="RestaurantDetail"
        component={RestaurantdetailScreen}
      />
    </MapStack.Navigator>
  );
};
