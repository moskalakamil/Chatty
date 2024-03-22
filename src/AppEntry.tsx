import React from "react";
import {Platform, KeyboardAvoidingView} from "react-native";
import "@src/i18n/i18n";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {AppNavigator} from "./navigation/AppNavigator";
import {ThemeProvider} from "./theme/ThemeProvider";
import Toast from "react-native-toast-message";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {useConnectionAlert} from "@src/utils/hooks/useConnectionAlert";
import {toastConfig} from "@src/utils/toast";
import {ApolloProvider} from "@apollo/client";
import {client} from "@src/api/client";

const AppEntry = () => {
  useConnectionAlert();
  return (
    <ApolloProvider client={client}>
      <GestureHandlerRootView style={{flex: 1, width: "100%"}}>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === "ios" ? "padding" : undefined}>
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