import twColors from "tailwindcss/colors";

export const extendedColors = {
  primary: {
    "200": "#C692FD",
    "400": "#993AFC",
    "500": "#5603AD",
    "800": "#5603AD ",
    "950": "#390273",
  },
  secondary: {
    "50": "#F0F8FF",
    "300": "#B6DEFD",
    "500": "#259DFA",
  },
  gray: {
    "50": "#D9DAE0",
    "300": "#BFC1CC",
    "500": "#9FA2B2",
  },
  error: {
    "500": "#FF445A",
  },
  active: {
    "500": "#A8FF76",
  },
  black: {
    "500": "#1A1A1A",
  },
  white: {
    "500": "#FFFFFF",
  },
  danger: {
    "50": "#fef3ee",
    "100": "#fee3d6",
    "200": "#fbc4ad",
    "300": "#f89b79",
    "400": "#f46843",
    "500": "#f24d2c",
    "600": "#e22814",
    "700": "#bc1b12",
    "800": "#951717",
    "900": "#781716",
    "950": "#41090b",
  },
  warning: {
    "50": "#fdfbe9",
    "100": "#fcf7c5",
    "200": "#faed8e",
    "300": "#f6db4e",
    "400": "#f2ca2c",
    "500": "#e1af11",
    "600": "#c2870c",
    "700": "#9b610d",
    "800": "#804d13",
    "900": "#6d3f16",
    "950": "#402008",
  },
};

export const colors = {
  // ...(Object.keys(twColors).reduce((acc, key) => {
  //   if (
  //     key !== "lightBlue" &&
  //     key !== "blueGray" &&
  //     key !== "trueGray" &&
  //     key !== "coolGray" &&
  //     key !== "warmGray"
  //   ) {
  //     //@ts-ignore
  //     acc[key] = twColors[key];
  //   }
  //   return acc;
  // }, {}) as typeof twColors),
  ...extendedColors,
};

type FlatColors = typeof colors;

type FlatColorKeys = {
  //@ts-ignore
  [Key in keyof FlatColors]: `${Key}${keyof FlatColors[Key]}`;
}[keyof FlatColors];

function flattenColors(myColors: FlatColors): Record<FlatColorKeys, string> {
  const flattenedColors = {} as Record<FlatColorKeys, string>;
  for (const key in myColors) {
    const shades: any = myColors[key as keyof FlatColors];
    for (const shadeKey in shades) {
      const colorKey = `${key}${shadeKey}`;
      flattenedColors[colorKey as FlatColorKeys] = shades[shadeKey];
    }
  }
  return flattenedColors;
}

export const flatColors = flattenColors(colors);
