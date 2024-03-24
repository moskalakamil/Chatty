import {getBorderRadius, getColors} from "@src/theme/theme";
import React from "react";
import {StyleSheet} from "react-native";
import {
  IMessage,
  InputToolbar,
  InputToolbarProps,
} from "react-native-gifted-chat";

const RenderInputToolbar = ({...props}: InputToolbarProps<IMessage>) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={styles.container}
      primaryStyle={styles.input}
      //@ts-ignore
      placeholder=""
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    borderTopWidth: 0,
    backgroundColor: getColors("secondary300"),
    borderTopLeftRadius: getBorderRadius("small"),
    borderTopRightRadius: getBorderRadius("small"),
  },
  input: {
    borderBottomRightRadius: 0,
    marginRight: 50,
    backgroundColor: getColors("white500"),
    borderRadius: getBorderRadius("small"),
  },
});

export default RenderInputToolbar;
