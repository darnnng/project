import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import { Languages } from '@shared/constants/languages';

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    lng: Languages.EN,
    fallbackLng: Languages.EN,
    backend: {
      backendOptions: [
        {
          loadPath: '**/locales/{{lng}}/{{ns}}.json',
        },
      ],
    },
  });

export default i18n;
