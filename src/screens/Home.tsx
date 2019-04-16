import * as React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableHighlight,
  ImageSourcePropType
} from "react-native";
import { withNavigation, NavigationScreenProps } from "react-navigation";
import compose from "@shopify/react-compose";
import { gql } from "apollo-boost";
import { graphql, QueryResult } from "react-apollo";

import { Pokemon } from "./__generated__/Pokemon";

const Home = () => {
  return (
    <View>
      <WrapperPokemonContainer />
    </View>
  );
};

interface Props {}

type ComposedProps = Props & QueryResult<Pokemon> & NavigationScreenProps;

const PokemonContainer = (props: ComposedProps) => {
  const { data, loading, navigation } = props;

  if (loading) {
    return <Text>Loading</Text>;
  }

  if (!data) {
    return <Text>No data</Text>;
  }

  const { pokemons } = data;

  if (pokemons) {
    return (
      <ScrollView>
        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
          {pokemons.map(pokemon => {
            if (!pokemon) {
              return null;
            }
            return (
              <TouchableHighlight
                key={pokemon.id}
                onPress={() =>
                  navigation.navigate("Single", { id: pokemon.id })
                }
              >
                <View>
                  <Text>{pokemon.name}</Text>
                  <Image
                    source={{ uri: pokemon.image } as ImageSourcePropType}
                    style={{ height: 200, width: 160, resizeMode: "contain" }}
                  />
                </View>
              </TouchableHighlight>
            );
          })}
        </View>
      </ScrollView>
    );
  }

  return null;
};

const WrapperPokemonContainer = compose<ComposedProps>(
  graphql(gql`
    query Pokemon {
      pokemons(first: 150) {
        name
        image
        id
      }
    }
  `),
  withNavigation
)(PokemonContainer);

export default Home;
