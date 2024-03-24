import {useTheme} from "@src/theme/theme";
import React from "react";
import {View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

interface MainHeaderContainerProps {
  children: React.ReactNode;
}

export const MainHeaderContainer = ({children}: MainHeaderContainerProps) => {
  const {borderRadii} = useTheme();

  const insets = useSafeAreaInsets();

  return (
    <View className={"bg-secondary-100"}>
      <View
        className={"bg-secondary-300 px-4 flex-row justify-between"}
        style={{
          paddingTop: insets.top + 20,
          paddingBottom: 20,
          borderBottomRightRadius: borderRadii.big,
          borderBottomLeftRadius: borderRadii.big,
        }}>
        {children}
      </View>
    </View>
  );
};
