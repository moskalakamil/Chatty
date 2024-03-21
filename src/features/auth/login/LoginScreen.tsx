import React from "react";
import {LoginForm} from "./LoginForm";
import {View} from "react-native";

export const LoginScreen = () => {
  return (
    <View className="items-center justify-center flex-1 flex-grow">
      <LoginForm />
    </View>
  );
};
