import { RestaurantdetailScreen } from "@/features/restaurants/screens/restaurant-detail.screen";
import { RestaurantsScreen } from "@/features/restaurants/screens/restaurants.screen";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";

const RestaurantsStack = createStackNavigator();

export const RestaurantsNavigator = () => {
  return (
    <RestaurantsStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <RestaurantsStack.Screen
        name="RestaurantsList"
        component={RestaurantsScreen}
      />
      <RestaurantsStack.Screen
        name="RestaurantDetail"
        component={RestaurantdetailScreen}
      />
    </RestaurantsStack.Navigator>
  );
};
