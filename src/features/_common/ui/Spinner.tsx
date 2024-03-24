import {getColors} from "@src/theme/theme";
import React from "react";
import {ActivityIndicator, ActivityIndicatorProps} from "react-native";

interface SpinnerProps extends ActivityIndicatorProps {}

export const Spinner = (props: SpinnerProps) => {
  return <ActivityIndicator {...props} color={getColors("secondary500")} />;
};
