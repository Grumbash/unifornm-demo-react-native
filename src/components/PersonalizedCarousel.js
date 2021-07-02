import React from 'react';
import CarouselLib from 'react-native-snap-carousel';
import CarouselItem from './CarouselItem';

const PersonalizedCarousel = ({slidesCollection}) => {
  const ref = React.useRef(null);
  return (
    <CarouselLib
      ref={c => {
        ref.current = c;
      }}
      data={slidesCollection.items}
      renderItem={CarouselItem}
      sliderWidth={300}
      itemWidth={300}
    />
  );
};

export default PersonalizedCarousel;
