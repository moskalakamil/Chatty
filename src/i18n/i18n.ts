// src/localization/i18n.ts
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import commonEn from '@src/locales/en/common.json';
export const resources = {
  en: {
    common: commonEn,
  },
};

export const defaultNS = 'common';

export const ns = ['common'] as const;

i18n.use(initReactI18next).init({
  // https://www.i18next.com/misc/migration-guide#v20.x.x-to-v21.0.0
  compatibilityJSON: 'v3',
  ns,
  defaultNS,
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});
