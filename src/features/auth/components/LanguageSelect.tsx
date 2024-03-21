import {Icon} from "@src/assets/Icon";
import {OverlayMenu} from "@src/common/menu/OverlayMenu";
import {changeLanguage} from "@src/i18n/changeLanguage";
import {AppLanguage} from "@src/i18n/language";
import {useT} from "@src/i18n/useTranslation";
import {useTheme} from "@src/theme/theme";
import React from "react";
import {View, Text} from "react-native";

interface LanguageSelectProps {
  paddingTop: number;
}

export const LanguageSelect = ({paddingTop}: LanguageSelectProps) => {
  const {i18n} = useT();
  const {colors} = useTheme();
  const handleLanguage = (lang: string) => {
    changeLanguage(lang as AppLanguage);
  };
  return (
    <View
      style={{
        position: "absolute",
        right: 16,
        top: paddingTop + 24,
      }}>
      <OverlayMenu
        onPressAction={e => {
          const id = e.nativeEvent.event;
          handleLanguage(id);
        }}
        actions={[
          {title: "English", id: "en"},
          {title: "Deutsch", id: "de"},
          {title: "Francais", id: "fr"},
          {title: "Italiano", id: "it"},
        ]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}>
          <Text>{i18n.language.toUpperCase()}</Text>
          <Icon
            name="star"
            width="16"
            height="16"
            fill={colors.primary500}
            color={colors.primary500}
          />
        </View>
      </OverlayMenu>
    </View>
  );
};
