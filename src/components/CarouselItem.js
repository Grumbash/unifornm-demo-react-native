import React from 'react';

import {StyleSheet, Text, View, Image} from 'react-native';

const CarouselItem = ({item}) => {
  return (
    <View style={styles.slide}>
      <Text style={styles.title}>{item.title}</Text>
      <Image
        style={styles.img}
        source={{
          uri: item.slideImage.url,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
  },
});

export default CarouselItem;
