import { AsyncStorage } from "react-native";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";

import { config } from "../config";

const httpLink: ApolloLink = createHttpLink({
  uri: config.API_URI
});

const authLink: ApolloLink = setContext(async (_, { headers }) => {
  // Get access token from local storage
  const token: string = await AsyncStorage.getItem(config.BEARER_ACCESS_KEY) || "";

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

export const client: ApolloClient<{}> = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});
