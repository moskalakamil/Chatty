import React from "react";
import {LoginForm} from "./LoginForm";
import {Text, View} from "react-native";
import HeadingText from "@src/features/auth/components/HeadingText";
import {useT} from "@src/i18n/useTranslation";
import {useTheme} from "@src/theme/theme";
import AuthModeToggle from "@src/features/auth/components/AuthModeToggle";

export const LoginScreen = () => {
  const {t} = useT();
  const {textVariants} = useTheme();
  return (
    <View className="justify-between pt-20 flex-1 w-full px-4 flex-grow">
      <View className={"flex-1"}>
        <HeadingText text={t("auth.welcomeBack")} />
        <Text style={textVariants.h2} className={"text-white-500 mt-6 mb-8"}>
          {t("auth.loginSubtitle")}
        </Text>
        <LoginForm />
      </View>
      <View className={"py-10"}>
        <AuthModeToggle
          mode={"login"}
          text={[t("auth.dontHaveAccount"), t("auth.signUp")]}
        />
      </View>
    </View>
  );
};
