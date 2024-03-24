import {Icon} from "@src/assets/icons/Icon";
import {images} from "@src/assets/images/Images";
import {AppImage} from "@src/features/_common/image/AppImage";
import {Spinner} from "@src/features/_common/ui/Spinner";
import {MainHeaderContainer} from "@src/features/main/_components/MainHeaderContainer";
import {useMainNavigation} from "@src/features/main/_navigation/useMainNavigation";
import {useGetHeaderRoom} from "@src/queries/chat.queries";
import {useUserStore} from "@src/stores/user.store";
import {useTheme} from "@src/theme/theme";
import {parseError} from "@src/utils/error/parseError";
import {Pressable, Text, View} from "react-native";

interface ChatRoomHeaderProps {
  roomId: string;
}

export const ChatRoomHeader = (props: ChatRoomHeaderProps) => {
  const nav = useMainNavigation();

  const {textVariants} = useTheme();

  const {data, loading, error} = useGetHeaderRoom(props.roomId);

  const {user} = useUserStore();

  const extractedUser = data?.room?.messages?.filter(
    m => m?.user?.id !== user?.id,
  )?.[0]?.user;

  if (error)
    return (
      <View className={"flex-1 items-center mt-14"}>
        <Text className={"text-xl"}>{parseError(error).message}</Text>
      </View>
    );

  if (loading) return <Spinner />;

  return (
    <MainHeaderContainer>
      <View className={"flex-row items-center"}>
        <Pressable onPress={() => nav.goBack()}>
          <Icon name={"goback"} />
        </Pressable>
        <View className={"flex-row gap-3"}>
          <AppImage
            source={images.defaultProfile}
            className={"w-[44] h-[44]"}
          />
          <View>
            <Text style={textVariants.h4} className={"text-primary-500"}>
              {extractedUser?.firstName} {extractedUser?.lastName}
            </Text>
            <Text style={textVariants.body} className={"text-white-500"}>
              Active now
            </Text>
          </View>
        </View>
      </View>
      <View className={"flex-row gap-4"}>
        <Pressable>
          <Icon name={"phone"} />
        </Pressable>
        <Pressable>
          <Icon name={"videocall"} />
        </Pressable>
      </View>
    </MainHeaderContainer>
  );
};
