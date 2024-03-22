import {Pressable, Text, View} from "react-native";
import {useTheme} from "@src/theme/theme";
import {useAuthNavigation} from "@src/features/auth/navigation/useAuthNavigation";
import useKeyboard from "@src/utils/hooks/useKeyboard";

interface AuthModeToggleProps {
  text: [string, string];
  mode: "login" | "signup";
}

const AuthModeToggle = ({text: [part1, part2], mode}: AuthModeToggleProps) => {
  const {textVariants} = useTheme();
  const nav = useAuthNavigation();
  const {keyBoardOpen} = useKeyboard();

  return keyBoardOpen ? null : (
    <View className={"flex-row items-center gap-3 justify-center"}>
      <Text style={textVariants.body} className={"text-white-500"}>
        {part1}
      </Text>
      <Pressable
        onPress={() => {
          if (mode === "login") {
            return nav.navigate("Register");
          }
          return nav.navigate("Login");
        }}>
        <Text style={textVariants.btn} className={"text-primary-500"}>
          {part2}
        </Text>
      </Pressable>
    </View>
  );
};

export default AuthModeToggle;
