import {createTheme, useTheme as useShopifyTheme} from "@shopify/restyle";
import {colors as themeColors, flatColors} from "../styles/colors";

export const colors = themeColors;

/**
 * Use useTheme hook instead
 */
export const getColors = (colorName: keyof typeof colors) => {
  return colors[colorName];
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
      fontSize: 36,
    },
    h2: {
      fontFamily: "Poppins-Bold",
      fontSize: 28,
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
      spacing: "1%",
    },
    lbl: {
      fontFamily: "Poppins-Medium",
      fontSize: 16,
    },
    input: {
      fontFamily: "Poppins-Medium",
      fontSize: 15,
      lineHeight: 20,
    },
    caption: {
      fontFamily: "Poppins-Regular",
      fontSize: 10,
      lineHeight: 10,
    },
  },
});

export type ThemeT = typeof lightTheme;

export type ThemeVariantT = "light";

export const useTheme = () => useShopifyTheme<ThemeT>();
