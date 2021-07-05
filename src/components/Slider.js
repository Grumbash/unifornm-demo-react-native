import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useQuery, gql} from '@apollo/client';
import Carousel from '../components/Carousel';

const SLIDES = gql`
  query getSlides($id: String!) {
    carousel(id: $id) {
      title
      unfrmOptIntentTag
      slidesCollection {
        items {
          title
          slideImage {
            url
            fileName
          }
          sys {
            id
          }
        }
      }
    }

    carouselCollection {
      items {
        title
        unfrmOptIntentTag
        slidesCollection(limit: 3) {
          items {
            title
            slideImage {
              url
              fileName
            }
            sys {
              id
            }
          }
        }
      }
    }
  }
`;

const Slider = props => {
  const {loading, error, data} = useQuery(SLIDES, {
    variables: {
      id: props.id,
    },
  });
  if (loading) {
    return <ActivityIndicator />;
  }
  const mappedSides = data.carouselCollection.items.map(slide => {
    return {
      ...slide,
      intentTag: slide.unfrmOptIntentTag,
    };
  });
  return (
    <View style={{flex: 1}}>
      <Carousel
        data={data}
        mappedSides={mappedSides}
        pageLink={props.pageLink}
      />
    </View>
  );
};

export default Slider;
