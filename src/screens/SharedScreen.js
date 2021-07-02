import React from 'react';
import {Text, View, ActivityIndicator, StyleSheet} from 'react-native';
import {useQuery, gql} from '@apollo/client';

import Slider from '../components/Slider';

const PAGE = gql`
  fragment Image on MediaImage {
    name
    image {
      url
    }
    unfrmOptIntentTag
  }

  fragment Generic on GenericContent {
    title
    content
    unfrmOptIntentTag
  }

  query GetPage($id: String!) {
    page(id: $id) {
      name
      linkTo
      pageContent {
        title
        sys {
          id
        }
      }
      pageSection {
        panesCollection {
          items {
            ...Generic
            ...Image
          }
        }
        unfrmOptIntentTag
      }
    }
  }
`;

function Screen({page}) {
  const {loading, error, data} = useQuery(PAGE, {
    variables: {
      id: page.sys.id,
    },
  });
  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (error) {
    console.error(error);
  }

  const {
    page: {
      name,
      pageContent,
      linkTo,
      pageSection: {panesCollection},
    },
  } = data;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{name}</Text>
      <Text>{pageContent.title}</Text>
      <Slider id={pageContent.sys.id} pageLink={linkTo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default Screen;
