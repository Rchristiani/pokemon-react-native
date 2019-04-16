import * as React from "react";
import { View, Text, ImageSourcePropType, Image } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { graphql, QueryResult } from "react-apollo";
import { gql } from "apollo-boost";

import { GetPokemonById } from "./__generated__/GetPokemonById";

interface Props {}

type ComposedProps = Props &
  NavigationScreenProps &
  QueryResult<GetPokemonById>;

const SingleView = (props: ComposedProps) => {
  const { data, loading } = props;

  if (loading) {
    return <Text>loading</Text>;
  }

  if (!data || !data.pokemon) {
    return <Text>No data</Text>;
  }

  const {
    pokemon: { types, image, name }
  } = data;
  return (
    <View>
      <Text style={{ fontSize: 35 }}>{name}</Text>
      <Image
        source={{ uri: image } as ImageSourcePropType}
        style={{ width: "100%", height: 200, resizeMode: "contain" }}
      />
      <Text style={{ fontSize: 20 }}>Types</Text>
      {types && types.map(type => <Text>{type}</Text>)}
    </View>
  );
};

export default graphql<ComposedProps>(
  gql`
    query GetPokemonById($id: String) {
      pokemon(id: $id) {
        name
        image
        classification
        height {
          maximum
          minimum
        }
        weight {
          maximum
          minimum
        }
        types
      }
    }
  `,
  {
    options: props => {
      return {
        variables: {
          id: props.navigation.getParam("id")
        }
      };
    }
  }
)(SingleView);
