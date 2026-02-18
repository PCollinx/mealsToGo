import { AuthenticationContext } from "@/services/authentication/authentication.context";
import React, { useContext } from "react";
import { AccountNavigator } from "./account.navigator";
import { AppNavigator } from "./app.navigator";

export const Navigation = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);

  return isAuthenticated ? <AppNavigator /> : <AccountNavigator />;
};
