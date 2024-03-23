import {Text} from "react-native";
import {useTheme} from "@src/theme/theme";

interface HeadingTextProps {
  text: string;
}

const HeadingText = ({text}: HeadingTextProps) => {
  const {textVariants} = useTheme();

  return (
    <Text className={"text-primary-500"} style={textVariants.h1}>
      {text}
    </Text>
  );
};

export default HeadingText;
