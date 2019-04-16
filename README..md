# React Native Pokemon App

Used for training purposes, uses React Native, TypeScript and GraphQL

### Getting it running

Clone the repo and run `yarn` to install the dependecies.

### Generating the Schema and Types

Run:

```bash
yarn run apollo schema:download --endpoint=https://graphql-pokemon.now.sh/ graphql-schema.json
```

To download the schema from the API and then run:

```bash
yarn apollo client:codegen --tag gql --target typescript --localSchemaFile .schema.json
```

To generate the `__generated__` folders that contain the type definitions.
