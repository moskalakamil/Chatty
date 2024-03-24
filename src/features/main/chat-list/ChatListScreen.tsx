import {AppButton} from "@src/features/_common/buttons/AppButton";
import {Spinner} from "@src/features/_common/ui/Spinner";
import {ChatItem} from "@src/features/main/chat-list/_components/ChatItem";
import {logoutUser} from "@src/navigation/getAppState";
import {useGetRooms} from "@src/queries/chat.queries";
import {parseError} from "@src/utils/error/parseError";
import {useMemo} from "react";
import {FlatList, Text, View} from "react-native";

export const ChatListScreen = () => {
  const {data, loading, error} = useGetRooms();

  const filledData = useMemo(
    () =>
      data?.usersRooms?.rooms?.map((item, index) => ({
        ...item,
        isActive: index === 0,
        lastMessage: "last message",
        lastActivity: "5 m ago",
        imageUri: null,
      })),
    [data?.usersRooms?.rooms],
  );

  if (error)
    return (
      <View className={"flex-1 items-center mt-14"}>
        <Text className={"text-xl"}>{parseError(error).message}</Text>
        <AppButton
          title={"logout"}
          className={"mt-10 w-[80%]"}
          onPress={logoutUser}
        />
      </View>
    );

  if (loading) return <Spinner />;

  return (
    <View className={"mt-10"}>
      <FlatList
        data={filledData}
        keyExtractor={(item, index) => item?.id || index.toString()}
        renderItem={({item}) => <ChatItem room={item} />}
      />
      <AppButton title={"logout"} className={"mt-10"} onPress={logoutUser} />
    </View>
  );
};
