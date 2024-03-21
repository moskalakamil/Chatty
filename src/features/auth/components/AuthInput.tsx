import {useTheme} from "@src/theme/theme";
import React, {useState} from "react";
import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  Text,
  ViewStyle,
  TextStyle,
} from "react-native";
import {FieldError} from "@src/common/error/FieldError.tsx";
import {Icon} from "@src/assets/Icon.tsx";

export interface AuthInputProps extends TextInputProps {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  error?: string;
  icon?: JSX.Element;
  passwordMode?: boolean;
  borderCustomColor?: string;
  labelStyle?: TextStyle;
}

export const AuthInput = React.forwardRef<TextInput, AuthInputProps>(
  (
    {
      containerStyle,
      label,
      style,
      error,
      borderCustomColor,
      icon,
      labelStyle,
      passwordMode,
      ...rest
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const {colors} = useTheme();

    const isError = Boolean(error);

    const borderColor = isError
      ? colors.danger500o5
      : borderCustomColor || colors.neutral600;

    return (
      <View
        style={[
          {
            position: "relative",
            marginVertical: 2,
            width: "100%",
          },
          containerStyle,
        ]}>
        {label && <Text style={[{marginBottom: 4}, labelStyle]}>{label}</Text>}
        <View className={"flex items-center flex-row"}>
          {icon && (
            <View className={"absolute pointer-events-none left-[5px]"}>
              {icon}
            </View>
          )}
          <TextInput
            ref={ref}
            placeholderTextColor={colors.neutral800}
            style={[
              {
                paddingLeft: icon ? 40 : 10,
                paddingRight: passwordMode ? 40 : 10,
                width: "100%",
                borderBottomWidth: 1,
                borderBottomColor: borderColor,
                height: 37,
              },
              style,
            ]}
            secureTextEntry={passwordMode && !showPassword}
            {...rest}
          />
          {passwordMode && (
            <Icon
              name={showPassword ? "hidePassword" : "showPassword"}
              width={18}
              height={18}
              className={"absolute right-2"}
              onPress={() => setShowPassword(prev => !prev)}
            />
          )}
        </View>
        {isError && <FieldError error={error!} />}
      </View>
    );
  },
);
