import React from "react";
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfig,
} from "react-native-toast-message";

export const toast = {
  success: (message: string) => {
    Toast.show({
      type: "success",
      text1: message,
    });
  },
  error: (message: string) => {
    Toast.show({
      type: "error",
      text1: message,
    });
  },
  info: (message: string) => {
    Toast.show({
      type: "info",
      text1: message,
    });
  },
};
export const toastConfig: ToastConfig = {
  success: props => (
    <BaseToast
      {...props}
      text1NumberOfLines={2}
      // style={{borderLeftColor: colors.primary500}}
    />
  ),

  error: props => (
    <ErrorToast
      {...props}
      text1NumberOfLines={2}
      // style={{borderLeftColor: colors.danger500}}
    />
  ),
};
