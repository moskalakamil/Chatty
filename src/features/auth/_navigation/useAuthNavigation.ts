import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {AuthStackNavParamList} from "@src/features/auth/_navigation/AuthStack";

export const useAuthNavigation = useNavigation<
  NativeStackNavigationProp<AuthStackNavParamList>
>;
