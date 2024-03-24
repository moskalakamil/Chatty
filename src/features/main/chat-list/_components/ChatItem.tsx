import {images} from "@src/assets/images/Images";
import {AppImage} from "@src/features/_common/image/AppImage";
import {useMainNavigation} from "@src/features/main/_navigation/useMainNavigation";
import {SingleRoomType} from "@src/gql/__generated__/graphql";
import {useT} from "@src/i18n/useTranslation";
import {cn} from "@src/styles/cn";
import {useTheme} from "@src/theme/theme";
import {toast} from "@src/utils/toast";
import {Pressable, Text, useWindowDimensions, View} from "react-native";

interface RoomType extends SingleRoomType {
  isActive: boolean;
  lastMessage: string;
  lastActivity: string;
  imageUri: string | null;
}

interface ChatItemProps {
  room: RoomType | null;
}

export const ChatItem = ({room}: ChatItemProps) => {
  const {t} = useT();

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
        room?.isActive && "bg-primary-500",
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
          className={cn(room?.isActive && "text-white-500")}>
          {room?.name}
        </Text>
        <Text
          style={textVariants.body}
          className={cn("-mb-2 mt-1", room?.isActive && "text-white-500")}>
          {room?.lastMessage}
        </Text>
      </View>
      <View className={"absolute top-3 right-3"}>
        {!room?.isActive && (
          <Text style={textVariants.caption} className={"text-gray-500"}>
            {room?.lastActivity}
          </Text>
        )}
        {room?.isActive && (
          <View className={cn("w-4 h-4 rounded-full bg-active-500")} />
        )}
      </View>
    </Pressable>
  );
};
