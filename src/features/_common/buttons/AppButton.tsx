import {useTheme} from "@src/theme/theme";
import {
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
  Text,
  Pressable,
  PressableProps,
} from "react-native";
import {Spinner} from "@src/features/_common/ui/Spinner";
import {cn} from "@src/styles/cn";

interface AppButtonProps extends PressableProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  textStyle?: TextStyle;
  mode?: "default" | "password";
}

export const AppButton = ({
  title,
  style,
  onPress,
  loading = false,
  disabled = false,
  className,
  ...props
}: AppButtonProps) => {
  const {borderRadii, textVariants} = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={loading || disabled}
      className={cn(
        "h-[48px] bg-primary-500 w-full active:bg-primary-700",
        disabled && !loading && "disabled:bg-gray-300",
        className,
      )}
      style={[
        {
          borderRadius: borderRadii.small,
        },
        style,
      ]}
      {...props}>
      <View className={"relative w-full h-full items-center justify-center"}>
        <Text className={"text-white-500"} style={textVariants.btn}>
          {title}
        </Text>
        {loading && <Spinner color={"white"} className={"absolute right-5"} />}
      </View>
    </Pressable>
  );
};
