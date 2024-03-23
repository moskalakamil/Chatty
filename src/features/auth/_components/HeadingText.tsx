import {useTheme} from "@src/theme/theme";
import {Text} from "react-native";

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
