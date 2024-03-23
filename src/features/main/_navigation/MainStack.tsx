import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import {getColors} from "@src/theme/theme";
import {ChatList} from "@src/features/main/chatList/ChatList";

export type MainStackNavParamList = {
  ChatList: undefined;
};

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  contentStyle: {
    backgroundColor: getColors("secondary100"),
  },
};

const Stack = createNativeStackNavigator<MainStackNavParamList>();
export const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="ChatList" component={ChatList} />
    </Stack.Navigator>
  );
};
