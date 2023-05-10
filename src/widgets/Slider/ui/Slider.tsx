import React from 'react';
import Slider from 'react-slick';
import { SliderItem } from '@src/entities/sliderItem';
import { settings } from '../lib/settings';
import { sliderData } from '../model/sliderData';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const ItemSlider = () => {
  return (
    <div>
      <Slider {...settings}>
        {sliderData.map((slide, index) => {
          return (
            <div key={index}>
              <SliderItem imgSrc={slide.img} />
              {/* <img src={slide.img} alt={`slide${index}`} /> */}
            </div>
          );
        })}
      </Slider>
    </div>
  );
};
