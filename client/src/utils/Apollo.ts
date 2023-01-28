import { ApolloClient, createHttpLink, InMemoryCache, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

const { REACT_APP_APOLLO_SERVER_URL, REACT_APP_APOLLO_SERVER_WS_URL } = process.env || {}

const authLink = setContext(async (_, { headers }) => {
  // const token = await getAccessTokenSilently();
  return {
    headers: {
      ...headers,
      // authorization: token ? `Bearer ${token}` : ""
    }
  }
})

const httpLink = createHttpLink({
  uri: REACT_APP_APOLLO_SERVER_URL,
  fetch
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: REACT_APP_APOLLO_SERVER_WS_URL ?? "",
  }),
);

const splitLink = split(({ query }) => {
  const definition = getMainDefinition(query);
  return (
    definition.kind === 'OperationDefinition' &&
    definition.operation === 'subscription'
  );
},
  wsLink,
  authLink.concat(httpLink),
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache"
    }
  }
})