import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en';
import fr from './locales/fr';
import es from './locales/es';
import de from './locales/de';

i18n
  .use(initReactI18next) // bind react-i18next to the i18n package.
  .init({
    resources: {
      en: {
        translation: en,
      },
      fr: {
        translation: fr,
      },
      es: {
        translation: es,
      },
      de: {
        translation: de,
      },
      // other languages...
    },
    lng: 'en', // default language
    fallbackLng: 'en', // use English if detected language is not available.
    interpolation: {
      escapeValue: false, // react is already safe from xss attacks
    },
  });

export default i18n;
