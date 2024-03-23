import {Trans} from "react-i18next";
import {Alert, Linking, Pressable, Text} from "react-native";
import {useT} from "@src/i18n/useTranslation";
import {useTheme} from "@src/theme/theme";
import {useCallback} from "react";
import useKeyboard from "@src/utils/hooks/useKeyboard";

export const Terms = () => {
  const {t} = useT();
  const {textVariants} = useTheme();
  const {keyBoardOpen} = useKeyboard();

  const handlePress = useCallback(
    async (url: string) => {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`${t("failedToOpenLink")}: ${url}`);
      }
    },
    [t],
  );

  return keyBoardOpen ? null : (
    <Text
      style={textVariants.body}
      className={
        "text-white-500 flex-row pb-8 justify-center mx-5 text-center"
      }>
      <Trans
        components={{
          Terms: (
            <Pressable
              //TODO: open terms and conditions
              onPress={() => handlePress("https://www.moskalakamil.com/")}
            />
          ),
          Privacy: (
            <Pressable
              //TODO: open privacy policy
              onPress={() => handlePress("https://www.moskalakamil.com/")}
            />
          ),
          Text: (
            <Text
              style={textVariants.body}
              className={"-mb-[8.5px] underline text-secondary-500"}
            />
          ),
        }}>
        {t("auth.terms")}
      </Trans>
    </Text>
  );
};
