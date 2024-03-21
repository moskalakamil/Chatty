import {useTheme} from "@src/theme/theme";
import React, {ReactNode} from "react";
import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  Text,
  ViewStyle,
} from "react-native";
import {FieldError} from "@src/features/error/FieldError";

export interface AppInputProps extends TextInputProps {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  error?: string;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
}

export const AppInput = React.forwardRef<TextInput, AppInputProps>(
  (
    {containerStyle, label, style, error, rightIcon, leftIcon, ...rest},
    ref,
  ) => {
    const {colors} = useTheme();

    const isError = Boolean(error);

    const borderColor = isError ? colors.danger500o5 : colors.neutral300;

    return (
      <View
        style={[
          {
            position: "relative",
            marginTop: 16,
            width: "100%",
          },
          containerStyle,
        ]}>
        {label && <Text style={{marginBottom: 4}}>{label}</Text>}
        <View className={"relative justify-center"}>
          <TextInput
            ref={ref}
            style={[
              {
                borderRadius: 20,
                borderWidth: 1,
                borderColor: borderColor,
                height: 44,
                paddingHorizontal: 10,
                paddingRight: !!rightIcon ? 35 : undefined,
                paddingLeft: !!leftIcon ? 35 : undefined,
              },
              style,
            ]}
            {...rest}
          />
          {leftIcon && (
            <View className={"absolute pointer-events-none left-3"}>
              {leftIcon}
            </View>
          )}
          {rightIcon && (
            <View className={"absolute pointer-events-none right-3"}>
              {rightIcon}
            </View>
          )}
        </View>
        {isError && <FieldError error={error!} />}
      </View>
    );
  },
);
