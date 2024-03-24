import "@src/i18n/i18n";
import {ApolloProvider} from "@apollo/client";
import {client} from "@src/gql/client";
import {useConnectionAlert} from "@src/utils/hooks/useConnectionAlert";
import {toastConfig} from "@src/utils/toast";
import {KeyboardAvoidingView} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {SafeAreaProvider} from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import {AppNavigator} from "./navigation/AppNavigator";
import {ThemeProvider} from "./theme/ThemeProvider";

const AppEntry = () => {
  useConnectionAlert();
  return (
    <ApolloProvider client={client}>
      <GestureHandlerRootView style={{flex: 1, width: "100%"}}>
        <SafeAreaProvider>
          <KeyboardAvoidingView style={{flex: 1}}>
            <ThemeProvider>
              <AppNavigator />
              <Toast config={toastConfig} />
            </ThemeProvider>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ApolloProvider>
  );
};

export default AppEntry;
