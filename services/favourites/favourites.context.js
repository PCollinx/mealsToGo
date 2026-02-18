import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../authentication/authentication.context";

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(AuthenticationContext);

  const saveFavourites = async (value, uid) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue);
    } catch (e) {
      console.log("Error storing favourites", e);
    }
  };

  const loadFavourites = async () => {
    try {
      const value = await AsyncStorage.getItem(`@favourites-${user.uid}`);
      if (value !== null) {
        setFavourites(JSON.parse(value));
      }
    } catch (e) {
      console.log("Error loading favourites", e);
    } finally {
      setIsLoading(false);
    }
  };

  const add = (restaurant) => {
    const newFavourites = [...favourites, restaurant];
    setFavourites(newFavourites);
    saveFavourites(newFavourites);
  };

  const remove = (restaurant) => {
    const newFavourites = favourites.filter(
      (x) => x.placeId !== restaurant.placeId,
    );
    setFavourites(newFavourites);
    saveFavourites(newFavourites);
  };

  useEffect(() => {
    if (user) {
      loadFavourites();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      saveFavourites(favourites, user.uid);
    }
  }, [favourites, user]);

  return (
    <FavouritesContext.Provider
      value={{ favourites, addToFavourites: add, removeFromFavourites: remove }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
