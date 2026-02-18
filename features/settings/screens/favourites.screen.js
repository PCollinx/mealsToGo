import { Spacer } from "@/components/spacer/spacer.component";
import { Text } from "@/components/typography/text.component";
import { RestaurantInfoCard } from "@/features/restaurants/components/restaurant-info-card.component";
import { RestaurantList } from "@/features/restaurants/components/restaurant-list.styles";
import { FavouritesContext } from "@/services/favourites/favourites.context";
import { SafeArea } from "@/utils/safe-area.component";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { styled } from "styled-components/native";

const NoFavouritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;

export const FavouritesScreen = ({ navigation }) => {
  const { favourites } = useContext(FavouritesContext);
  return favourites.length ? (
    <SafeArea>
      <RestaurantList
        data={favourites}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RestaurantDetail", { restaurant: item })
              }
            >
              <Spacer position="bottom" size="medium">
                <RestaurantInfoCard restaurant={item} />
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  ) : (
    <NoFavouritesArea>
      <Text variant="label">You have no favourites yet</Text>
    </NoFavouritesArea>
  );
};
