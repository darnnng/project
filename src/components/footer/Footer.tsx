import React from 'react';
import { Link } from 'react-router-dom';
import { RoutePath } from '@constants/routes';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerUp}>
        <div>
          <p className={styles.footerBigTitle}>ABOUT US</p>
          <div className={styles.footerLinks}>
            <p>
              <Link className={styles.footerLinkText} to={`/${RoutePath.CATALOG}`}>
                Our stores
              </Link>
            </p>
            <p>
              <Link className={styles.footerLinkText} to={`/${RoutePath.CATALOG}`}>
                Catalog
              </Link>
            </p>
          </div>
        </div>
        <div className={styles.socialMedia}>
          <p className={styles.footerBigTitle}>CONTACTS</p>
          <div className={styles.footerLinksSocial}>
            <Link to={`https://www.facebook.com/`}>
              <span className={styles.materialSymbolsOutlined}>groups</span>
            </Link>
            <Link to={`https://www.google.com/gmail/about/`}>
              <span className={styles.materialSymbolsOutlined}>mail</span>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.footerDown}>
        <span>Threads & Co., Inc. All rights reserved</span>
      </div>
    </footer>
  );
};
