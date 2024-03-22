import React from "react";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import {LoginScreen} from "@src/features/auth/login/LoginScreen";
import {RegisterScreen} from "@src/features/auth/register/RegisterScreen";
import {getColors} from "@src/theme/theme";

export type AuthStackNavParamList = {
  Login: undefined;
  Register: undefined;
};

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  contentStyle: {
    backgroundColor: getColors("secondary300"),
  },
};

const Stack = createNativeStackNavigator<AuthStackNavParamList>();
export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Login" component={LoginScreen} />
      {/*<Stack.Screen name="Register" component={RegisterScreen} />*/}
    </Stack.Navigator>
  );
};
