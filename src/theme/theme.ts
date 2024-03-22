import {createTheme, useTheme as useShopifyTheme} from "@shopify/restyle";
import {flatColors} from "../styles/colors";

/**
 * Use useTheme hook instead
 */
export const getColors = (colorName: keyof typeof flatColors) => {
  return flatColors[colorName];
};

export const lightTheme = createTheme({
  colors: flatColors,
  borderRadii: {
    small: 12,
    big: 24,
  },
  spacing: {},
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    h1: {
      fontFamily: "Poppins-Bold",
      fontSize: 28,
    },
    h2: {
      fontFamily: "Poppins-Bold",
      fontSize: 22,
    },
    h3: {
      fontFamily: "Poppins-Bold",
      fontSize: 22,
    },
    h4: {
      fontFamily: "Poppins-SemiBold",
      fontSize: 16,
    },
    btn: {
      fontFamily: "Poppins-SemiBold",
      fontSize: 16,
      letterSpacing: 1,
    },
    lbl: {
      fontFamily: "Poppins-Regular",
      fontSize: 15,
    },
    input: {
      fontFamily: "Poppins-Medium",
      fontSize: 15,
      lineHeight: 20,
    },
    caption: {
      fontFamily: "Poppins-Regular",
      fontSize: 11,
      lineHeight: 13,
    },
    body: {
      fontFamily: "Poppins-Regular",
      fontSize: 14,
    },
  },
});

export type ThemeT = typeof lightTheme;

export type ThemeVariantT = "light";

export const useTheme = () => useShopifyTheme<ThemeT>();
