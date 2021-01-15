import * as React from 'react';

import styles from '@/components/Footer/Footer.scss';
import GithubIcon from '@/components/icons/GithubIcon';

const Footer: React.FC = () => (
  <div className={styles.footer}>
    <div className="footer-text">2020</div>
    <a className={styles['link-footer']} href="https://github.com/SashaSadovskaya">
      <GithubIcon className={styles['footer-li-icon']} />
      <span>SashaSadovskaya</span>
    </a>
    <a className={styles['link-footer']} href="https://github.com/SkaymanT">
      <GithubIcon className={styles['footer-li-icon']} />
      <span>SkaymanT</span>
    </a>
    <a className={styles['link-footer']} href="https://github.com/Vladimir0087">
      <GithubIcon className={styles['footer-li-icon']} />
      <span>Vladimir0087</span>
    </a>    
    <a className={styles['link-footer']} href="https://github.com/micolka">
      <GithubIcon className={styles['footer-li-icon']} />
      <span>micolka</span>
    </a>

    <a className={styles['school-link']} href="https://rs.school/js/">
      <img src="https://rs.school/images/rs_school_js.svg" alt="rs_school" />
    </a>
  </div>
);

export default Footer;
