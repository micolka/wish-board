import React from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';

import Footer from '@/components/Footer';
import styles from '@/pages/Main/Main.scss';

interface PropsMain extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const Main: FunctionComponent<PropsMain> = ({ children }) => (
  <div className={styles['main']}>
    <div>Main</div>
    {children}
    <Footer />
  </div>
);

export default Main;
