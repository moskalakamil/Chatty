import {TFunction} from "@src/i18n/TFunction";

type AvailableLanguages = {
  label: string;
  value: "EN";
}[];

export const availableLanguages = (t: TFunction): AvailableLanguages => [
  {label: t("english"), value: "EN"},
];
