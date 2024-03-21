import React from "react";
import {View, Text} from "react-native";
import {useTheme} from "@src/theme/theme";

interface FieldErrorProps {
  error: string;
}

export const FieldError = ({error}: FieldErrorProps) => {
  const theme = useTheme();
  return (
    <>
      <View
        style={{
          position: "absolute",
          right: 8,
          bottom: 48,
          maxWidth: 220,
        }}>
        <View
          style={{
            backgroundColor: theme.colors.danger300,
            borderRadius: 15,
            padding: 8,
            borderColor: "transparent",
          }}>
          <Text>{error}</Text>
        </View>
      </View>
    </>
  );
};

// const Triangle = () => {
//   return (
//     <View
//       style={[
//         styles.triangle,
//         {
//           borderBottomColor: theme.colors.danger500o5,
//           borderColor: 'transparent',
//           transform: [{rotate: '180deg'}, {translateX: -20}, {translateY: 1}],
//         },
//       ]}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   triangle: {
//     width: 0,
//     height: 0,
//     backgroundColor: 'transparent',
//     borderStyle: 'solid',
//     borderLeftWidth: 15,
//     borderRightWidth: 15,
//     borderBottomWidth: 22,
//     borderLeftColor: 'transparent',
//     borderRightColor: 'transparent',
//     borderBottomColor: 'red',
//   },
// });
