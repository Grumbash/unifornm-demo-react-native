import React from 'react';
import {Text, StyleSheet, Image} from 'react-native';
import {Personalize} from '@uniformdev/optimize-tracker-react';

const PersonalizedGeneric = props => {
  return (
    <>
      <Text variant="h4" component="h4">
        {props.title}
      </Text>
      <Text variant="body2" component="p">
        {props.content}
      </Text>
    </>
  );
};

const PersonalizedMedia = props => {
  return (
    <>
      <Text variant="h4" component="h4">
        {props.name}
      </Text>
      <Image
        style={styles.img}
        source={{
          uri: props.image.url,
        }}
      />
    </>
  );
};

const Section = ({panesCollection}) => {
  const media = panesCollection.filter(m => m.__typename === 'MediaImage');
  const generic = panesCollection.filter(
    m => m.__typename === 'GenericContent',
  );
  const mappedGeneric = generic.map(content => {
    return {
      ...content,
      // Assumes your CMS is capable of attaching Uniform Intent tags
      // to content items via `unfrmOptIntentTag` property.
      intentTag: content.unfrmOptIntentTag,
    };
  });
  const mappedMedia = media.map(content => {
    return {
      ...content,
      // Assumes your CMS is capable of attaching Uniform Intent tags
      // to content items via `unfrmOptIntentTag` property.
      intentTag: content.unfrmOptIntentTag,
    };
  });
  return (
    <>
      <Personalize variations={mappedGeneric} component={PersonalizedGeneric} />
      <Personalize variations={mappedMedia} component={PersonalizedMedia} />
    </>
  );
};

export default Section;

const styles = StyleSheet.create({
  img: {
    width: 200,
    height: 200,
  },
});
