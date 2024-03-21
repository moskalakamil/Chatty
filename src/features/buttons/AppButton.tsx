import {useTheme} from "@src/theme/theme";
import React from "react";
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
} from "react-native";
import {Icon} from "@src/assets/icons/Icon";
import {Spinner} from "@src/features/ui/Spinner";

interface AppButtonProps {
  type?: "default" | "text" | "secondary";
  title: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: {
    name: React.ComponentProps<typeof Icon>["name"];
    fill?: string;
  };
  textStyle?: TextStyle;
}

export const AppButton = ({
  type = "default",
  title,
  style,
  onPress,
  loading,
  disabled = false,
  icon,
  textStyle,
}: AppButtonProps) => {
  const {colors} = useTheme();

  const backgroundColor =
    type === "default"
      ? colors.primary500
      : type === "secondary"
        ? colors.neutral300
        : undefined;
  const textColor =
    type === "default"
      ? colors.neutral100
      : type === "secondary"
        ? colors.neutral800
        : colors.primary500;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={loading || disabled}
      style={[
        {
          width: "100%",
          borderRadius: 20,
          backgroundColor: backgroundColor,
          height: 44,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: type === "secondary" ? 1 : undefined,
          borderColor: type === "secondary" ? colors.neutral500 : undefined,
        },
        style,
      ]}>
      <View
        style={{
          flexDirection: "row",
          gap: 8,
          justifyContent: "center",
          alignItems: "center",
        }}>
        {icon && (
          <Icon name={icon.name} color={icon.fill} width={20} height={20} />
        )}
        <Text
          style={[
            {color: textColor, fontWeight: "500", fontSize: 16},
            textStyle,
          ]}>
          {title}
        </Text>
        {loading && (
          <Spinner color={"white"} style={{position: "absolute", right: -25}} />
        )}
      </View>
    </TouchableOpacity>
  );
};
