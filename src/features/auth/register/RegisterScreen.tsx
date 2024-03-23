import {RegisterForm} from "./RegisterForm";
import {View} from "react-native";
import HeadingText from "@src/features/auth/_components/HeadingText";
import {useT} from "@src/i18n/useTranslation";
import AuthModeToggle from "@src/features/auth/_components/AuthModeToggle";
import {Terms} from "@src/features/auth/_components/Terms";

export const RegisterScreen = () => {
  const {t} = useT();
  return (
    <View className="justify-between pt-20 flex-1 w-full px-4 flex-grow">
      <View className={"flex-1"}>
        <HeadingText text={t("auth.createAccount")} />
        <RegisterForm />
      </View>
      <View className={"pb-10 pt-3"}>
        <Terms />
        <AuthModeToggle
          mode={"signup"}
          text={[t("auth.alreadyHaveAccount"), t("auth.login")]}
        />
      </View>
    </View>
  );
};
