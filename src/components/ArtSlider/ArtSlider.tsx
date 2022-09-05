import React, { Children, useState } from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ArtSliderButton } from './ArtSliderButton';

import './styles.scss';

export const ArtSlider = ({ children, itemsToShow = 3 }: any) => {
  const [swiper, setSwiper] = useState<any>(null);

  return (
    <div className="art-slider">
      <Swiper
        modules={[Navigation]}
        slidesPerView={itemsToShow}
        spaceBetween={30}
        className="art-slider__swipe"
        loop={true}
        navigation={{
          nextEl: '.art-slider__btn--forward',
          prevEl: '.art-slider__btn--backward'
        }}
        onSwiper={setSwiper}
      >
        {Children.toArray(children).map((child, index) => (
          <SwiperSlide key={index}>
            {child}
          </SwiperSlide>
        ))}
        <ArtSliderButton onClick={() => swiper.slideNext()} />
      </Swiper>
    </div>
  );
};
