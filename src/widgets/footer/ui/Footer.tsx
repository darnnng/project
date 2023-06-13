import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { linkData, linkDataSocial } from '../model/links';
import styles from './Footer.module.scss';

export const Footer = () => {
  const { t } = useTranslation('translation');
  return (
    <footer className={styles.footer}>
      <div className={styles.footerUp}>
        <div className={styles.aboutSection}>
          <p className={styles.footerBigTitle}>
            <Trans>{t('about')}</Trans>
          </p>
          <div className={styles.footerLinks}>
            {linkData.map((link, index) => (
              <p key={index}>
                <Link className={styles.footerLinkText} to={`/${link.path}`}>
                  {t(link.text)}
                </Link>
              </p>
            ))}
          </div>
        </div>
        <div className={styles.socialMedia}>
          <p className={styles.footerBigTitle}>{t('contacts')}</p>
          <div className={styles.footerLinksSocial}>
            {linkDataSocial.map((link, index) => (
              <Link key={index} to={link.url}>
                <span className={styles.materialSymbolsOutlined}>{link.text}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.footerDown}>
        <span>Threads & Co., Inc. All rights reserved</span>
      </div>
    </footer>
  );
};
