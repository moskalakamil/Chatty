import {useTheme} from "@src/theme/theme";
import React, {ReactNode, useRef, useState} from "react";
import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  Text,
  ViewStyle,
  Pressable,
} from "react-native";
import {FieldError} from "@src/features/common/error/FieldError";
import {cn} from "@src/styles/cn";
import {Icon} from "@src/assets/icons/Icon";

export interface AppInputProps extends TextInputProps {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  error?: string;
  mode?: "password" | "default";
  onRestartText?: () => void;
}

export const AppInput = React.forwardRef<TextInput, AppInputProps>(
  (
    {
      containerStyle,
      label,
      style,
      error,
      onRestartText,
      mode = "default",
      ...rest
    },
    ref,
  ) => {
    const {textVariants} = useTheme();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
      <View className={cn("relative mb-5 w-full")} style={containerStyle}>
        {label && (
          <Text className={"text-white-500"} style={textVariants.lbl}>
            {label}
          </Text>
        )}
        <View className={"justify-center"}>
          <TextInput
            ref={ref}
            editable={rest.editable}
            secureTextEntry={mode === "password" && !isPasswordVisible}
            className={cn(
              !!error && "border-danger-500 border",
              "h-[47px] rounded-[10px] bg-white-500 pl-2 pr-12 focus:border focus:!border-primary-500 ",
              rest.editable === false && "bg-gray-100",
              rest.className,
            )}
            style={style}
            {...rest}
          />
          {mode === "password" && (
            <Pressable
              className={"absolute right-5"}
              onPress={() => setIsPasswordVisible(prev => !prev)}>
              <Icon name={isPasswordVisible ? "vision" : "visionlow"} />
            </Pressable>
          )}
          {mode !== "password" && (rest?.value || "").length > 0 && (
            <Pressable className={"absolute right-5"} onPress={onRestartText}>
              <Icon name={"close"} />
            </Pressable>
          )}
        </View>
        {!!error && <FieldError error={error} />}
      </View>
    );
  },
);
