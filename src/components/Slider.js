import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import Carousel from 'react-native-snap-carousel';
import {useQuery, gql} from '@apollo/client';

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

// const RenderItem = ({item, index}) => {
//   return (
//     <View style={styles.slide}>
//       <Text style={styles.title}>{item.title}</Text>
//     </View>
//   );
// };

const Slider = props => {
  const {loading, error, data} = useQuery(SLIDES, {
    variables: {
      id: props.id,
    },
  });
  console.log({props, data});
  return (
    <View>
      <Text>1</Text>
    </View>
  );
  //   <Carousel
  //     ref={c => {
  //       this._carousel = c;
  //     }}
  //     data={this.state.entries}
  //     renderItem={RenderItem}
  //     sliderWidth={500}
  //     itemWidth={400}
  //   />
  // );
};

export default Slider;

const styles = StyleSheet.create({});
