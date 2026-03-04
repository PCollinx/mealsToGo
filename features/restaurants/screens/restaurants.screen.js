import { FadeInView } from "@/components/animations/fade.animation";
import { FavouritesBar } from "@/components/favourites/favourites-bar.component";
import { Spacer } from "@/components/spacer/spacer.component";
import { FavouritesContext } from "@/services/favourites/favourites.context";
import { LocationContext } from "@/services/location/location.context";
import { RestaurantsContext } from "@/services/restaurants/restaurants.context";
import { SafeArea } from "@/utils/safe-area.component";
import { Text } from "@/components/typography/text.component";
import React, { useContext, useState } from "react";
import { TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { styled } from "styled-components/native";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { RestaurantList } from "../components/restaurant-list.styles";
import { Search } from "../components/search.component";

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const RestaurantsScreen = ({ navigation }) => {
  const { error: locationError } = useContext(LocationContext);
  const {
    isLoading,
    restaurants,
    error: restaurantsError,
  } = useContext(RestaurantsContext);
  const { favourites } = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState(false);
  const hasError = !!locationError || !!restaurantsError;

  return (
    <SafeArea>
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )}
      {isLoading && (
        <LoadingContainer>
          <Loading animating={true} size={50} />
        </LoadingContainer>
      )}
      {hasError && (
        <Spacer position="left" size="large">
          <Text variant="error">
            Something went wrong retrieving the data. Please try again later.
          </Text>
        </Spacer>
      )}
      {!hasError && (
        <RestaurantList
          data={restaurants}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("RestaurantDetail", { restaurant: item })
                }
              >
                <Spacer position="bottom" size="medium">
                  <FadeInView>
                    <RestaurantInfoCard restaurant={item} />
                  </FadeInView>
                </Spacer>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.name}
        />
      )}
    </SafeArea>
  );
};
