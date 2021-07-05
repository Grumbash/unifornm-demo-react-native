import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {useQuery, gql} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import wrapper from './src/hocs/routeWrapper';
import SharedScreen from './src/screens/SharedScreen';

const PAGES = gql`
  query getPages {
    pageCollection {
      items {
        name
        linkTo
        sys {
          id
        }
      }
    }
  }
`;

const Tab = createBottomTabNavigator();

const App = () => {
  const {loading, error, data} = useQuery(PAGES);
  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator>
          {data.pageCollection.items.map(page => (
            <Tab.Screen
              name={page.name}
              component={wrapper(SharedScreen)(page)}
              key={page.sys.id}
              state={page}
            />
          ))}
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

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

export default App;
