import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import {ChatListScreen} from "@src/features/main/chat-list/ChatListScreen";
import {ChatListHeader} from "@src/features/main/chat-list/_components/ChatListHeader";
import {ChatRoomScreen} from "@src/features/main/chat-room/ChatRoomScreen";
import {ChatRoomHeader} from "@src/features/main/chat-room/_components/ChatRoomHeader";
import {useAuthStore} from "@src/stores/auth.store";
import {getColors} from "@src/theme/theme";

export type MainStackNavParamList = {
  ChatList: undefined;
  ChatRoom: {roomId: string};
};

const screenOptions: NativeStackNavigationOptions = {
  // headerShown: false,
  contentStyle: {
    backgroundColor: getColors("secondary100"),
  },
};

const Stack = createNativeStackNavigator<MainStackNavParamList>();
export const MainStack = () => {
  const {token} = useAuthStore();

  return (
    <Stack.Navigator screenOptions={screenOptions} key={token}>
      <Stack.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{
          header: ChatListHeader,
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={props => ({
          header: () => <ChatRoomHeader roomId={props.route.params.roomId} />,
          headerShown: true,
        })}
      />
    </Stack.Navigator>
  );
};
