import {Icon} from "@src/assets/icons/Icon";
import React from "react";
import {IMessage, Send, SendProps} from "react-native-gifted-chat";

export const RenderSend = (props: SendProps<IMessage>) => {
  return (
    <Send
      {...props}
      alwaysShowSend
      containerStyle={{position: "absolute", right: -55}}>
      <Icon name={"send"} />
    </Send>
  );
};
