import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {UniformTracker} from '@uniformdev/optimize-tracker-react';
import localTracker from './tracker';
import {Provider as PaperProvider} from 'react-native-paper';
import App from './App';
import {name as appName} from './app.json';

const client = new ApolloClient({
  uri: 'https://graphql.contentful.com/content/v1/spaces/l1znrfru9dsc?access_token=3iDGkjVgSvvFuykYi_WsPH2L2VDCPXsi2a1uNSqhQaY',
  cache: new InMemoryCache(),
});

const Root = () => (
  <ApolloProvider client={client}>
    <UniformTracker trackerInstance={localTracker}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </UniformTracker>
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => Root);
