import twColors from "tailwindcss/colors";
import myColors from "./exportColors";

const extendedColors = myColors;

export const colors = {
  ...Object.keys(twColors).reduce(
    (acc, key) => {
      if (
        key !== "lightBlue" &&
        key !== "blueGray" &&
        key !== "trueGray" &&
        key !== "coolGray" &&
        key !== "warmGray"
      ) {
        //@ts-ignore
        acc[key] = twColors[key];
      }
      return acc;
    },
    {} as typeof twColors,
  ),

  ...extendedColors,
};

type FlatColorKeys<T extends typeof extendedColors> = {
  //@ts-ignore
  [Key in keyof T]: `${Key}${keyof T[Key]}`;
}[keyof T];

function flattenColors<T extends typeof extendedColors>(
  myColors: T,
): Record<FlatColorKeys<T>, string> {
  const flattenedColors = {} as Record<FlatColorKeys<T>, string>;

  Object.entries(myColors).forEach(([key, shades]) => {
    Object.entries(shades).forEach(([shadeKey, value]) => {
      const colorKey = `${key}${shadeKey}`;
      flattenedColors[colorKey as FlatColorKeys<T>] = value;
    });
  });

  return flattenedColors;
}

export const flatColors = flattenColors(extendedColors);
