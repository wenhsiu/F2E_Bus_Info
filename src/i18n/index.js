import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
// import strings_en from './locales/en.json';
import strings_zhTW from './locales/zh_TW.json';

const resources = {
  // en: {
  //   busInfo: strings_en,
  // },
  zh_TW: {
    busInfo: strings_zhTW,
  },
};
const detection = {
  order: ['querystring', 'htmlTag'],
  lookupQuerystring: 'locale',
};

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection,

    resources,

    fallbackLng: 'zh_TW',

    ns: ['busInfo'],
    defaultNS: 'busInfo',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18next;
