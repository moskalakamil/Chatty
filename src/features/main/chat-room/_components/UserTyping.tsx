import {images} from "@src/assets/images/Images";
import {AppImage} from "@src/features/_common/image/AppImage";
import {getColors, useTheme} from "@src/theme/theme";
import {View} from "react-native";
import {DotTypingAnimation} from "react-native-dot-typing";

export const UserTyping = () => {
  const {borderRadii} = useTheme();

  return (
    <View className={"flex-row gap-2 items-end mb-1"}>
      <AppImage source={images.defaultProfile} className={"w-[24] h-[24]"} />
      <View>
        <View
          className={"bg-white-500 w-20 h-[40] items-center justify-center"}
          style={{
            borderRadius: borderRadii.small,
            borderBottomLeftRadius: 0,
          }}>
          <DotTypingAnimation
            dotMargin={16}
            dotX={0}
            dotY={0}
            dotColor={getColors("secondary300")}
          />
        </View>
      </View>
    </View>
  );
};
