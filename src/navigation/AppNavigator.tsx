import React, {useEffect, useRef} from "react";
import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import {Platform} from "react-native";
import {initApp} from "./getAppState";
import {useAppStateStore} from "@src/stores/app-state-store";
import * as SplashScreen from "expo-splash-screen";
import {MainStack} from "@src/navigation/MainStack";
import {AuthStack} from "@src/features/auth/navigation/AuthStack";
import {StatusBar} from "expo-status-bar";

export const navigationRef = createNavigationContainerRef();

export const AppNavigator = () => {
  const {appState} = useAppStateStore();
  const routeNameRef = useRef<string | null>(null);

  useEffect(() => {
    initApp().then(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current =
          navigationRef.current?.getCurrentRoute()?.name || null;
      }}>
      <StatusBar style={Platform.OS === "ios" ? "dark" : "light"} />
      {appState === "NEED_AUTH" && <AuthStack />}
      {appState === "AUTHORIZED" && <MainStack />}
    </NavigationContainer>
  );
};
