import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { Languages } from '@src/shared/constants/languages';

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: Languages.EN,
    fallbackLng: Languages.EN,
    backend: {
      backendOptions: [
        {
          loadPath: '/public/locales/{{lng}}/{{ns}}.json',
        },
      ],
    },
  });

export default i18next;
