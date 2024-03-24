import {Icon} from "@src/assets/icons/Icon";
import {MainHeaderContainer} from "@src/features/main/_components/MainHeaderContainer";
import {useT} from "@src/i18n/useTranslation";
import {useTheme} from "@src/theme/theme";
import {Pressable, Text, View} from "react-native";

export const ChatListHeader = () => {
  const {t} = useT();
  const {textVariants} = useTheme();

  return (
    <MainHeaderContainer>
      <Text style={textVariants.h1} className={"text-primary-500"}>
        {t("chat.rooms")}
      </Text>
      <View className={"flex-row gap-4"}>
        <Pressable>
          <Icon name={"search"} />
        </Pressable>
        <Pressable>
          <Icon name={"rooms"} />
        </Pressable>
      </View>
    </MainHeaderContainer>
  );
};
