import AppEntry from "@src/AppEntry";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {useCallback} from "react";

SplashScreen.preventAutoHideAsync();

export default () => {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("./src/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./src/assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./src/assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./src/assets/fonts/Poppins-Bold.ttf"),
  });

  useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return <AppEntry />;
};
