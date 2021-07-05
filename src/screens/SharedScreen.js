import React from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useQuery, gql} from '@apollo/client';
import {useUniformTracker} from '@uniformdev/optimize-tracker-react';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Slider from '../components/Slider';
import Section from '../components/Section';

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

function Screen({page, navigation, route}) {
  const isFocused = useIsFocused();
  const {tracker} = useUniformTracker();
  const {loading, error, data} = useQuery(PAGE, {
    variables: {
      id: page.sys.id,
    },
  });

  const actionCall = React.useCallback(
    async linkTo => {
      console.log({linkTo});
      switch (linkTo) {
        case '/about':
          await tracker?.addEvent({
            label: 'about',
            category: 'about',
            value: 'about',
          });
          break;

        case '/grand-prix':
          await tracker?.addEvent({
            label: 'grandPrix',
            category: 'grandPrix',
            value: 'grandPrix',
          });
          break;
        default:
          break;
      }
    },
    [tracker],
  );

  React.useEffect(() => {
    actionCall(page.linkTo);
  }, [actionCall, page.linkTo, isFocused]);

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
    <SafeAreaView style={[styles.flex1]}>
      <ScrollView>
        <View style={styles.contentView}>
          <Text>{name}</Text>
          <Text>{pageContent.title}</Text>
          <Slider id={pageContent.sys.id} pageLink={linkTo} />
          <Section panesCollection={panesCollection.items} />
        </View>
      </ScrollView>
    </SafeAreaView>
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
  contentView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex1: {
    flex: 1,
  },
});

export default Screen;
