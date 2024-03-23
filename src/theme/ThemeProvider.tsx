import {ThemeProvider as ShopifyThemeProvider} from "@shopify/restyle";
import React from "react";

import {lightTheme} from "./theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({children}: ThemeProviderProps) => {
  return (
    <ShopifyThemeProvider theme={lightTheme}>{children}</ShopifyThemeProvider>
  );
};
