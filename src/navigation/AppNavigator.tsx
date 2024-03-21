import React, {useEffect, useRef} from "react";
import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import {Platform, StatusBar} from "react-native";
import {initApp} from "./getAppState";
import {useAppStateStore} from "@src/stores/app-state-store";
import {hideAsync} from 'expo-splash-screen';
import {MainStack} from "@src/navigation/MainStack";
import {Icon} from "@src/assets/icons/Icon";

export const navigationRef = createNavigationContainerRef();

export const AppNavigator = () => {
  const {appState} = useAppStateStore();
  const routeNameRef = useRef<string | null>(null);

  useEffect(() => {
    initApp().then(() => {
        hideAsync();
    });
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current =
          navigationRef.current?.getCurrentRoute()?.name || null;
      }}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />
      {appState === "NEED_AUTH" && <Icon name={"plus"} />}
      {appState === "AUTHORIZED" && <MainStack />}
    </NavigationContainer>
  );
};
