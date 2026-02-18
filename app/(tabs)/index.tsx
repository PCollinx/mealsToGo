import { theme } from "@/infrastructure/theme";
import { AuthenticationContextProvider } from "@/services/authentication/authentication.context";

import { StatusBar as ExpoStatusBar } from "expo-status-bar";

import { Navigation } from "@/infrastructure/navigation";

import { Lato_400Regular, useFonts as useLato } from "@expo-google-fonts/lato";
import {
  Oswald_400Regular,
  useFonts as useOswald,
} from "@expo-google-fonts/oswald";

import { ThemeProvider } from "styled-components/native";

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
      <AuthenticationContextProvider>
        <Navigation />
      </AuthenticationContextProvider>
      <ExpoStatusBar style="auto" />
    </ThemeProvider>
  );
}
