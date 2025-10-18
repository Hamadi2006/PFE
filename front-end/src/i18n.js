import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import ar from './locales/ar/translation.json';
import fr from './locales/fr/translation.json';
i18n
  .use(initReactI18next)
  .init({
    resources: {
      FR: { translation: fr },
      EN: { translation: en },
      AR: { translation: ar },
    },
    lng: 'FR', 
    fallbackLng: 'EN',
    interpolation: { escapeValue: false }
  });

export default i18n;
