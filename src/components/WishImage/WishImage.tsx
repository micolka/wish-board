import * as React from 'react';
import { FunctionComponent, HTMLAttributes } from 'react';

import styles from '@/components/WishImage/WishImage.scss';

interface ImageProps extends HTMLAttributes<HTMLDivElement> {
  imageUrl: string | null;
  name: string;
  color: string;
}

const WishImage: FunctionComponent<ImageProps> = ({ imageUrl, name, color }) => (
  <React.Fragment>
    {imageUrl ? (
      <img src={imageUrl} alt={name} />
    ) : (
      <div className={styles.pseudo_image_container} style={{ backgroundColor: `${color}` }}>
        <span className={styles.image_description}>{name}</span>
      </div>
    )}
  </React.Fragment>
);

export default WishImage;
