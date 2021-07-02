import React from 'react';
import {Personalize} from '@uniformdev/optimize-tracker-react';
import CarouselLib from 'react-native-snap-carousel';
import CarouselItem from './CarouselItem';
import PersonalizedCarousel from './PersonalizedCarousel';

const Carousel = ({pageLink, mappedSides, data}) => {
  const ref = React.useRef(null);
  if (pageLink === '/') {
    return (
      <Personalize variations={mappedSides} component={PersonalizedCarousel} />
    );
  } else {
    return (
      <CarouselLib
        ref={c => {
          ref.current = c;
        }}
        data={data.carousel.slidesCollection.items}
        renderItem={CarouselItem}
        sliderWidth={300}
        itemWidth={300}
      />
    );
  }
};

export default Carousel;
