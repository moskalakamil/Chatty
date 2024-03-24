import {images} from "@src/assets/images/Images";
import {AppImage} from "@src/features/_common/image/AppImage";
import {cn} from "@src/styles/cn";
import {getTextVariant} from "@src/theme/theme";
import React from "react";
import {Text, View} from "react-native";
import {IMessage} from "react-native-gifted-chat";

export const RenderMessage = (props: {
  prevMessage?: IMessage;
  currentMessage?: IMessage;
  nextMessage?: IMessage;
  myId: string;
}) => {
  const bodyVariant = getTextVariant("body");

  const isMyMessage = props.currentMessage?.user?._id === props.myId;

  const isFirstMessageInSeries =
    props.prevMessage?.user?._id !== props.currentMessage?.user._id;

  const isLastMessageInSeries =
    props.nextMessage?.user?._id !== props.currentMessage?.user?._id;

  return (
    <View
      className={cn(
        "flex-row  w-4/6 my-1.5 rounded-lg items-end",
        isMyMessage && "self-end flex-row-reverse",
        isFirstMessageInSeries && "mt-3",
      )}>
      {isLastMessageInSeries && (
        <AppImage
          className={"w-[24] h-[24] rounded-full"}
          source={images.defaultProfile}
        />
      )}
      <View
        className={cn(
          "rounded-xl p-3 w-full",
          isMyMessage && "bg-primary-300 text-white-500",
          !isMyMessage && "bg-white-500 text-black-500",
          isLastMessageInSeries && isMyMessage && "mr-[6] rounded-br-none",
          isLastMessageInSeries && !isMyMessage && "ml-[6] rounded-bl-none",
          !isLastMessageInSeries && isMyMessage && "mr-[30]",
          !isLastMessageInSeries && !isMyMessage && "ml-[30]",
        )}>
        <Text
          style={bodyVariant}
          className={cn(
            isMyMessage && "text-white-500",
            !isMyMessage && "text-black-500",
          )}>
          {props.currentMessage?.text}
        </Text>
      </View>
    </View>
  );
};
