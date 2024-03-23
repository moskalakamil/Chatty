import {View, Text} from "react-native";
import {useTheme} from "@src/theme/theme";

interface FieldErrorProps {
  error: string;
}

export const FieldError = ({error}: FieldErrorProps) => {
  const {textVariants} = useTheme();

  return (
    <View className={"absolute w-full -bottom-5"}>
      <Text
        className={"text-danger-500 text-right pr-1"}
        style={textVariants.caption}>
        {error}
      </Text>
    </View>
  );
};
