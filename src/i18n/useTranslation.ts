import {useTranslation as useI18Translation} from "react-i18next";
import {ns} from "./i18n";

/** Typing for using namespaces in translations */

export const useT = useI18Translation<typeof ns>;
