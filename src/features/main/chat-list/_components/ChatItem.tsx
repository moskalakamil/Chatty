import {images} from "@src/assets/images/Images";
import {AppImage} from "@src/features/_common/image/AppImage";
import {useMainNavigation} from "@src/features/main/_navigation/useMainNavigation";
import {SingleRoomType} from "@src/gql/__generated__/graphql";
import {useT} from "@src/i18n/useTranslation";
import {useMessageAdded} from "@src/queries/chat.queries";
import {useUserStore} from "@src/stores/user.store";
import {cn} from "@src/styles/cn";
import {useTheme} from "@src/theme/theme";
import {toast} from "@src/utils/toast";
import {Pressable, Text, useWindowDimensions, View} from "react-native";

interface RoomType extends SingleRoomType {
  lastMessage: string;
  lastActivity: string;
  imageUri: string | null;
}

interface ChatItemProps {
  room: RoomType | null;
}

export const ChatItem = ({room}: ChatItemProps) => {
  const {t} = useT();

  const {data} = useMessageAdded(room?.id!);

  const {user} = useUserStore();

  const isNewMessages =
    data?.messageAdded && data.messageAdded.user?.id !== user?.id;

  // // for testing - new message is shown even if it's our message
  // const isNewMessages = !!data?.messageAdded;

  const {borderRadii, textVariants} = useTheme();

  const dim = useWindowDimensions();

  const nav = useMainNavigation();

  return (
    <Pressable
      onPress={() => {
        if (!room?.id) return toast.error(t("chat.roomNotFound"));

        nav.navigate("ChatRoom", {roomId: room?.id});
      }}
      className={cn(
        "w-full relative bg-white-500 flex-row px-4 py-3 my-2",
        isNewMessages && "bg-primary-500",
      )}
      style={{borderRadius: borderRadii.small}}>
      <AppImage
        source={room?.imageUri ? {uri: room.imageUri} : images.defaultProfile}
        className={"w-[70px] h-[70px] rounded-full"}
      />
      <View className={"pl-4 justify-center"}>
        <Text
          numberOfLines={1}
          style={[textVariants.h3, {width: dim.width - 130}]}
          className={cn(isNewMessages && "text-white-500")}>
          {room?.name}
        </Text>
        <Text
          style={textVariants.body}
          className={cn("-mb-2 mt-1", isNewMessages && "text-white-500")}>
          {data?.messageAdded?.body || room?.lastMessage}
        </Text>
      </View>
      <View className={"absolute top-3 right-3"}>
        {!isNewMessages && (
          <Text style={textVariants.caption} className={"text-gray-500"}>
            {room?.lastActivity}
          </Text>
        )}
        {isNewMessages && (
          <View className={cn("w-4 h-4 rounded-full bg-active-500")} />
        )}
      </View>
    </Pressable>
  );
};
