import React from 'react';
import styles from './SliderItem.module.scss';

export interface ISliderItemProps {
  imgSrc: string;
}

export const SliderItem = ({ imgSrc }: ISliderItemProps) => {
  return (
    <>
      <div style={{ width: 'inherit' }}>
        <img className={styles.image} src={imgSrc} />
        <div className={styles.itemBody}>
          <p className={styles.cardTitle}>Card Title</p>
          <div className="product-actions">
            <button>Buy Now</button>
            <button>Add to cart</button>
          </div>
        </div>
      </div>
    </>
  );
};
