import React from "react";
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import {NavigatorScreenParams, useNavigation} from "@react-navigation/native";
import {View} from "react-native";

export type MainStackParamList = {
  ChatList: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStack = () => {
  const screenOptions: NativeStackNavigationOptions = {
    contentStyle: {
      backgroundColor: "white",
    },
  };

  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName={"ChatList"}>
      <Stack.Screen name={'ChatList'} component={() => <View />} />
    </Stack.Navigator>
  );
};

export const useMainNavigation = () =>
  useNavigation<NativeStackNavigationProp<MainStackParamList>>();
