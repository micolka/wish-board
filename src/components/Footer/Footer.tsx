import React from 'react';
import type { FunctionComponent } from 'react';

import styles from '@/components/Footer/Footer.scss';
import GithubIcon from '@/components/icons/GithubIcon';

const Footer: FunctionComponent = () => (
  <div className={styles.footer}>
    <div className={styles['footer-container']}>
      <div className="footer-text">2021</div>
      <a
        className={styles['link-footer']}
        target="_blank"
        rel="noreferrer"
        href="https://github.com/SashaSadovskaya"
      >
        <GithubIcon className={styles['footer-li-icon']} />
        <span>SashaSadovskaya</span>
      </a>
      <a
        className={styles['link-footer']}
        target="_blank"
        rel="noreferrer"
        href="https://github.com/SkaymanT"
      >
        <GithubIcon className={styles['footer-li-icon']} />
        <span>SkaymanT</span>
      </a>
      <a
        className={styles['link-footer']}
        target="_blank"
        rel="noreferrer"
        href="https://github.com/Vladimir0087"
      >
        <GithubIcon className={styles['footer-li-icon']} />
        <span>Vladimir0087</span>
      </a>
      <a
        className={styles['link-footer']}
        target="_blank"
        rel="noreferrer"
        href="https://github.com/micolka"
      >
        <GithubIcon className={styles['footer-li-icon']} />
        <span>micolka</span>
      </a>

      <a
        className={styles['school-link']}
        target="_blank"
        rel="noreferrer"
        href="https://rs.school/js/"
      >
        <img src="https://rs.school/images/rs_school_js.svg" alt="rs_school" />
      </a>
    </div>
  </div>
);

export default Footer;
