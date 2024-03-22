import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {AuthStackNavParamList} from "@src/features/auth/navigation/AuthStack";

export function useAuthNavigation() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackNavParamList>>();
  return navigation;
}
