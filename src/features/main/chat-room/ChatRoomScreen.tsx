import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {Spinner} from "@src/features/_common/ui/Spinner";
import {MainStackNavParamList} from "@src/features/main/_navigation/MainStack";
import {Messages} from "@src/features/main/chat-room/_components/Messages";
import {
  useGetRoom,
  useGetTypingUser,
  useSetTypingUser,
} from "@src/queries/chat.queries";
import {parseError} from "@src/utils/error/parseError";
import {Text, View} from "react-native";

export const ChatRoomScreen = ({
  route,
}: NativeStackScreenProps<MainStackNavParamList, "ChatRoom">) => {
  const {roomId} = route.params;

  const {data, error, loading} = useGetRoom(roomId);

  const [setTypingUser] = useSetTypingUser();
  const {data: typingUser} = useGetTypingUser(roomId);

  if (error)
    return (
      <View className={"flex-1 items-center mt-14"}>
        <Text className={"text-xl"}>{parseError(error).message}</Text>
      </View>
    );

  if (loading) return <Spinner />;

  return (
    <View className={"mt-10 flex-1"}>
      {data?.room?.messages && (
        <Messages
          roomData={data?.room}
          onTyping={() => {
            setTypingUser({
              variables: {
                roomId,
              },
            });
          }}
          typingUser={typingUser?.typingUser}
        />
      )}
    </View>
  );
};
