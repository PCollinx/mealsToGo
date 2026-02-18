import { Entypo } from "@expo/vector-icons";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { styled } from "styled-components/native";

import { FavouritesContext } from "@/services/favourites/favourites.context";

const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 9;
`;

export const Favourite = ({ restaurant }) => {
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);
  const isFavourite = favourites.find((x) => x.placeId === restaurant.placeId);

  return (
    <FavouriteButton
      onPress={() =>
        !isFavourite
          ? addToFavourites(restaurant)
          : removeFromFavourites(restaurant)
      }
    >
      <Entypo
        name={isFavourite ? "heart" : "heart-outlined"}
        size={24}
        color={isFavourite ? "red" : "white"}
      ></Entypo>
    </FavouriteButton>
  );
};
