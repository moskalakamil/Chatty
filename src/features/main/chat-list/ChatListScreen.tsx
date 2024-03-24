import {AppButton} from "@src/features/_common/buttons/AppButton";
import {Spinner} from "@src/features/_common/ui/Spinner";
import {ChatItem} from "@src/features/main/chat-list/_components/ChatItem";
import {logoutUser} from "@src/navigation/getAppState";
import {useGetRooms} from "@src/queries/chat.queries";
import {parseError} from "@src/utils/error/parseError";
import {useMemo} from "react";
import {FlatList, RefreshControl, Text, View} from "react-native";

export const ChatListScreen = () => {
  const {data, loading, error, refetch} = useGetRooms();

  const filledData = useMemo(
    () =>
      data?.usersRooms?.rooms?.map(item => ({
        ...item,
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
          className={"mt-10 w-[80%] !bg-danger-500"}
          onPress={logoutUser}
        />
      </View>
    );

  if (loading)
    return (
      <View className={"flex-1 pt-14"}>
        <Spinner size={40} />
      </View>
    );

  return (
    <View className={"mt-10 flex-1"}>
      <FlatList
        data={filledData}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
        keyExtractor={(item, index) => item?.id || index.toString()}
        renderItem={({item}) => <ChatItem room={item} />}
      />
      {/*<AppButton*/}
      {/*  title={"logout"}*/}
      {/*  className={"!bg-danger-500 absolute bottom-10"}*/}
      {/*  onPress={logoutUser}*/}
      {/*/>*/}
    </View>
  );
};
