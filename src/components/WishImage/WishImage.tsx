import React, { Fragment } from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';

import styles from '@/components/WishImage/WishImage.scss';

interface ImageProps extends HTMLAttributes<HTMLDivElement> {
  imageUrl: string | null;
  name: string;
  color: string;
}

const WishImage: FunctionComponent<ImageProps> = ({ imageUrl, name, color }) => (
  <Fragment>
    {imageUrl ? (
      <img src={imageUrl} alt={name} />
    ) : (
      <div className={styles.pseudo_image_container} style={{ background: `${color}` }}>
        <span className={styles.image_description}>{name}</span>
      </div>
    )}
  </Fragment>
);

export default WishImage;
