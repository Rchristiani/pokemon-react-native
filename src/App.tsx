import * as React from "react";
import Home from "./screens/Home";
import SingleView from "./screens/SingleView";
import { createStackNavigator, createAppContainer } from "react-navigation";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "https://graphql-pokemon.now.sh/graphql"
});

const AppNavigation = createStackNavigator({
  Home: {
    screen: Home
  },
  Single: {
    screen: SingleView
  }
});

const WrapperApp = createAppContainer(AppNavigation);

export default () => {
  return (
    <ApolloProvider client={client}>
      <WrapperApp />
    </ApolloProvider>
  );
};
