import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@shared/model/reduxHooks';
import { selectedTheme } from '@features/ThemeChange/model/themeSlice';
import { setLanguage } from '../model/languageSlice';
import { languages } from '../utils/langObject';
import styles from './LangBtn.module.scss';

export const LangBtn = () => {
  const dispatch = useAppDispatch();
  const { themeLight } = useAppSelector(selectedTheme);
  const { t } = useTranslation();

  const handleSetLanguage = (language: string) => {
    dispatch(setLanguage(language));
  };

  return (
    <li className={styles.spanElement}>
      <a className={`${themeLight ? '' : styles.darkLink}`}>{t('switchlang')}</a>
      <ul>
        {languages.map((language) => (
          <li key={language.code}>
            <a
              className={`${themeLight ? '' : styles.darkLang}`}
              onClick={() => handleSetLanguage(language.code)}
            >
              {language.name}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
};
