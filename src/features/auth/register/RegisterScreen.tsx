import React from "react";
import {RegisterForm} from "./RegisterForm";
import {View} from "react-native";
import {AppImage} from "@src/common/image/AppImage.tsx";
import {images} from "@src/assets/images.ts";

export const RegisterScreen = () => {
  return (
    <View className="items-center justify-center flex-1 flex-grow">
      <View
        className={"flex-1 w-full items-center mt-24 justify-center flex-row"}>
        <AppImage
          source={images.logo}
          className={"w-[90%] object-contain"}
          resizeMode={"contain"}
        />
      </View>
      <RegisterForm />
    </View>
  );
};
